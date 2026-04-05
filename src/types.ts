export type Category = 'Fitness' | 'Mental Health' | 'Productivity' | 'Lifestyle' | 'Social';
export type Goal = 'Stay Active' | 'Lose Weight' | 'Build Strength' | 'General Improvement';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Challenge {
  id: string;
  text: string;
  category: Category;
  level: Level;
  duration: string; // e.g., "5 min"
}

export interface CompletedChallenge {
  id: string;
  text: string;
  category: Category;
  date: string; // ISO date string
}

export interface UserData {
  categories: Category[];
  level: Level;
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  lastCompletedDate: string | null; // ISO date string
  todayChallengeId: string | null;
  yesterdayChallengeId: string | null;
  hasSwappedToday: boolean;
  swapCredits: number;
  lastVisitDate: string; // ISO date string
  onboarded: boolean;
  history: CompletedChallenge[];
}
