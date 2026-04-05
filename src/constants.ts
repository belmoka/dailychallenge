import { Challenge, Category, Level } from './types';

export const CATEGORIES: Category[] = ['Fitness', 'Mental Health', 'Productivity', 'Lifestyle', 'Social'];
export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

export const CHALLENGES: Challenge[] = [
  // FITNESS
  { id: 'f1', text: 'Take a 5-minute walk', category: 'Fitness', level: 'Beginner', duration: '5 min' },
  { id: 'f2', text: 'Do 10 squats', category: 'Fitness', level: 'Beginner', duration: '2 min' },
  { id: 'f3', text: 'Stretch for 3 minutes', category: 'Fitness', level: 'Beginner', duration: '3 min' },
  { id: 'f4', text: 'Do 15 pushups', category: 'Fitness', level: 'Intermediate', duration: '5 min' },
  { id: 'f5', text: 'Plank for 45 seconds', category: 'Fitness', level: 'Intermediate', duration: '1 min' },
  { id: 'f6', text: 'Run for 15 minutes', category: 'Fitness', level: 'Advanced', duration: '15 min' },
  { id: 'f7', text: 'Do 30 burpees', category: 'Fitness', level: 'Advanced', duration: '10 min' },

  // MENTAL HEALTH
  { id: 'm1', text: 'Write 1 thing you are grateful for', category: 'Mental Health', level: 'Beginner', duration: '2 min' },
  { id: 'm2', text: 'Take 5 deep breaths', category: 'Mental Health', level: 'Beginner', duration: '1 min' },
  { id: 'm3', text: 'Meditate for 5 minutes', category: 'Mental Health', level: 'Intermediate', duration: '5 min' },
  { id: 'm4', text: 'Journal for 10 minutes', category: 'Mental Health', level: 'Intermediate', duration: '10 min' },
  { id: 'm5', text: 'Digital detox for 1 hour', category: 'Mental Health', level: 'Advanced', duration: '60 min' },
  { id: 'm6', text: 'Practice mindfulness during a meal', category: 'Mental Health', level: 'Advanced', duration: '15 min' },

  // PRODUCTIVITY
  { id: 'p1', text: 'Write down your top 3 tasks for today', category: 'Productivity', level: 'Beginner', duration: '3 min' },
  { id: 'p2', text: 'Clear your physical workspace', category: 'Productivity', level: 'Beginner', duration: '5 min' },
  { id: 'p3', text: 'Work without your phone for 15 minutes', category: 'Productivity', level: 'Intermediate', duration: '15 min' },
  { id: 'p4', text: 'Use the Pomodoro technique for one task', category: 'Productivity', level: 'Intermediate', duration: '25 min' },
  { id: 'p5', text: 'Plan your entire week ahead', category: 'Productivity', level: 'Advanced', duration: '20 min' },
  { id: 'p6', text: 'Review and archive 10 old emails', category: 'Productivity', level: 'Advanced', duration: '10 min' },

  // LIFESTYLE
  { id: 'l1', text: 'Drink a full glass of water upon waking', category: 'Lifestyle', level: 'Beginner', duration: '1 min' },
  { id: 'l2', text: 'No screens 15 minutes before bed', category: 'Lifestyle', level: 'Beginner', duration: '15 min' },
  { id: 'l3', text: 'Eat a meal without any distractions', category: 'Lifestyle', level: 'Intermediate', duration: '20 min' },
  { id: 'l4', text: 'Prepare a healthy snack for tomorrow', category: 'Lifestyle', level: 'Intermediate', duration: '10 min' },
  { id: 'l5', text: 'Go to bed 30 minutes earlier than usual', category: 'Lifestyle', level: 'Advanced', duration: '30 min' },
  { id: 'l6', text: 'Try a new healthy recipe', category: 'Lifestyle', level: 'Advanced', duration: '45 min' },

  // SOCIAL
  { id: 's1', text: 'Send a kind text to a friend', category: 'Social', level: 'Beginner', duration: '2 min' },
  { id: 's2', text: 'Compliment a stranger or colleague', category: 'Social', level: 'Beginner', duration: '1 min' },
  { id: 's3', text: 'Call a family member for 10 minutes', category: 'Social', level: 'Intermediate', duration: '10 min' },
  { id: 's4', text: 'Listen actively without interrupting', category: 'Social', level: 'Intermediate', duration: '5 min' },
  { id: 's5', text: 'Volunteer for a small task', category: 'Social', level: 'Advanced', duration: '30 min' },
  { id: 's6', text: 'Write a handwritten thank you note', category: 'Social', level: 'Advanced', duration: '10 min' },
];
