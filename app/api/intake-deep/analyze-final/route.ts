import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ArchetypeAnalysis } from '@/types/intake';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { text, initialAnalysis, answers } = await request.json();

    if (!text || !initialAnalysis) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || !openai) {
      // Return initial analysis if AI not configured
      return NextResponse.json(initialAnalysis);
    }

    // Build Q&A string
    const qaString = initialAnalysis.customQuestions
      ?.map((q: any, index: number) => {
        const answer = answers[q.id] || answers[`q${index + 1}`] || '';
        return `Q: ${q.text}\nA: ${answer}`;
      })
      .join('\n\n') || '';

    const prompt = `You have already analyzed a personal story and provided initial archetype insights. Now the person has answered clarifying questions. Refine your analysis.

Original Story:
"${text}"

Initial Analysis:
- Primary Archetype: ${initialAnalysis.primaryArchetype}
- Shadow: ${initialAnalysis.shadow}
- Strength: ${initialAnalysis.strength}
- Root Blockage: ${initialAnalysis.rootBlockage}

Clarifying Questions & Answers:
${qaString}

Based on the new information, refine the archetype analysis. Update probabilities, and potentially adjust the primary archetype if the answers reveal new patterns. Return the same JSON structure as before, but with refined insights.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a wise archetype analyst. Return valid JSON only. Probabilities must sum to 1.0.'
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
      // Fallback to initial analysis
      return NextResponse.json(initialAnalysis);
    }

    let refinedAnalysis: ArchetypeAnalysis;
    try {
      refinedAnalysis = JSON.parse(content);
    } catch (parseError) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        refinedAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback to initial analysis
        return NextResponse.json(initialAnalysis);
      }
    }

    // Ensure all required fields exist
    refinedAnalysis = {
      ...initialAnalysis,
      ...refinedAnalysis,
      customQuestions: initialAnalysis.customQuestions, // Keep original questions
    };

    // Normalize probabilities
    const totalProb = Object.values(refinedAnalysis.archetypeProbabilities || {}).reduce(
      (sum: number, val: any) => sum + (val || 0), 0
    );
    if (totalProb > 0) {
      Object.keys(refinedAnalysis.archetypeProbabilities || {}).forEach(key => {
        refinedAnalysis.archetypeProbabilities[key] = 
          (refinedAnalysis.archetypeProbabilities[key] || 0) / totalProb;
      });
    }

    return NextResponse.json(refinedAnalysis);
  } catch (error) {
    console.error('Error in analyze-final API:', error);
    
    // Always return initial analysis as fallback
    const { initialAnalysis } = await request.json().catch(() => ({ initialAnalysis: null }));
    if (initialAnalysis) {
      return NextResponse.json(initialAnalysis);
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

