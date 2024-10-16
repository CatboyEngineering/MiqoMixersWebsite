import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountCreateRequest } from '../../models/API/request/account-create-request.interface';
import { AccountLoginRequest } from '../../models/API/request/account-login-request.interface';
import { ChangeCharacterRequest } from '../../models/API/request/change-character-request.interface';
import { AuthStateActions } from './auth-state.actions';
import {
  selectAccountID,
  selectAuthToken,
  selectAvatarURL,
  selectCharacterID,
  selectCharacterName,
  selectCharacterServer,
  selectCharacterVerificationCode,
  selectCharacterVerified,
  selectIsAdmin
} from './auth-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  authToken$: Observable<string> = this.store.select(selectAuthToken);
  accountID$: Observable<string> = this.store.select(selectAccountID);
  characterID$: Observable<string> = this.store.select(selectCharacterID);
  characterName$: Observable<string> = this.store.select(selectCharacterName);
  characterServer$: Observable<string> = this.store.select(selectCharacterServer);
  avatarURL$: Observable<string> = this.store.select(selectAvatarURL);
  isCharacterVerified$: Observable<boolean> = this.store.select(selectCharacterVerified);
  characterVerificationCode$: Observable<string | undefined> = this.store.select(selectCharacterVerificationCode);
  isAdmin$: Observable<boolean | undefined> = this.store.select(selectIsAdmin);

  constructor(private store: Store) {}

  onRegisterRequest(request: AccountCreateRequest): void {
    this.store.dispatch(AuthStateActions.registerAttempt({ request }));
  }

  onLoginRequest(request: AccountLoginRequest): void {
    this.store.dispatch(AuthStateActions.loginAttempt({ request }));
  }

  onVerifyCharacterRequest(): void {
    this.store.dispatch(AuthStateActions.verifyAttempt());
  }

  onChangeCharacterRequest(request: ChangeCharacterRequest): void {
    this.store.dispatch(AuthStateActions.characterChangeAttempt({ request }));
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

  onHeartbeat(): void {
    this.store.dispatch(AuthStateActions.authenticationHeartbeatAttempt());
  }

  onExpired(): void {
    this.store.dispatch(AuthStateActions.authExpired());
  }
}
