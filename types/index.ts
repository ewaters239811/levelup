export type ArchetypeKey = 'UNFOCUSED_VISIONARY' | 'SILENT_GRINDER' | 'OVERGIVER' | 'CAGED_POTENTIAL';

export interface QuestionOption {
  id: string;
  label: string;
  archetype: ArchetypeKey;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
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

