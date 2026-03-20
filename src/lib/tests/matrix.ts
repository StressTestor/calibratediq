import { TestType, Question } from './types';
import { generatePuzzle } from '../puzzle-generator';

// Re-export the existing puzzle generator wrapped in the TestType interface
const matrixTest: TestType = {
  slug: 'matrix',
  name: 'Pattern Recognition',
  shortName: 'mx',
  description: 'Identify the missing piece in visual pattern matrices. Based on Raven\'s Progressive Matrices methodology.',
  icon: '\u25E7',
  totalQuestions: 30,
  learnMoreUrl: '/learn/ravens-progressive-matrices',

  generateQuestion(seed: number, questionIndex: number): Question {
    const puzzle = generatePuzzle(seed, questionIndex);
    return {
      data: {
        grid: puzzle.grid,
        gridSize: puzzle.gridSize,
        difficulty: puzzle.difficulty,
        transforms: puzzle.transforms,
      },
      options: puzzle.options,
      correctIndex: puzzle.correctOptionIndex,
    };
  },

  renderQuestion() {
    // Placeholder - actual rendering done via test-type-specific renderer components
    return null;
  },

  renderOption() {
    // Placeholder - actual rendering done via test-type-specific renderer components
    return null;
  },
};

export default matrixTest;
