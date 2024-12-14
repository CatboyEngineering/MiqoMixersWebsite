import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { ReassignVenueRequest } from '../../models/API/request/reassign-venue-request.interface';
import { AdminAccountListResponse } from '../../models/API/response/admin-account-list-response.interface';
import { Report } from '../../models/report.interface';
import { AdminStateActions } from './admin-state.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {
  accounts$: BehaviorSubject<AdminAccountListResponse[]>;
  reports$: BehaviorSubject<Report[]>;

  constructor(private store: Store, private router: Router) {
    this.accounts$ = new BehaviorSubject<AdminAccountListResponse[]>([]);
    this.reports$ = new BehaviorSubject<Report[]>([]);
  }

  onGetAccounts(): void {
    this.store.dispatch(AdminStateActions.requestAccounts());
  }

  onGetReports(): void {
    this.store.dispatch(AdminStateActions.requestReports());
  }

  onDeleteReport(reportID: string): void {
    this.store.dispatch(AdminStateActions.requestDeleteReport({ reportID }));
  }

  onReassignVenue(request: ReassignVenueRequest): void {
    this.store.dispatch(AdminStateActions.requestReassignVenue({ request }));
  }

  onToggleAccountStatus(accountID: string): void {
    this.store.dispatch(AdminStateActions.requestAccountStatusToggle({ accountID }));
  }
}
