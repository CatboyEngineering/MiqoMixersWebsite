import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AdminAccountListResponse } from '../../models/API/response/admin-account-list-response.interface';
import { AdminStateActions } from './admin-state.actions';

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {
  accounts$: BehaviorSubject<AdminAccountListResponse[]>;

  constructor(private store: Store, private router: Router) {
    this.accounts$ = new BehaviorSubject<AdminAccountListResponse[]>([]);
  }

  onGetAccounts(): void {
    this.store.dispatch(AdminStateActions.requestAccounts());
  }

  onToggleAccountStatus(accountID: string): void {
    this.store.dispatch(AdminStateActions.requestAccountStatusToggle({ accountID }));
  }
}
