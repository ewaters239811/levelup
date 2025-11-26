import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { calculateLifePathNumber, getLifePathMeaning } from '@/lib/lifePathNumber';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { paragraph, birthday } = await request.json();

    if (!paragraph || typeof paragraph !== 'string' || paragraph.trim().length < 50) {
      return NextResponse.json(
        { error: 'Paragraph must be at least 50 characters' },
        { status: 400 }
      );
    }

    if (!birthday || typeof birthday !== 'string') {
      return NextResponse.json(
        { error: 'Birthday is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || !openai) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    // Calculate life path number
    let lifePathNumber: number;
    let lifePathMeaning: string;
    try {
      lifePathNumber = calculateLifePathNumber(birthday);
      lifePathMeaning = getLifePathMeaning(lifePathNumber);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid birthday format' },
        { status: 400 }
      );
    }

    const prompt = `You are a wise, intuitive life coach and spiritual guide. A person has shared the following about their life:

"${paragraph}"

Their life path number is ${lifePathNumber} (${lifePathMeaning}).

Based on their story and life path number, generate 5-7 personalized, deep, thought-provoking questions that will help uncover their patterns, tendencies, blockages, and potential. The questions should:

1. Be specific to their situation and challenges mentioned
2. Probe deeper into their patterns and subconscious tendencies
3. Help reveal what's truly blocking them
4. Be insightful and wise, not generic
5. Cover different aspects: relationships, career, self-perception, fears, desires, etc.
6. Be open-ended to encourage honest reflection

Return ONLY a JSON array of question objects in this exact format (no markdown, no explanation):
[
  {"id": "q1", "text": "First question here..."},
  {"id": "q2", "text": "Second question here..."},
  ...
]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a wise, intuitive life coach. Return a JSON object with a "questions" array. Each question should have "id" and "text" fields. Example: {"questions": [{"id": "q1", "text": "Question here..."}]}'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' }
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    let response;
    try {
      response = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON from markdown if present
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        response = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response');
      }
    }

    // Extract questions array - AI should return {questions: [...]}
    let questions = response.questions || response.questions_array || [];

    // If still not an array, check if response itself is an array
    if (!Array.isArray(questions) && Array.isArray(response)) {
      questions = response;
    }

    // If still not an array, try to find any array in the response
    if (!Array.isArray(questions)) {
      const arrayMatch = JSON.stringify(response).match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        try {
          questions = JSON.parse(arrayMatch[0]);
        } catch (e) {
          // Ignore parse errors
        }
      }
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Invalid question format received from AI');
    }

    // Ensure each question has id and text
    questions = questions.map((q: any, index: number) => ({
      id: q.id || `q${index + 1}`,
      text: q.text || q.question || String(q)
    }));

    return NextResponse.json({
      questions,
      lifePathNumber,
      lifePathMeaning
    });
  } catch (error) {
    console.error('Error in generate-questions API:', error);
    
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

