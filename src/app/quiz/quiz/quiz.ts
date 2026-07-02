import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ErrorMessage } from '../../shared/error-message/error-message';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardActions,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { Timer } from '../../shared/timer/timer';
import { getQuizResult } from './quiz-resolver';
import { SECONDS_IN_MINUTE } from '../../shared/time-constants';
import { QuizApi } from './quiz-api';

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoadingSpinner,
    ErrorMessage,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgClass,
    Timer,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id')!)));
  private quizApi = inject(QuizApi);
  readonly quizResource = this.quizApi.getQuestions(this.id()!);
  private readonly questions = computed(() => this.quizResource.value() ?? []);
  private readonly currentIndex = signal(0);
  readonly questionsSize = computed(() => this.questions().length);
  readonly timeInSeconds = computed(() => this.questionsSize() * SECONDS_IN_MINUTE);
  readonly questionsCount = computed(() => `${this.currentIndex() + 1} / ${this.questionsSize()}`);
  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly answers = signal<Record<number, string>>({});
  readonly selectedAnswer = computed(() => this.answers()[this.currentIndex()]);
  readonly isFirst = computed(() => this.currentIndex() === 0);
  readonly isLast = computed(() => this.currentIndex() === this.questions().length - 1);
  readonly isCurrentQuestionAnswered = computed(() => !!this.answers()[this.currentIndex()]);
  private readonly timer = viewChild(Timer);

  select(answer: string): void {
    this.answers.update((answers) => ({ ...answers, [this.currentIndex()]: answer }));
    if (this.isLast()) {
      this.showResult();
    }
  }

  showResult() {
    const result = getQuizResult(
      this.answers(),
      this.questions(),
      70,
      this.timer()?.secondsLeft() || 0,
    );
    localStorage.setItem(this.id()!, JSON.stringify(result));

    this.router.navigate([`/${this.id()}/result`]);
  }

  next(): void {
    this.currentIndex.update((index) => index + 1);
  }

  previous(): void {
    this.currentIndex.update((index) => index - 1);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  reload(): void {
    this.quizResource.reload();
  }
}
