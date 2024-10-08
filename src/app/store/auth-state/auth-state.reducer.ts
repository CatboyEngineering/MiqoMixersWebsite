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
      accountID: action.response.accountID,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer,
      userAvatarUrl: action.response.userAvatarURL
    })
  ),
  on(
    AuthStateActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      authToken: action.response.authToken,
      accountID: action.response.accountID,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer,
      userAvatarUrl: action.response.userAvatarURL
    })
  ),
  on(
    AuthStateActions.nameChangeSuccess,
    (state, action): AuthState => ({
      ...state,
      characterName: action.response.characterName,
      characterServer: action.response.characterServer
    })
  ),
  on(AuthStateActions.logOutSuccess, (state, action): AuthState => authInitialState),
  on(AuthStateActions.authDataCleared, (state, action): AuthState => authInitialState)
);
