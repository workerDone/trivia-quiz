import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { LoadingSpinner } from '../../shared/loading-spinner/loading-spinner';
import { ErrorMessage } from '../../shared/error-message/error-message';
import { QuizzesApi } from './quizzes-api';

@Component({
  selector: 'app-quizzes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardTitle,
    LoadingSpinner,
    ErrorMessage,
    MatCardSubtitle,
  ],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss',
})
export class Quizzes {
  private readonly router = inject(Router);
  private quizzesApi = inject(QuizzesApi);
  quizzes = this.quizzesApi.getQuizzes();

  reload(): void {
    this.quizzes.reload();
  }

  startRandom(): void {
    const categories = this.quizzes.value();
    if (!categories?.length) {
      return;
    }
    const random = categories[Math.floor(Math.random() * categories.length)];
    this.router.navigate([random.id]);
  }
}
