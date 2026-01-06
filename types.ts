
export type ModuleType = 'DSA' | 'APTITUDE' | 'GATE' | 'TOEFL' | 'LANGUAGES' | 'INTERVIEW' | 'ALUMNI' | 'DASHBOARD';

export interface User {
  name: string;
  college: string;
  department: string;
  year: string;
  email: string;
}

export interface Progress {
  dsa: number;
  aptitude: number;
  gate: number;
  toefl: number;
  languages: number;
  overall: number;
  history: Record<string, number[]>;
}

export interface GATEQuestion {
  id: string;
  type: 'MCQ' | 'NAT';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

export interface GATESubject {
  name: string;
  subtopics: string[];
  learnVideos: { title: string; url: string; duration: string }[];
}

export interface LanguageLesson {
  id: string;
  category: 'Kanji' | 'Vocabulary' | 'Grammar' | 'Reading' | 'Listening' | 'Speaking';
  japanese: string;
  romaji: string;
  english: string;
  example: string;
  audioPrompt?: string;
}

export interface TOEFLQuestion {
  id: string;
  type: 'reading' | 'listening' | 'writing' | 'speaking';
  title: string;
  passage?: string;
  audioUrl?: string;
  questions?: {
    q: string;
    opts: string[];
    ans: number;
    explanation: string;
  }[];
  prompt?: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statement: string;
  approach: string;
  algorithm: string[];
  pseudocode: string;
  youtubeUrl: string;
  leetcodeUrl: string;
  gfgUrl: string;
}

export interface DSPattern {
  name: string;
  description: string;
  problems: DSAProblem[];
}

export interface DSATopic {
  name: string;
  patterns: DSPattern[];
}

export interface AptitudeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  formula?: string;
  shortcut?: string;
  companyTags?: string[];
}
