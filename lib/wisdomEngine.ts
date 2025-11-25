import { UserState, Lesson, LessonCatalog, Pillar, FrequencyKey, LessonRecommendation } from '@/types/wisdom';

/**
 * Get the two lowest frequency scores
 */
function getWeakestKeys(scores: UserState['frequency_scores']): FrequencyKey[] {
  const entries = Object.entries(scores) as [FrequencyKey, number][];
  const sorted = entries.sort((a, b) => a[1] - b[1]);
  return [sorted[0][0], sorted[1][0]];
}

/**
 * Choose the most appropriate pillar based on user state
 */
export function choosePillar(user: UserState): Pillar {
  const hell = user.heaven_score < 0.4;
  const weak = getWeakestKeys(user.frequency_scores);
  
  // Check for identity crisis in reflections
  const lastReflection = user.last_lesson?.reflection?.toLowerCase() || '';
  const identityCrisisKeywords = ['worthless', 'lost', 'who am i', 'god abandoned me', 'abandoned', 'identity'];
  const hasIdentityCrisis = identityCrisisKeywords.some(keyword => lastReflection.includes(keyword));
  
  // Check for emotional/relationship loops
  const emotionalKeywords = ['trigger', 'relationship', 'emotional', 'loop', 'pattern', 'react'];
  const hasEmotionalLoops = emotionalKeywords.some(keyword => lastReflection.includes(keyword));
  
  // Check for meaning/ritual requests
  const meaningKeywords = ['meaning', 'ritual', 'sacred', 'deeper', 'understanding', 'spiritual'];
  const hasMeaningRequest = meaningKeywords.some(keyword => lastReflection.includes(keyword));
  
  // Check for discipline/structure issues
  const disciplineKeywords = ['undisciplined', 'break my word', 'structure', 'follow through', 'commitment'];
  const hasDisciplineIssue = disciplineKeywords.some(keyword => lastReflection.includes(keyword));

  // Decision logic
  if (hell) {
    return 'alchemy'; // They're in fire / purification
  }

  if (hasIdentityCrisis) {
    return 'bible';
  }

  if (hasEmotionalLoops) {
    return 'jung';
  }

  if (hasMeaningRequest) {
    return 'rosicrucian';
  }

  if (hasDisciplineIssue) {
    return 'masonry';
  }

  // Fallback tie-breakers based on weak keys
  if (weak.includes('focus')) {
    return 'masonry';
  }
  if (weak.includes('reactions')) {
    return 'jung';
  }
  if (weak.includes('belief') || weak.includes('conviction')) {
    return 'bible';
  }

  return 'alchemy'; // Default
}

/**
 * Check if user has completed any lessons from a pillar
 */
function hasCompletedPillar(user: UserState, pillar: Pillar): boolean {
  return user.history.some(lesson => lesson.pillar === pillar);
}

/**
 * Choose the best lesson from the catalog
 */
export function chooseLesson(user: UserState, catalog: LessonCatalog): Lesson {
  const pillar = choosePillar(user);
  const weak = getWeakestKeys(user.frequency_scores);
  const archetype = user.archetype;

  // Filter candidate lessons
  let candidates = catalog.lessons.filter(lesson => {
    const matchesPillar = lesson.pillar === pillar;
    const matchesArchetype = lesson.archetype_tags.includes(archetype);
    const matchesWeakKeys = lesson.targets.keys.some(key => weak.includes(key));
    
    return matchesPillar && matchesArchetype && matchesWeakKeys;
  });

  // If no candidates, relax archetype requirement
  if (candidates.length === 0) {
    candidates = catalog.lessons.filter(lesson => {
      const matchesPillar = lesson.pillar === pillar;
      const matchesWeakKeys = lesson.targets.keys.some(key => weak.includes(key));
      return matchesPillar && matchesWeakKeys;
    });
  }

  // If still no candidates, just match pillar
  if (candidates.length === 0) {
    candidates = catalog.lessons.filter(lesson => lesson.pillar === pillar);
  }

  // Avoid repeating last lesson
  if (user.last_lesson?.lesson_id) {
    candidates = candidates.filter(lesson => lesson.id !== user.last_lesson!.lesson_id);
  }

  // If this is their first lesson from this pillar, start with easiest
  if (!hasCompletedPillar(user, pillar)) {
    candidates.sort((a, b) => a.difficulty - b.difficulty);
    return candidates[0];
  }

  // Otherwise, pick next in difficulty progression or random among difficulty <= 3
  const moderateDifficulty = candidates.filter(l => l.difficulty <= 3);
  if (moderateDifficulty.length > 0) {
    return moderateDifficulty[Math.floor(Math.random() * moderateDifficulty.length)];
  }

  // Fallback to first candidate
  return candidates[0];
}

/**
 * Generate reasoning summary for why this lesson was chosen
 */
export function generateReasoningSummary(user: UserState, lesson: Lesson, pillar: Pillar): string {
  const weak = getWeakestKeys(user.frequency_scores);
  const weakKeysStr = weak.join(' and ');
  
  const pillarNames: Record<Pillar, string> = {
    bible: 'Esoteric Bible',
    jung: 'Jungian Psychology',
    alchemy: 'Hermetic Alchemy',
    rosicrucian: 'Rosicrucian Wisdom',
    masonry: 'Masonic Character'
  };

  let reason = `Your ${weakKeysStr} scores are lowest, and your archetype (${user.archetype.replace('_', ' ')}) aligns with ${pillarNames[pillar]}. `;
  
  if (user.heaven_score < 0.4) {
    reason += "You're in a purification phase, so alchemy will help you transmute what's burning.";
  } else {
    reason += `This ${pillarNames[pillar]} teaching directly addresses your weakest areas.`;
  }

  return reason;
}

/**
 * Generate coaching message
 */
export function generateCoachingMessage(user: UserState, lesson: Lesson): string {
  const goalArea = user.goal.area;
  const targetFeelings = user.goal.target_feelings.join(', ');
  
  return `You said you want to improve ${goalArea} and feel ${targetFeelings}. ${lesson.title} is your next step because it addresses the exact pattern blocking you. Remember: the feeling you imagine having after you improve is the exact feeling you should practice now. That is true alignment and true faith. This lesson will help you embody that state.`;
}

