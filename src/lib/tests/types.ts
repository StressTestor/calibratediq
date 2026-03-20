import { ReactNode } from 'react';

export interface Question {
  // The question data (test-type specific)
  data: unknown;
  // The answer options
  options: unknown[];
  // Index of the correct answer in options array
  correctIndex: number;
}

export interface TestType {
  slug: string;
  name: string;
  shortName: string; // For composite URL prefix (2 chars: 'mx', 'sp', 'nm', 'lg', 'vb', 'mm')
  description: string;
  icon: string; // emoji or SVG path for test selector cards
  generateQuestion: (seed: number, questionIndex: number) => Question;
  renderQuestion: (data: unknown) => ReactNode;
  renderOption: (option: unknown, index: number) => ReactNode;
  totalQuestions: number;
  // For memory test: time in ms to show stimulus before hiding
  revealDuration?: number;
  // Link to relevant /learn article
  learnMoreUrl: string;
}

export const TEST_SLUGS = ['matrix', 'spatial', 'numerical', 'logical', 'verbal', 'memory'] as const;
export type TestSlug = typeof TEST_SLUGS[number];
