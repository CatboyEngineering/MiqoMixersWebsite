import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthStateService } from '../../store/auth-state/auth-state.service';

export function canActivateIsAdmin(): CanActivateFn {
  return () => {
    const authStateService = inject(AuthStateService);

    return authStateService.isAdmin$.pipe(
      take(1),
      map(admin => {
        if (!admin) {
          return false;
        }

        return true;
      })
    );
  };
}
