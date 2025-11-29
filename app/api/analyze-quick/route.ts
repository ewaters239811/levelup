import { NextRequest, NextResponse } from 'next/server';
import { QuickModeResponse } from '@/types/intake';

export async function POST(request: NextRequest) {
  try {
    const { responses, questions } = await request.json();

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'Responses are required' },
        { status: 400 }
      );
    }

    // Create a map of question ID to question for archetype lookup
    const questionMap = new Map();
    questions?.forEach((q: any) => {
      questionMap.set(q.id, q);
    });

    // Calculate archetype scores
    const archetypeCounts: Record<string, number> = {
      UNFOCUSED_VISIONARY: 0,
      SILENT_GRINDER: 0,
      OVERGIVER: 0,
      CAGED_POTENTIAL: 0,
      lone_wolf_thinker: 0,
      impulsive_firestarter: 0,
      doubt_ridden_strategist: 0,
    };

    // Process each response
    responses.forEach((response: QuickModeResponse) => {
      const question = questionMap.get(response.questionId);
      if (!question || !question.options) return;

      if (response.type === 'multi_select' && response.selectedOptions) {
        // Multi-select: each selected option counts
        response.selectedOptions.forEach(optionId => {
          const option = question.options.find((opt: any) => opt.id === optionId);
          if (option?.archetype) {
            archetypeCounts[option.archetype] = (archetypeCounts[option.archetype] || 0) + 1;
          }
        });
      } else if (response.type === 'rank_order' && response.rankedOptions) {
        // Rank-order: higher rank = more points
        // Top 3 ranked get higher weights: 1st=5pts, 2nd=4pts, 3rd=3pts, rest get 1pt each
        response.rankedOptions.forEach((optionId, index) => {
          const option = question.options.find((opt: any) => opt.id === optionId);
          if (option?.archetype) {
            let points = 1;
            if (index === 0) points = 5;      // First choice: highest weight
            else if (index === 1) points = 4; // Second choice: high weight
            else if (index === 2) points = 3; // Third choice: medium weight
            archetypeCounts[option.archetype] = (archetypeCounts[option.archetype] || 0) + points;
          }
        });
      } else if (response.type === 'multiple_choice' && response.selectedOptions) {
        // Single choice: counts once
        const optionId = response.selectedOptions[0];
        const option = question.options.find((opt: any) => opt.id === optionId);
        if (option?.archetype) {
          archetypeCounts[option.archetype] = (archetypeCounts[option.archetype] || 0) + 2; // Weight single choice more
        }
      }
    });

    // Calculate probabilities (0-1 range)
    const totalScore = Object.values(archetypeCounts).reduce((sum, score) => sum + score, 0);
    const archetypeProbabilities: Record<string, number> = {};
    
    Object.keys(archetypeCounts).forEach(key => {
      archetypeProbabilities[key] = totalScore > 0 ? archetypeCounts[key] / totalScore : 0;
    });

    // Find primary archetype
    let primaryArchetype = '';
    let maxScore = 0;
    Object.entries(archetypeCounts).forEach(([key, score]) => {
      if (score > maxScore) {
        maxScore = score;
        primaryArchetype = key;
      }
    });

    // Set default values (these would normally come from AI or a database)
    const archetypeData: Record<string, any> = {
      UNFOCUSED_VISIONARY: {
        subArchetype: 'The Scattered Dreamer',
        shadow: 'Avoidance of commitment, addiction to potential',
        strength: 'Visionary thinking, seeing possibilities',
        alchemicalStage: 'Calcination - Breaking down scattered patterns',
        biblicalEquivalent: 'Moses before the burning bush - seeing but not acting',
        rootBlockage: 'Fear of choosing one path means losing all others',
      },
      SILENT_GRINDER: {
        subArchetype: 'The Quiet Builder',
        shadow: 'Not being seen or valued for contributions',
        strength: 'Consistent execution, reliability',
        alchemicalStage: 'Coagulation - Solidifying work into results',
        biblicalEquivalent: 'Noah - building steadily without recognition',
        rootBlockage: 'Belief that work should speak for itself',
      },
      OVERGIVER: {
        subArchetype: 'The Nurturing Supporter',
        shadow: 'Codependency, losing self in service to others',
        strength: 'Empathy, ability to elevate others',
        alchemicalStage: 'Sublimation - Rising above personal needs',
        biblicalEquivalent: 'Martha - serving others before self',
        rootBlockage: 'Worth tied to giving rather than being',
      },
      CAGED_POTENTIAL: {
        subArchetype: 'The Restrained Talent',
        shadow: 'Self-sabotage, fear of failure',
        strength: 'Deep potential, untapped power',
        alchemicalStage: 'Putrefaction - Breaking down limiting beliefs',
        biblicalEquivalent: 'Saul before transformation - power unused',
        rootBlockage: 'Belief that potential is safer than actualization',
      },
      lone_wolf_thinker: {
        subArchetype: 'The Independent Analyst',
        shadow: 'Isolation, difficulty collaborating',
        strength: 'Deep thinking, self-reliance',
        alchemicalStage: 'Distillation - Purifying ideas alone',
        biblicalEquivalent: 'Elijah in the cave - thinking in solitude',
        rootBlockage: 'Belief that working alone is superior',
      },
      impulsive_firestarter: {
        subArchetype: 'The Energetic Initiator',
        shadow: 'Lack of follow-through, burning out quickly',
        strength: 'Rapid action, high energy',
        alchemicalStage: 'Combustion - Rapid transformation',
        biblicalEquivalent: 'Peter - acting before thinking',
        rootBlockage: 'Addiction to the rush of starting',
      },
      doubt_ridden_strategist: {
        subArchetype: 'The Analytical Perfectionist',
        shadow: 'Analysis paralysis, fear of wrong choices',
        strength: 'Strategic thinking, thorough planning',
        alchemicalStage: 'Fermentation - Overthinking the process',
        biblicalEquivalent: 'Gideon - needing constant confirmation',
        rootBlockage: 'Belief that perfect preparation prevents failure',
      },
    };

    const primaryData = archetypeData[primaryArchetype] || archetypeData['UNFOCUSED_VISIONARY'];

    return NextResponse.json({
      archetypeProbabilities,
      primaryArchetype,
      subArchetype: primaryData.subArchetype,
      shadow: primaryData.shadow,
      strength: primaryData.strength,
      alchemicalStage: primaryData.alchemicalStage,
      biblicalEquivalent: primaryData.biblicalEquivalent,
      rootBlockage: primaryData.rootBlockage,
      customQuestions: [], // Can be added later with AI
    });
  } catch (error) {
    console.error('Error in analyze-quick API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

