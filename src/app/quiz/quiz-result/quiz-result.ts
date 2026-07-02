import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { QuizResult as QuizResultData } from '../quiz/quiz-resolver';
import { Time } from '../../shared/time/time';

@Component({
  selector: 'app-quiz-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Time],
  templateUrl: './quiz-result.html',
  styleUrl: './quiz-result.scss',
})
export class QuizResult {
  private readonly route = inject(ActivatedRoute);
  readonly id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id')!)));

  private readonly result = computed<QuizResultData | null>(() => {
    const id = this.id();
    if (!id) return null;
    const raw = localStorage.getItem(id);
    return raw ? JSON.parse(raw) : null;
  });

  readonly size = computed(() => this.result()?.size);
  readonly correctAnswers = computed(() => this.result()?.correctAnswers);
  readonly wrongAnswers = computed(() => this.result()?.wrongAnswers);
  readonly points = computed(() => this.result()?.points);
  readonly target = computed(() => this.result()?.target);
  readonly success = computed(() => this.result()?.success);
  readonly timeInSeconds = computed(() => this.result()?.timeInSeconds);
}
