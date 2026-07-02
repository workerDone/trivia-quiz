import { QuizQuestion } from './quiz-data';

function decode(value: string): string {
  return decodeURIComponent(value);
}

/**
 * The API is requested with `encode=url3986`, so every text field arrives
 * url-encoded. Decode them here so the rest of the app deals with plain text
 * instead of HTML entities like `&quot;` or `&#039;`.
 */
export function decodeQuestion(question: QuizQuestion): QuizQuestion {
  return {
    ...question,
    category: decode(question.category),
    question: decode(question.question),
    correct_answer: decode(question.correct_answer),
    incorrect_answers: Array.isArray(question.incorrect_answers)
      ? question.incorrect_answers.map(decode)
      : decode(question.incorrect_answers),
  } as QuizQuestion;
}
