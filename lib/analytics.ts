export interface QuizResult {
  archetype: string;
  timestamp: number;
  date: string;
  answers: Record<number, string>;
  email?: string;
}

const STORAGE_KEY = 'level-up-diagnostic-results';

export function saveResult(archetype: string, answers: Record<number, string>, email?: string): void {
  const result: QuizResult = {
    archetype,
    timestamp: Date.now(),
    date: new Date().toISOString(),
    answers,
    email,
  };

  // Get existing results
  const existing = getResults();
  existing.push(result);

  // Save back to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Failed to save result to localStorage:', error);
  }

  // Also log to console for easy access
  console.log('🎯 New Quiz Result:', result);
  console.log('📊 Total Results:', existing.length);
  
  // Log archetype counts
  const counts = getArchetypeCounts();
  console.log('📈 Archetype Counts:', counts);
}

export function getResults(): QuizResult[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to read results from localStorage:', error);
    return [];
  }
}

export function getArchetypeCounts(): Record<string, number> {
  const results = getResults();
  const counts: Record<string, number> = {
    UNFOCUSED_VISIONARY: 0,
    SILENT_GRINDER: 0,
    OVERGIVER: 0,
    CAGED_POTENTIAL: 0,
    lone_wolf_thinker: 0,
    impulsive_firestarter: 0,
    doubt_ridden_strategist: 0,
  };

  results.forEach((result) => {
    if (result.archetype in counts) {
      counts[result.archetype]++;
    } else {
      // For any archetype not in the initial list, add it dynamically
      counts[result.archetype] = (counts[result.archetype] || 0) + 1;
    }
  });

  return counts;
}

export function exportResults(): string {
  const results = getResults();
  const counts = getArchetypeCounts();
  
  return JSON.stringify({
    summary: {
      totalResults: results.length,
      archetypeCounts: counts,
      exportDate: new Date().toISOString(),
    },
    results,
  }, null, 2);
}

export function clearResults(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ Results cleared');
  } catch (error) {
    console.error('Failed to clear results:', error);
  }
}

