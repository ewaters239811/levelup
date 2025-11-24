export type IntroLesson = {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // main teaching text
  reflectionQuestions?: string[];
  dailyPractices?: string[];
  completionMarker?: string;
};

export type ArchetypeIntroClass = {
  id: 'UNFOCUSED_VISIONARY' | 'SILENT_GRINDER' | 'OVERGIVER' | 'CAGED_POTENTIAL' | 'lone_wolf_thinker' | 'impulsive_firestarter' | 'doubt_ridden_strategist';
  name: string;
  tagline: string;
  lessons: IntroLesson[];
};

