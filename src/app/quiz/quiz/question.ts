import { QuestionType } from './question-type';
import { QuestionDifficulty } from './question-difficulty';

export interface Question<Type extends QuestionType, Answers> {
  type: Type;
  difficulty: QuestionDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Answers;
}
