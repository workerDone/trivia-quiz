import { inject, ResourceRef, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountableListableQuiz } from './countable-listable-quiz';
import { QuizzesData } from './quizzes-data';
import { combineLatest, first, map, switchMap } from 'rxjs';
import { QuizCountData } from './quiz-count-data';
import { HttpClient } from '@angular/common/http';

@Service()
export class QuizzesApi {
  private http = inject(HttpClient);
  getQuizzes(): ResourceRef<CountableListableQuiz[] | undefined> {
    return rxResource<CountableListableQuiz[], unknown>({
      stream: () =>
        this.http.get<QuizzesData>('https://opentdb.com/api_category.php').pipe(
          first(),
          map((quizzesData) => {
            const { trivia_categories } = quizzesData;
            return [...trivia_categories].sort(() => Math.random() - 0.5).slice(0, 10);
          }),
          switchMap((trivia_categories) => {
            return combineLatest(
              trivia_categories.map((trivia_categorie) =>
                this.http.get<QuizCountData>(
                  `https://opentdb.com/api_count.php?category=${trivia_categorie.id}`,
                ),
              ),
            ).pipe(
              first(),
              map((quizzesCounts) =>
                trivia_categories.map((trivia_categorie, i) => ({
                  ...trivia_categorie,
                  questionSize: quizzesCounts[i].category_question_count.total_question_count,
                })),
              ),
            );
          }),
        ),
    });
  }
}
