import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AuthStateActions } from './auth-state.actions';
import { AccountCreateRequest } from '../../models/API/request/account-create-request.interface';
import { AccountLoginRequest } from '../../models/API/request/account-login-request.interface';
import { selectAccounts, selectAuthToken, selectDisplayName, selectIsAdmin, selectUserID } from './auth-state.selectors';
import { NameChangeRequest } from '../../models/API/request/name-change-request.interface';
import { ChangePasswordRequest } from '../../models/API/request/change-password-request.interface';
import { FormValidationError } from '../../models/form-validation-error.interface';
import { Account } from '../../models/account.interface';
import { UpdateMaxShellsRequest } from '../../models/API/request/update-max-shells-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  authToken$: Observable<string> = this.store.select(selectAuthToken);
  userID$: Observable<string> = this.store.select(selectUserID);
  displayName$: Observable<string> = this.store.select(selectDisplayName);
  isAdmin$: Observable<boolean> = this.store.select(selectIsAdmin);
  accountList$: Observable<Account[]> = this.store.select(selectAccounts);

  constructor(private store: Store) {}

  onRegisterRequest(request: AccountCreateRequest): void {
    this.store.dispatch(AuthStateActions.registerAttempt({ request }));
  }

  onLoginRequest(request: AccountLoginRequest): void {
    this.store.dispatch(AuthStateActions.loginAttempt({ request }));
  }

  onNameChangeRequest(request: NameChangeRequest): void {
    this.store.dispatch(AuthStateActions.nameChangeAttempt({ request }));
  }

  onChangePasswordRequest(request: ChangePasswordRequest): void {
    this.store.dispatch(AuthStateActions.changePasswordAttempt({ request }));
  }

  onRequestGetUserList(): void {
    this.store.dispatch(AuthStateActions.userListRequested());
  }

  onRequestAdjustUserShells(request: UpdateMaxShellsRequest): void {
    this.store.dispatch(AuthStateActions.userChangeShellsRequested({ request }));
  }

  onDeleteAccountRequest(): void {
    this.store.dispatch(AuthStateActions.deleteAttempt());
  }

  onLogOut(): void {
    this.store.dispatch(AuthStateActions.logOutAttempt());
  }

  onAuthDataCleared(): void {
    this.store.dispatch(AuthStateActions.authDataCleared());
  }

  onExpired(): void {
    this.store.dispatch(AuthStateActions.authExpired());
  }
}
