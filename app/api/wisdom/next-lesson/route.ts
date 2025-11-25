import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { wisdomLessons } from '@/data/wisdomLessons';
import { choosePillar, chooseLesson, generateReasoningSummary, generateCoachingMessage } from '@/lib/wisdomEngine';
import { UserState, LessonRecommendation } from '@/types/wisdom';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const WISDOM_SYSTEM_PROMPT = `ROLE:
You are the "Wisdom Engine" of ClearPth.io – an initiatory self-development guide that combines:
- Esoteric Bible interpretation
- Jungian psychology
- Hermetic alchemy
- Rosicrucian symbolism
- Masonic character-building
with a practical, ruthless self-mastery mindset.

INPUT:
You will receive a JSON UserState and a JSON LessonCatalog.

GOAL:
Diagnose the user's main blockage using their archetype, frequency scores, heaven score, and text reflections.
Choose the most helpful pillar (bible, jung, alchemy, rosicrucian, masonry) for their current state.
Select ONE lesson from the catalog that best fits their weakest keys and archetype, avoiding repetition when possible.
Return a JSON object including:
- chosen_lesson (copied from catalog)
- reasoning_summary (short explanation in plain language of why this lesson is next)
- coaching_message (a short motivational message tying their current situation, the lesson, and their goal together)

STYLE:
Speak like a calm, firm initiator: loving, direct, and mystical but clear.
No fluff – always connect the teaching to a concrete action or shift in state.
Remind them that the true goal is to live the feeling of their desired reality now (true faith).
Always use second person (you, your, yourself).

OUTPUT FORMAT:
{
  "chosen_lesson": { /* full lesson object */ },
  "reasoning_summary": "string",
  "coaching_message": "string"
}`;

export async function POST(request: NextRequest) {
  try {
    const userState: UserState = await request.json();

    if (!userState || !userState.user_id || !userState.archetype) {
      return NextResponse.json(
        { error: 'Invalid user state provided' },
        { status: 400 }
      );
    }

    // Use AI if available, otherwise fall back to algorithm
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: WISDOM_SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: `UserState: ${JSON.stringify(userState)}\n\nLessonCatalog: ${JSON.stringify(wisdomLessons)}\n\nChoose the next lesson and provide reasoning.`
            }
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' }
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          try {
            const aiRecommendation = JSON.parse(content) as LessonRecommendation;
            // Validate the lesson exists in our catalog
            const lessonExists = wisdomLessons.lessons.some(l => l.id === aiRecommendation.chosen_lesson.id);
            if (lessonExists) {
              return NextResponse.json(aiRecommendation);
            }
          } catch (parseError) {
            console.warn('Failed to parse AI response, falling back to algorithm');
          }
        }
      } catch (aiError) {
        console.warn('AI recommendation failed, falling back to algorithm:', aiError);
      }
    }

    // Fallback to algorithmic decision engine
    const pillar = choosePillar(userState);
    const chosenLesson = chooseLesson(userState, wisdomLessons);
    const reasoningSummary = generateReasoningSummary(userState, chosenLesson, pillar);
    const coachingMessage = generateCoachingMessage(userState, chosenLesson);

    const recommendation: LessonRecommendation = {
      chosen_lesson: chosenLesson,
      reasoning_summary: reasoningSummary,
      coaching_message: coachingMessage
    };

    return NextResponse.json(recommendation);
  } catch (error) {
    console.error('Error in wisdom/next-lesson API:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

