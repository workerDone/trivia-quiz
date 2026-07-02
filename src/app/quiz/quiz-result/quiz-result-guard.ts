import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const quizResultGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (localStorage.getItem(id!)) {
    return true;
  }
  return router.createUrlTree(['/']);
};
