import { QuestionDifficulty } from './question-difficulty';
import { QuizQuestion } from './quiz-data';
import { SECONDS_IN_MINUTE } from '../../shared/time-constants';

/** Points awarded for a correct answer, weighted by difficulty. */
const POINTS_BY_DIFFICULTY: Record<QuestionDifficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export interface QuizResult {
  size: number;
  correctAnswers: number;
  wrongAnswers: number;
  points: number;
  target: number;
  success: boolean;
  timeInSeconds: number
}

export function getQuizResult(
  answers: { [id: number]: string },
  questions: QuizQuestion[],
  target: number,
  secondsLeft: number = 0,
): QuizResult {
  const size = questions.length;
  const correctQuestions = questions.filter(
    (question, i) => answers[i] === question.correct_answer,
  );
  const correctAnswers = correctQuestions.length;
  const wrongAnswers = size - correctAnswers;
  const points = correctQuestions.reduce(
    (total, question) => total + POINTS_BY_DIFFICULTY[question.difficulty],
    0,
  );
  const percentage = size > 0 ? (correctAnswers / size) * 100 : 0;
  const success = percentage >= target;

  return { size, correctAnswers, wrongAnswers, points, target, success, timeInSeconds: questions.length * SECONDS_IN_MINUTE - secondsLeft };
}
