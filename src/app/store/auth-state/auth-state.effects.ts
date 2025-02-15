import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { AccountAuthenticatedResponse } from '../../models/API/response/account-authenticated-response.interface';
import { ChangePasswordResponse } from '../../models/API/response/change-password-response.interface';
import { CharacterChangeResponse } from '../../models/API/response/character-change-response.interface';
import { CharacterVerifiedResponse } from '../../models/API/response/character-verified-response.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { FormErrorService } from '../../services/form-error-service/form-error.service';
import { HTTPService } from '../../services/http-service/http.service';
import { AppDetailsStateActions } from '../app-details-state/app-details-state.actions';
import { AuthStateActions } from './auth-state.actions';
import { AuthStateService } from './auth-state.service';

@Injectable()
export class AuthStateEffects {
  constructor(
    private actions$: Actions,
    private httpService: HTTPService,
    private authStateService: AuthStateService,
    private router: Router,
    private formErrorService: FormErrorService
  ) {}

  registerAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.registerAttempt),
      mergeMap(action =>
        this.httpService.PUT<AccountAuthenticatedResponse>('account', action.request, 'PUT_REGISTER').pipe(
          map(response => {
            return AuthStateActions.registerSuccess({ response: response.body! });
          }),
          catchError(error => {
            return of(AuthStateActions.authFailure({ form: FormName.REGISTER_ACCOUNT, error: error }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/verify-character']);
        })
      ),
    { dispatch: false }
  );

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.loginAttempt),
      mergeMap(action =>
        this.httpService.POST<AccountAuthenticatedResponse>('account', action.request, 'POST_LOGIN').pipe(
          map(response => {
            return AuthStateActions.loginSuccess({ response: response.body! });
          }),
          catchError(error => {
            return of(AuthStateActions.authFailure({ form: FormName.LOG_IN, error: error }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.loginSuccess),
        withLatestFrom(this.authStateService.isCharacterVerified$),
        tap(([_, isVerified]) => {
          if (isVerified) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/verify-character']);
          }
        })
      ),
    { dispatch: false }
  );

  verifyAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.verifyAttempt),
      mergeMap(action =>
        this.httpService.PUT<CharacterVerifiedResponse>('account/verify', null, undefined).pipe(
          map(response => {
            return AuthStateActions.verifySuccess({ response: response.body! });
          }),
          catchError(error => {
            return of(AuthStateActions.verifyFailure({ form: FormName.VERIFY_CHARACTER, error: error }));
          })
        )
      )
    )
  );

  verifySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.verifySuccess),
        tap(() => {
          this.router.navigate(['/verify-character-success']);
        })
      ),
    { dispatch: false }
  );

  characterChangeAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.characterChangeAttempt),
      mergeMap(action =>
        this.httpService.PATCH<CharacterChangeResponse>('account', action.request, undefined).pipe(
          map(response => {
            return AuthStateActions.characterChangeSuccess({ response: response.body! });
          }),
          catchError(error => {
            return of(AuthStateActions.authFailure({ form: FormName.CHANGE_CHARACTER, error: error }));
          })
        )
      )
    )
  );

  characterChangeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.characterChangeSuccess),
        tap(() => {
          this.router.navigate(['/verify-character']);
        })
      ),
    { dispatch: false }
  );

  passwordChangeAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.passwordChangeAttempt),
      mergeMap(action =>
        this.httpService.PATCH<ChangePasswordResponse>('account/password', action.request, undefined).pipe(
          map(response => {
            return AuthStateActions.passwordChangeSuccess({ response: response.body! });
          }),
          catchError(error => {
            return of(AuthStateActions.authFailure({ form: FormName.CHANGE_PASSWORD, error: error }));
          })
        )
      )
    )
  );

  logOutAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.logOutAttempt),
      mergeMap(() =>
        this.httpService.POST<any>('logout', {}, undefined).pipe(
          map(response => {
            return AuthStateActions.logOutSuccess();
          }),
          catchError(error => {
            return of(AuthStateActions.logOutSuccess());
          })
        )
      )
    )
  );

  logOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.logOutSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  deleteAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.deleteAttempt),
      mergeMap(() =>
        this.httpService.DELETE<any>('account', undefined).pipe(
          map(response => {
            return AuthStateActions.deleteSuccess();
          })
        )
      )
    )
  );

  deleteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.deleteSuccess),
      map(() => {
        return AuthStateActions.logOutSuccess();
      })
    )
  );

  authExpired$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.authExpired),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  heartbeatAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.authenticationHeartbeatAttempt),
      withLatestFrom(this.authStateService.authToken$),
      filter(([_, token]) => !!token),
      mergeMap(() =>
        this.httpService.GET<any>('account', undefined).pipe(
          map(() => {
            return AuthStateActions.authenticationHeartbeatSucceeded();
          }),
          catchError(() => {
            return of(AuthStateActions.authExpired());
          })
        )
      )
    )
  );

  authFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.authFailure),
      map(payload => AppDetailsStateActions.formError({ error: this.formErrorService.mapFormAPIError(payload.form, payload.error) }))
    )
  );
}
