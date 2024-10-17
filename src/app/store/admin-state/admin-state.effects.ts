import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AdminAccountListResponse } from '../../models/API/response/admin-account-list-response.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { Report } from '../../models/report.interface';
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

  accountsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.requestAccounts),
      mergeMap(action =>
        this.httpService.GET<AdminAccountListResponse[]>('admin/accounts', undefined).pipe(
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

  reportsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.requestReports),
      mergeMap(action =>
        this.httpService.GET<Report[]>('report', undefined).pipe(
          map(response => {
            return AdminStateActions.receiveReports({ reports: response.body! });
          }),
          catchError(error => {
            return of(AdminStateActions.retrievalError({ form: FormName.ADMIN, error: error }));
          })
        )
      )
    )
  );

  reportsReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AdminStateActions.receiveReports),
        tap(action => {
          this.adminStateService.reports$.next(action.reports);
        })
      ),
    { dispatch: false }
  );

  deleteReportRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.requestDeleteReport),
      mergeMap(action =>
        this.httpService.DELETE<any>('report/' + action.reportID, undefined).pipe(
          map(response => {
            return AdminStateActions.receiveDeleteReport();
          }),
          catchError(error => {
            return of(AdminStateActions.retrievalError({ form: FormName.ADMIN, error: error }));
          })
        )
      )
    )
  );

  deleteReportReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.receiveDeleteReport),
      map(() => AdminStateActions.requestReports())
    )
  );

  accountToggleRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminStateActions.requestAccountStatusToggle),
      mergeMap(action =>
        this.httpService.PATCH<AdminAccountListResponse>('admin/account/' + action.accountID, null, undefined).pipe(
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
