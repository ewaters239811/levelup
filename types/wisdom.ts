// Wisdom System Types

export type ArchetypeTag = 'unfocused_visionary' | 'overgiver' | 'silent_grinder' | 'caged_potential' | 'lone_wolf_thinker' | 'impulsive_firestarter' | 'doubt_ridden_strategist';

export type Pillar = 'bible' | 'jung' | 'alchemy' | 'rosicrucian' | 'masonry';

export type FrequencyKey = 'belief' | 'conviction' | 'perception' | 'emotion' | 'focus' | 'reactions' | 'expectations';

export type ExerciseType = 'meditation_reflection' | 'reflection' | 'embodiment' | 'writing' | 'visualization_writing' | 'somatic_reflection' | 'embodiment_reflection' | 'inventory' | 'reflection_commitment';

export interface FrequencyScores {
  belief: number; // 1-5
  conviction: number; // 1-5
  perception: number; // 1-5
  emotion: number; // 1-5
  focus: number; // 1-5
  reactions: number; // 1-5
  expectations: number; // 1-5
}

export interface Goal {
  area: string;
  description: string;
  target_feelings: string[];
}

export interface LessonHistory {
  lesson_id: string;
  pillar: Pillar;
  completed_at: string;
}

export interface LastLesson {
  lesson_id: string;
  completed_at: string;
  reflection?: string;
  self_rated_shift?: {
    [key in FrequencyKey]?: number;
    heaven_score?: number;
  };
}

export interface UserState {
  user_id: string;
  archetype: ArchetypeTag;
  frequency_scores: FrequencyScores;
  heaven_score: number; // 0-1 (0 = full survival, 1 = very relaxed)
  goal: Goal;
  last_lesson?: LastLesson;
  history: LessonHistory[];
}

export interface LessonTargets {
  keys: FrequencyKey[];
  states: string[];
}

export interface Exercise {
  type: ExerciseType;
  duration_minutes: number;
  steps: string[];
}

export interface ExpectedShift {
  [key in FrequencyKey]?: number;
  heaven_score?: number;
}

export interface Lesson {
  id: string;
  title: string;
  pillar: Pillar;
  archetype_tags: ArchetypeTag[];
  targets: LessonTargets;
  difficulty: number; // 1-5
  summary: string;
  teaching: string;
  exercise: Exercise;
  reflection_questions: string[];
  integration_affirmation: string;
  expected_shift: ExpectedShift;
}

export interface LessonCatalog {
  lessons: Lesson[];
}

export interface LessonRecommendation {
  chosen_lesson: Lesson;
  reasoning_summary: string;
  coaching_message: string;
}

