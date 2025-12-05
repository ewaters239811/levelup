export interface AssessmentAnswer {
  questionId: string;
  score: number; // 0-10
}

export interface AssessmentData {
  fearOfVisibility: number; // 0-10
  avoidanceOfResponsibility: number; // 0-10
  emotionalSafetyLooping: number; // 0-10
  successIdentityRejection: number; // 0-10
}

export type IdentityArchetype = 
  | 'Stable Identity'
  | 'Fragile Identity'
  | 'Collapsed Identity'
  | 'Identity Void';

export interface IdentityResult {
  totalScore: number;
  archetype: IdentityArchetype;
  diagnosis: string;
}

export interface ApplicationData {
  name: string;
  email: string;
  socialHandle: string;
  currentWork: string;
  stuckAreas: string;
  scoreMeaning: string;
  investmentWillingness: 'Yes' | 'Maybe' | 'No';
}

