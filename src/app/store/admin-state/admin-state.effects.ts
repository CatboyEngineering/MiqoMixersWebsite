import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AdminAccountListResponse } from '../../models/API/response/admin-account-list-response.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { FormErrorService } from '../../services/form-error-service/form-error.service';
import { HTTPService } from '../../services/http-service/http.service';
import { AppDetailsStateActions } from '../app-details-state/app-details-state.actions';
import { AdminStateActions } from './admin-state.actions';
import { AdminStateService } from './admin-state.service';

@Injectable()
export class AdminStateEffects {
  constructor(
    private actions$: Actions,
    private adminStateService: AdminStateService,
    private httpService: HTTPService,
    private formErrorService: FormErrorService,
    private router: Router
  ) {}

  accountRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.requestAccounts),
      mergeMap(action =>
        this.httpService.GET<AdminAccountListResponse[]>('admin/accounts', 'GET_ACCOUNTS').pipe(
          map(response => {
            return AdminStateActions.receiveAccounts({ accounts: response.body! });
          }),
          catchError(error => {
            return of(AdminStateActions.retrievalError({ form: FormName.ADMIN, error: error }));
          })
        )
      )
    )
  );

  accountsReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminStateActions.receiveAccounts),
        tap(action => {
          this.adminStateService.accounts$.next(action.accounts);
        })
      ),
    { dispatch: false }
  );

  accountToggleRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.requestAccountStatusToggle),
      mergeMap(action =>
        this.httpService.PATCH<AdminAccountListResponse>('admin/account/' + action.accountID, null, 'TOGGLE_ACCOUNT').pipe(
          map(response => {
            return AdminStateActions.receiveAccountStatusToggle({ account: response.body! });
          }),
          catchError(error => {
            return of(AdminStateActions.retrievalError({ form: FormName.ADMIN, error: error }));
          })
        )
      )
    )
  );

  accountToggleReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.receiveAccountStatusToggle),
      map(() => {
        return AdminStateActions.requestAccounts();
      })
    )
  );

  retrievalFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.retrievalError),
      map(payload => AppDetailsStateActions.formError({ error: this.formErrorService.mapFormAPIError(payload.form, payload.error) }))
    )
  );
}
