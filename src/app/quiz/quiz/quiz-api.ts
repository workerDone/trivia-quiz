import { inject, Service } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { OptionedQuizQuestion, QuizData } from './quiz-data';
import { first, map } from 'rxjs';
import { decodeQuestion } from './question-decoder';
import { HttpClient } from '@angular/common/http';
import { getPossibleAnswers } from './question-creator';

@Service()
export class QuizApi {
  private http = inject(HttpClient);
  getQuestions(id: string) {
    return rxResource<OptionedQuizQuestion[], unknown>({
      stream: () =>
        this.http
          .get<QuizData>(`https://opentdb.com/api.php?category=${id}&amount=10&encode=url3986`)
          .pipe(
            first(),
            map((quizData) => quizData.results.map(decodeQuestion)),
            map((questions) =>
              questions.map((question) => ({ ...question, options: getPossibleAnswers(question) })),
            ),
          ),
    });
  }
}
