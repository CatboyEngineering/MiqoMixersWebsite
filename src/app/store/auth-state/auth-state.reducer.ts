import { createReducer, on } from '@ngrx/store';
import { authInitialState } from './auth-initial-state';
import { AuthStateActions } from './auth-state.actions';
import { AuthState } from './auth-state.interface';

export const authStateReducer = createReducer(
  authInitialState,
  on(
    AuthStateActions.registerSuccess,
    (state, action): AuthState => ({
      ...state,
      authToken: action.response.authToken,
      characterAvatarUrl: action.response.characterAvatarUrl,
      accountID: action.response.accountID,
      characterID: action.response.characterID,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer,
      characterVerified: action.response.characterVerified,
      characterVerificationCode: action.response.characterVerificationCode
    })
  ),
  on(
    AuthStateActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      authToken: action.response.authToken,
      characterAvatarUrl: action.response.characterAvatarUrl,
      accountID: action.response.accountID,
      characterID: action.response.characterID,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer,
      characterVerified: action.response.characterVerified,
      characterVerificationCode: action.response.characterVerificationCode,
      isAdmin: action.response.isAdmin
    })
  ),
  on(
    AuthStateActions.verifySuccess,
    (state, action): AuthState => ({
      ...state,
      characterAvatarUrl: action.response.characterAvatarUrl,
      characterID: action.response.characterID,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer,
      characterVerified: true
    })
  ),
  on(
    AuthStateActions.characterChangeSuccess,
    (state, action): AuthState => ({
      ...state,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer,
      characterID: action.response.characterID,
      characterVerificationCode: action.response.characterVerificationCode,
      characterVerified: false
    })
  ),
  on(AuthStateActions.logOutSuccess, (state, action): AuthState => authInitialState),
  on(AuthStateActions.authExpired, (state, action): AuthState => authInitialState),
  on(AuthStateActions.authDataCleared, (state, action): AuthState => authInitialState)
);
