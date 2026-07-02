import { BooleanQuestion } from './boolean-question';
import { MultipleQuestion } from './multiple-question';

export type QuizQuestion = BooleanQuestion | MultipleQuestion;

export interface QuizData {
  response_code: number;
  results: QuizQuestion[];
}

export type OptionedQuizQuestion = QuizQuestion & { options: string[] };
