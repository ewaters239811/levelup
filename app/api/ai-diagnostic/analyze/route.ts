import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { paragraph, birthday, lifePathNumber, lifePathMeaning, questions, answers } = await request.json();

    if (!paragraph || !questions || !answers) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || !openai) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    // Build Q&A string
    const qaString = questions.map((q: any, index: number) => {
      const answer = answers[q.id] || answers[`q${index + 1}`] || '';
      return `Q: ${q.text}\nA: ${answer}`;
    }).join('\n\n');

    const prompt = `You are a wise, intuitive life coach and spiritual guide. A person has shared their story and answered personalized questions. Your task is to provide deep, insightful, and transformative analysis.

Their original story:
"${paragraph}"

Their life path number: ${lifePathNumber} (${lifePathMeaning})

Their Q&A responses:
${qaString}

Based on all of this information, write a comprehensive, wise, and intuitive paragraph (3-5 sentences) that:

1. Identifies their core patterns and tendencies
2. Reveals what's truly blocking them (subconscious patterns, fears, limiting beliefs)
3. Highlights their strengths and potential
4. Points to their shortcomings in a compassionate but direct way
5. Offers insight into how they can improve and transform
6. Speaks in second person (you/your)
7. Is written in a calm, wise, esoteric, psychologically deep but practical tone
8. Feels like a true spiritual and psychological diagnosis

Be specific, not generic. Reference their actual situation, patterns, and responses. Write as if you truly see their soul and patterns.

Return ONLY the paragraph text, no markdown, no quotes, no explanation, just the raw insight paragraph.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a wise, intuitive life coach. Return only the insight paragraph, no markdown, no formatting, just the raw text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8
    });

    const insights = completion.choices[0]?.message?.content?.trim();
    if (!insights) {
      throw new Error('No insights received from AI');
    }

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error in analyze API:', error);
    
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

