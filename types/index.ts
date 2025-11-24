export type ArchetypeKey = 'UNFOCUSED_VISIONARY' | 'SILENT_GRINDER' | 'OVERGIVER' | 'CAGED_POTENTIAL' | 'lone_wolf_thinker' | 'impulsive_firestarter' | 'doubt_ridden_strategist';

export interface QuestionOption {
  id: string;
  label: string;
  archetype: ArchetypeKey;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  isOpenEnded?: boolean; // For text input questions
}

export interface AIInterpretation {
  goal: string;
  blockage: string;
  desired_feelings: string[];
  truth_reflection: string;
  integration_step: string;
}

export interface Archetype {
  key: ArchetypeKey;
  name: string;
  tagline: string;
  description: string;
  mainBlocks: string[];
  weeklyMoves: string[];
  bibleVerses: string[];
}

