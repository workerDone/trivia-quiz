import { Routes } from '@angular/router';
import { quizResultGuard } from './quiz/quiz-result/quiz-result-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./quiz/quizzes/quizzes').then((m) => m.Quizzes),
  },
  {
    path: ':id',
    loadComponent: () => import('./quiz/quiz/quiz').then((m) => m.Quiz),
  },
  {
    path: ':id/result',
    canActivate: [quizResultGuard],
    loadComponent: () => import('./quiz/quiz-result/quiz-result').then((m) => m.QuizResult),
  },
  { path: '**', redirectTo: '' },
];
