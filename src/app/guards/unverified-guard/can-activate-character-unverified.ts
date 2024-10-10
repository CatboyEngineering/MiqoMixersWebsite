import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthStateService } from '../../store/auth-state/auth-state.service';

export function canActivateCharacterUnverified(): CanActivateFn {
  return () => {
    const authStateService = inject(AuthStateService);

    return authStateService.isCharacterVerified$.pipe(
      take(1),
      map(isVerified => !isVerified)
    );
  };
}
