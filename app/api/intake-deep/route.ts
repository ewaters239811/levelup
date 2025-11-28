import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Text must be at least 50 characters' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || !openai) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const prompt = `You are a wise, intuitive archetype analyst combining esoteric wisdom, Jungian psychology, and spiritual understanding. Analyze the following personal story and extract comprehensive insights.

Personal Story:
"${text}"

Your task is to:
1. Extract core themes (what patterns emerge in their life)
2. Extract behaviors (how they typically act/react)
3. Extract shadow traits (unconscious patterns that hold them back)
4. Extract strengths (their natural gifts and capabilities)
5. Map them to one of these archetypes based on the patterns:
   - UNFOCUSED_VISIONARY (scattered energy, many ideas, poor follow-through)
   - SILENT_GRINDER (consistent work, but doesn't claim recognition)
   - OVERGIVER (prioritizes others, loses self in service)
   - CAGED_POTENTIAL (fear blocks potential, self-sabotage)
   - lone_wolf_thinker (prefers working alone, deep thinking)
   - impulsive_firestarter (quick action, burns out fast)
   - doubt_ridden_strategist (over-analyzes, struggles with action)
6. Generate 3 custom clarifying questions to dig deeper into their specific patterns

Return ONLY valid JSON in this exact format:
{
  "archetypeProbabilities": {
    "UNFOCUSED_VISIONARY": 0.0,
    "SILENT_GRINDER": 0.0,
    "OVERGIVER": 0.0,
    "CAGED_POTENTIAL": 0.0,
    "lone_wolf_thinker": 0.0,
    "impulsive_firestarter": 0.0,
    "doubt_ridden_strategist": 0.0
  },
  "primaryArchetype": "string",
  "subArchetype": "string",
  "shadow": "string",
  "strength": "string",
  "alchemicalStage": "string",
  "biblicalEquivalent": "string",
  "rootBlockage": "string",
  "themes": ["theme1", "theme2"],
  "behaviors": ["behavior1", "behavior2"],
  "customQuestions": [
    {"id": "q1", "text": "question text"},
    {"id": "q2", "text": "question text"},
    {"id": "q3", "text": "question text"}
  ]
}

The probabilities should sum to 1.0. Make the analysis deep, accurate, and insightful.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a wise archetype analyst. Always return valid JSON only, no markdown formatting. Probabilities must sum to 1.0.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch (parseError) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Validate required fields
    if (!analysis.primaryArchetype || !analysis.customQuestions || !Array.isArray(analysis.customQuestions)) {
      throw new Error('Invalid analysis structure received from AI');
    }

    // Ensure probabilities sum to 1
    const totalProb = Object.values(analysis.archetypeProbabilities || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
    if (totalProb > 0) {
      Object.keys(analysis.archetypeProbabilities || {}).forEach(key => {
        analysis.archetypeProbabilities[key] = (analysis.archetypeProbabilities[key] || 0) / totalProb;
      });
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in intake-deep API:', error);
    
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}`, details: error.code },
        { status: error.status || 500 }
      );
    }
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

