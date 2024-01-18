import { CanActivateFn } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      if (user) {
        // User is authenticated, allow access
        return true;
      } else {
        // User is not authenticated, redirect to login
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
