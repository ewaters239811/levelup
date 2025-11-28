import { NextRequest, NextResponse } from 'next/server';
import { ArchetypeAnalysis } from '@/types/intake';

export async function POST(request: NextRequest) {
  try {
    const { initialAnalysis, selectedTraits } = await request.json();

    if (!initialAnalysis) {
      return NextResponse.json(
        { error: 'Initial analysis is required' },
        { status: 400 }
      );
    }

    // Clone the initial analysis
    const updatedAnalysis: ArchetypeAnalysis = { ...initialAnalysis };

    // Adjust archetype probabilities based on selected traits
    // Each trait may influence archetype scores
    const traitArchetypeMap: Record<string, string> = {
      'trait1': 'doubt_ridden_strategist',
      'trait2': 'UNFOCUSED_VISIONARY',
      'trait3': 'lone_wolf_thinker',
      'trait4': 'impulsive_firestarter',
      'trait5': 'OVERGIVER',
      'trait6': 'SILENT_GRINDER',
      'trait7': 'CAGED_POTENTIAL',
      'trait8': 'UNFOCUSED_VISIONARY',
      'trait9': 'doubt_ridden_strategist',
      'trait10': 'OVERGIVER',
    };

    // Adjust probabilities based on selected traits
    selectedTraits?.forEach((traitId: string) => {
      const archetype = traitArchetypeMap[traitId];
      if (archetype && updatedAnalysis.archetypeProbabilities[archetype]) {
        // Increase probability for matching archetype
        updatedAnalysis.archetypeProbabilities[archetype] += 0.05;
      }
    });

    // Normalize probabilities to sum to 1
    const total = Object.values(updatedAnalysis.archetypeProbabilities).reduce((sum, val) => sum + val, 0);
    Object.keys(updatedAnalysis.archetypeProbabilities).forEach(key => {
      updatedAnalysis.archetypeProbabilities[key] = updatedAnalysis.archetypeProbabilities[key] / total;
    });

    // Recalculate primary archetype if probabilities changed significantly
    let maxProb = 0;
    let newPrimary = updatedAnalysis.primaryArchetype;
    
    Object.entries(updatedAnalysis.archetypeProbabilities).forEach(([key, prob]) => {
      if (prob > maxProb) {
        maxProb = prob;
        newPrimary = key;
      }
    });

    // Update primary archetype if it changed
    if (newPrimary !== updatedAnalysis.primaryArchetype && maxProb > 0.35) {
      updatedAnalysis.primaryArchetype = newPrimary;
      // Update other fields based on new primary archetype
      // (In production, this would fetch from a database or use AI)
    }

    return NextResponse.json(updatedAnalysis);
  } catch (error) {
    console.error('Error in confirm API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

