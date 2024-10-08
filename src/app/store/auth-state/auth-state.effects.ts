import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store/src/models';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthStateActions } from './auth-state.actions';
import { HTTPService } from '../../services/http-service/http.service';
import { AccountAuthenticatedResponse } from '../../models/API/response/account-authenticated-response.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { FormValidationError } from '../../models/form-validation-error.interface';
import { AppDetailsStateActions } from '../app-details-state/app-details-state.actions';
import { NameChangeResponse } from '../../models/API/response/name-change-response.interface';
import { Account } from '../../models/account.interface';

@Injectable()
export class AuthStateEffects {
  constructor(private actions$: Actions, private httpService: HTTPService, private router: Router) {}

  registerAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.registerAttempt),
      mergeMap(action =>
        this.httpService.PUT<AccountAuthenticatedResponse>('account', action.request, 'REGISTER_ACCOUNT').pipe(
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
          this.router.navigate(['/user']);
        })
      ),
    { dispatch: false }
  );

  loginAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.loginAttempt),
      mergeMap(action =>
        this.httpService.POST<AccountAuthenticatedResponse>('account', action.request, 'LOG_IN').pipe(
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
        tap(() => {
          this.router.navigate(['/user']);
        })
      ),
    { dispatch: false }
  );

  nameChangeAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.nameChangeAttempt),
      mergeMap(action =>
        this.httpService.PATCH<NameChangeResponse>('account', action.request, 'CHANGE_NAME').pipe(
          map(response => {
            return AuthStateActions.nameChangeSuccess({ response: response.body! });
          }),
          catchError(error => {
            return of(AuthStateActions.authFailure({ form: FormName.CHANGE_NAME, error: error }));
          })
        )
      )
    )
  );

  changePasswordAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.changePasswordAttempt),
      mergeMap(action =>
        this.httpService.PATCH<NameChangeResponse>('account-details', action.request, 'CHANGE_PASSWORD').pipe(
          map(() => {
            return AuthStateActions.changePasswordSuccess();
          }),
          catchError(error => {
            return of(AuthStateActions.authFailure({ form: FormName.CHANGE_PASSWORD, error: error }));
          })
        )
      )
    )
  );

  changePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthStateActions.changePasswordSuccess),
        tap(() => {
          this.router.navigate(['/user']);
        })
      ),
    { dispatch: false }
  );

  logOutAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.logOutAttempt),
      mergeMap(() =>
        this.httpService.POST<any>('logout', {}, 'LOG_OUT').pipe(
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
        this.httpService.DELETE<any>('account', 'DELETE_ACCOUNT').pipe(
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
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.authFailure),
      map(payload => AppDetailsStateActions.formError({ error: this.mapAuthFailure(payload.form, payload.error) }))
    )
  );

  userListRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.userListRequested),
      mergeMap(() =>
        this.httpService.GET<Account[]>('admin/users', 'GET_USER_LIST').pipe(
          map(response => {
            return AuthStateActions.userListReceived({ accounts: response.body! });
          })
        )
      )
    )
  );

  userListReceived$ = createEffect(() => this.actions$.pipe(ofType(AuthStateActions.userListReceived)), { dispatch: false });

  userChangeShellsRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.userChangeShellsRequested),
      mergeMap(action =>
        this.httpService.PATCH<any>('admin/maxshells', action.request, 'EDIT_USER_MAX_SHELLS').pipe(
          map(() => {
            return AuthStateActions.userChangeShellsReceived();
          })
        )
      )
    )
  );

  userChangeShellsReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStateActions.userChangeShellsReceived),
      map(() => {
        return AuthStateActions.userListRequested();
      }),
      catchError(error => {
        return of(AuthStateActions.authFailure({ form: FormName.UPDATE_SHELLS, error: error }));
      })
    )
  );

  private mapAuthFailure(form: FormName, error: HttpErrorResponse): FormValidationError {
    switch (error.status) {
      case 400:
        return {
          form,
          error: 'There was an error processing your request. Please check your data and try again.'
        };
      case 401: {
        return {
          form,
          error: 'Your username or password was incorrect.'
        };
      }
      case 409: {
        return {
          form,
          error: 'An account with that username already exists.'
        };
      }
      default:
        return {
          form,
          error: 'There was an error with your request. Please try again.'
        };
    }
  }
}
