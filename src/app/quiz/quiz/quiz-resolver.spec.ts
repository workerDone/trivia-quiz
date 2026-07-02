import { getQuizResult } from './quiz-resolver';
import { QuizQuestion } from './quiz-data';
import { SECONDS_IN_MINUTE } from '../../shared/time-constants';

const questions = [
  { correct_answer: 'A', difficulty: 'easy' },
  { correct_answer: 'B', difficulty: 'medium' },
  { correct_answer: 'C', difficulty: 'hard' },
  { correct_answer: 'D', difficulty: 'easy' },
] as QuizQuestion[];

describe('getQuizResult', () => {
  it('should count correct and wrong answers', () => {
    const answers = { 0: 'A', 1: 'X', 2: 'C', 3: 'X' };

    const result = getQuizResult(answers, questions, 50);

    expect(result.size).toBe(4);
    expect(result.correctAnswers).toBe(2);
    expect(result.wrongAnswers).toBe(2);
    expect(result.target).toBe(50);
  });

  it('should succeed when percentage is greater than target', () => {
    const answers = { 0: 'A', 1: 'B', 2: 'C', 3: 'X' };

    expect(getQuizResult(answers, questions, 50).success).toBe(true);
  });

  it('should succeed when percentage is equal to target', () => {
    const answers = { 0: 'A', 1: 'B', 2: 'X', 3: 'X' };

    expect(getQuizResult(answers, questions, 50).success).toBe(true);
  });

  it('should fail when percentage is below target', () => {
    const answers = { 0: 'A', 1: 'X', 2: 'X', 3: 'X' };

    expect(getQuizResult(answers, questions, 50).success).toBe(false);
  });

  it('should treat unanswered questions as wrong', () => {
    const result = getQuizResult({}, questions, 50);

    expect(result.correctAnswers).toBe(0);
    expect(result.wrongAnswers).toBe(4);
    expect(result.success).toBe(false);
  });

  it('should award points weighted by difficulty for correct answers', () => {
    const answers = { 0: 'A', 1: 'B', 2: 'X', 3: 'D' };

    // easy (10) + medium (20) + easy (10) = 40
    expect(getQuizResult(answers, questions, 50).points).toBe(40);
  });

  it('should compute remaining time from seconds left', () => {
    const totalTime = questions.length * SECONDS_IN_MINUTE;

    const result = getQuizResult({}, questions, 50, 30);

    expect(result.timeInSeconds).toBe(totalTime - 30);
  });

  it('should handle an empty quiz without dividing by zero', () => {
    const result = getQuizResult({}, [], 0);

    expect(result.size).toBe(0);
    expect(result.correctAnswers).toBe(0);
    expect(result.wrongAnswers).toBe(0);
    expect(result.success).toBe(true);
  });
});
