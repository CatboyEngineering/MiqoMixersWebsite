import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HTTPService } from '../../services/http-service/http.service';
import { AuthStateService } from '../auth-state/auth-state.service';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { AppDetailsStateActions } from './app-details-state.actions';
import { AuthStateActions } from '../auth-state/auth-state.actions';
import { AppDetailsStateService } from './app-details-state.service';
import { Account } from '../../models/account.interface';

@Injectable()
export class AppDetailsStateEffects {
  constructor(
    private actions$: Actions,
    private appDetailsStateService: AppDetailsStateService,
    private router: Router,
    private httpService: HTTPService
  ) {}

  serverErrorReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.serverError),
        tap(() => {
          this.router.navigate(['/error']);
        })
      ),
    { dispatch: false }
  );

  formErrorFound$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.formError),
        withLatestFrom(this.appDetailsStateService.formErrors$),
        tap(([error, formErrors]) => {
          this.appDetailsStateService.formErrors$.next([...formErrors, error.error]);
        })
      ),
    { dispatch: false }
  );

  formErrorsCleared$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.formErrorsCleared),
        tap(() => {
          this.appDetailsStateService.formErrors$.next([]);
        })
      ),
    { dispatch: false }
  );

  stateCleared$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppDetailsStateActions.clearFullState),
      mergeMap(() => [AuthStateActions.authDataCleared()])
    )
  );
}
