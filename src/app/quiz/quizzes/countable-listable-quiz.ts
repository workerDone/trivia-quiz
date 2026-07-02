import { ListableQuiz } from './listable-quiz';

export interface CountableListableQuiz extends ListableQuiz {
  questionSize: number;
}
