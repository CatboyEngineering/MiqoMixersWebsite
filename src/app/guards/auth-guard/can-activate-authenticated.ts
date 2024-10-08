import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn } from '@angular/router';
import { AuthStateService } from '../../store/auth-state/auth-state.service';
import { Observable, map, take } from 'rxjs';

export function canActivateAuthenticated(): CanActivateFn {
  return () => {
    const authStateService = inject(AuthStateService);

    return authStateService.authToken$.pipe(
      take(1),
      map(token => {
        if (!token) {
          authStateService.onExpired();
          return false;
        }

        return true;
      })
    );
  }
}