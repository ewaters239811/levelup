import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { answer } = await request.json();

    if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
      return NextResponse.json(
        { error: 'Answer is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set in environment variables');
      return NextResponse.json(
        { 
          error: 'AI service not configured',
          details: 'OPENAI_API_KEY environment variable is missing. Please add it in Vercel project settings.'
        },
        { status: 503 }
      );
    }

    if (!openai) {
      console.error('OpenAI client initialization failed despite API key being set');
      return NextResponse.json(
        { 
          error: 'AI service initialization failed',
          details: 'Failed to initialize OpenAI client. Please check your API key format.'
        },
        { status: 503 }
      );
    }

    const prompt = `You are analyzing a user's answer to this question: "What is the main thing you want to improve on — and how would you feel if you succeeded in improving that thing?"

User's answer: "${answer}"

Your job is to extract the following:

1. "goal" — what the user wants to improve.
2. "blockage" — what usually stops them (infer based on their wording). This should be 1–2 sentences.
3. "desired_feelings" — the emotions they expect to feel once they improve. Extract clean emotional words from their answer.
4. "truth_reflection" — remind them that the feelings they want in the future are the feelings they must embody now. Communicate this idea: "The feeling you imagine having after you improve is the exact feeling you should practice now. That is true alignment and true faith."
5. "integration_step" — one simple action or mindset shift they can do today to practice that feeling now. Examples: "Act today as if you already feel confident," "Take one action your future self would take," "Speak to yourself the way you would if you already felt proud."

Guidelines:
- Keep language simple, direct, and supportive.
- If their answer is vague, give reasonable assumptions but keep everything general.

Return ONLY valid JSON in this exact format (no markdown, no explanation, just JSON):
{
  "goal": "...",
  "blockage": "...",
  "desired_feelings": ["...", "..."],
  "truth_reflection": "...",
  "integration_step": "..."
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a wise, supportive coach who helps people understand their patterns and align with their desired feelings. Always return valid JSON only, no markdown formatting.'
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

    let interpretation;
    try {
      interpretation = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON if wrapped in markdown
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        interpretation = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Validate the structure
    if (
      !interpretation.goal ||
      !interpretation.blockage ||
      !Array.isArray(interpretation.desired_feelings) ||
      !interpretation.truth_reflection ||
      !interpretation.integration_step
    ) {
      throw new Error('Invalid interpretation structure');
    }

    return NextResponse.json(interpretation);
  } catch (error) {
    console.error('Error in interpret-answer API:', error);
    
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

