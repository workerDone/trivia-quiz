import { Question } from './question';
import { MultipleQuestionType } from './question-type';

export interface MultipleQuestion extends Question<MultipleQuestionType, string[]> {}
