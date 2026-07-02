import { QuizQuestion } from './quiz-data';

export function getPossibleAnswers(question: QuizQuestion): string[] {
  if (question.type === 'multiple') {
    return [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);
  }
  if (question.type === 'boolean') {
    return [question.correct_answer, ...question.incorrect_answers].sort();
  }
  throw new Error('Missing a type');
}
