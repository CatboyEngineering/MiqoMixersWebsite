import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountCreateRequest } from '../../models/API/request/account-create-request.interface';
import { AccountLoginRequest } from '../../models/API/request/account-login-request.interface';
import { NameChangeRequest } from '../../models/API/request/name-change-request.interface';
import { AuthStateActions } from './auth-state.actions';
import { selectAuthToken, selectAvatarURL, selectCharacterName, selectCharacterServer, selectUserID } from './auth-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  authToken$: Observable<string> = this.store.select(selectAuthToken);
  userID$: Observable<string> = this.store.select(selectUserID);
  characterName$: Observable<string> = this.store.select(selectCharacterName);
  characterServer$: Observable<string> = this.store.select(selectCharacterServer);
  avatarURL$: Observable<string> = this.store.select(selectAvatarURL);

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
