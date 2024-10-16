import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { FormName } from '../../models/enum/form-name.enum';
import { FormErrorService } from '../../services/form-error-service/form-error.service';
import { HTTPService } from '../../services/http-service/http.service';
import { AuthStateActions } from '../auth-state/auth-state.actions';
import { VenueStateActions } from '../venue-state/venue-state.actions';
import { AppDetailsStateActions } from './app-details-state.actions';
import { AppDetailsStateService } from './app-details-state.service';

@Injectable()
export class AppDetailsStateEffects {
  constructor(
    private actions$: Actions,
    private appDetailsStateService: AppDetailsStateService,
    private router: Router,
    private httpService: HTTPService,
    private formErrorService: FormErrorService
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

  requestReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppDetailsStateActions.requestReport),
      mergeMap(action =>
        this.httpService.PUT<any>('report', action.request, 'CREATE_REPORT').pipe(
          map(() => {
            return AppDetailsStateActions.receiveReport();
          }),
          catchError(error => {
            return of(AppDetailsStateActions.retrievalError({ form: FormName.REPORT_VENUE, error: error }));
          })
        )
      )
    )
  );

  receiveReport$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppDetailsStateActions.receiveReport),
        tap(() => {
          this.router.navigate(['/report-submitted']);
        })
      ),
    { dispatch: false }
  );

  stateCleared$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppDetailsStateActions.clearFullState),
      mergeMap(() => [AuthStateActions.authDataCleared(), VenueStateActions.clearVenues()])
    )
  );

  retrievalFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppDetailsStateActions.retrievalError),
      map(payload => AppDetailsStateActions.formError({ error: this.formErrorService.mapFormAPIError(payload.form, payload.error) }))
    )
  );
}
