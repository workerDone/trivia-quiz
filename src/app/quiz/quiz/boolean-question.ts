import { Question } from './question';
import { BooleanQuestionType } from './question-type';

export interface BooleanQuestion extends Question<BooleanQuestionType, string[]> {}
