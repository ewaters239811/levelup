// CLEARPTH.IO INTAKE SYSTEM 2.0 Types

export type IntakeMode = 'quick' | 'deep';

export type QuestionType = 'multiple_choice' | 'multi_select' | 'rank_order' | 'text' | 'optional_text';

export interface QuickModeQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: {
    id: string;
    label: string;
    archetype?: string;
  }[];
  required?: boolean;
  placeholder?: string;
}

export interface QuickModeResponse {
  questionId: string;
  type: QuestionType;
  selectedOptions?: string[];
  rankedOptions?: string[];
  textResponse?: string;
}

export interface DeepModeResponse {
  text: string;
  voiceTranscript?: string;
}

export interface ArchetypeAnalysis {
  archetypeProbabilities: Record<string, number>;
  primaryArchetype: string;
  subArchetype: string;
  shadow: string;
  strength: string;
  alchemicalStage: string;
  biblicalEquivalent: string;
  rootBlockage: string;
  customQuestions: Array<{
    id: string;
    text: string;
  }>;
}

export interface ConfirmationTraits {
  selectedTraits: string[];
}

export interface FinalResult {
  archetype: string;
  subArchetype: string;
  shadow: string;
  strength: string;
  stateOfConsciousness: string;
  bibleEquivalent: string;
  alchemicalStage: string;
  sixWeekPlan: string[];
  customQuestions?: Array<{
    id: string;
    text: string;
  }>;
}

