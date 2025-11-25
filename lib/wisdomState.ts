import { ArchetypeKey } from '@/types';
import { UserState, FrequencyScores, ArchetypeTag } from '@/types/wisdom';
import { AIInterpretation } from '@/types';

/**
 * Convert ArchetypeKey to wisdom system ArchetypeTag
 */
export function archetypeKeyToTag(key: ArchetypeKey): ArchetypeTag {
  const mapping: Record<ArchetypeKey, ArchetypeTag> = {
    'UNFOCUSED_VISIONARY': 'unfocused_visionary',
    'SILENT_GRINDER': 'silent_grinder',
    'OVERGIVER': 'overgiver',
    'CAGED_POTENTIAL': 'caged_potential',
    'lone_wolf_thinker': 'lone_wolf_thinker',
    'impulsive_firestarter': 'impulsive_firestarter',
    'doubt_ridden_strategist': 'doubt_ridden_strategist'
  };
  return mapping[key] || 'unfocused_visionary';
}

/**
 * Initialize default frequency scores (all start at 2 - neutral)
 */
export function getDefaultFrequencyScores(): FrequencyScores {
  return {
    belief: 2,
    conviction: 2,
    perception: 2,
    emotion: 2,
    focus: 2,
    reactions: 2,
    expectations: 2
  };
}

/**
 * Create initial UserState from quiz results and AI interpretation
 */
export function createUserStateFromQuiz(
  archetypeKey: ArchetypeKey,
  aiInterpretation: AIInterpretation | null,
  userEmail?: string
): UserState {
  const archetype = archetypeKeyToTag(archetypeKey);
  
  // Extract goal from AI interpretation or use defaults
  const goal = aiInterpretation ? {
    area: 'personal_growth',
    description: aiInterpretation.goal,
    target_feelings: aiInterpretation.desired_feelings
  } : {
    area: 'personal_growth',
    description: 'Improve my life and reach my potential',
    target_feelings: ['confident', 'free', 'proud']
  };

  return {
    user_id: userEmail || `user_${Date.now()}`,
    archetype,
    frequency_scores: getDefaultFrequencyScores(),
    heaven_score: 0.3, // Start in moderate survival mode
    goal,
    history: []
  };
}

/**
 * Get or create user state from localStorage
 */
export function getUserState(userId: string): UserState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(`wisdom_state_${userId}`);
    if (stored) {
      return JSON.parse(stored) as UserState;
    }
  } catch (error) {
    console.error('Error loading user state:', error);
  }
  
  return null;
}

/**
 * Save user state to localStorage
 */
export function saveUserState(userState: UserState): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(`wisdom_state_${userState.user_id}`, JSON.stringify(userState));
  } catch (error) {
    console.error('Error saving user state:', error);
  }
}

/**
 * Update user state after completing a lesson
 */
export function updateUserStateAfterLesson(
  userState: UserState,
  lessonId: string,
  reflection: string,
  pillar: string,
  selfRatedShift?: Partial<FrequencyScores & { heaven_score: number }>
): UserState {
  const updated: UserState = {
    ...userState,
    last_lesson: {
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
      reflection,
      self_rated_shift: selfRatedShift
    },
    history: [
      ...userState.history,
      {
        lesson_id: lessonId,
        pillar: pillar as any,
        completed_at: new Date().toISOString()
      }
    ]
  };

  // Update frequency scores if provided
  if (selfRatedShift) {
    Object.keys(selfRatedShift).forEach(key => {
      if (key !== 'heaven_score' && key in updated.frequency_scores) {
        const current = updated.frequency_scores[key as FrequencyKey];
        const shift = selfRatedShift[key as FrequencyKey] || 0;
        updated.frequency_scores[key as FrequencyKey] = Math.min(5, Math.max(1, current + shift));
      }
    });

    if (selfRatedShift.heaven_score !== undefined) {
      updated.heaven_score = Math.min(1, Math.max(0, updated.heaven_score + selfRatedShift.heaven_score));
    }
  }

  return updated;
}

