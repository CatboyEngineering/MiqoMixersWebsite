import { Action, createReducer, on } from '@ngrx/store';
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
      displayName: action.response.displayName,
      isAdmin: action.response.isAdmin || false
    })
  ),
  on(
    AuthStateActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      authToken: action.response.authToken,
      accountID: action.response.accountID,
      displayName: action.response.displayName,
      isAdmin: action.response.isAdmin || false
    })
  ),
  on(
    AuthStateActions.nameChangeSuccess,
    (state, action): AuthState => ({
      ...state,
      displayName: action.response.displayName
    })
  ),
  on(
    AuthStateActions.userListReceived,
    (state, action): AuthState => ({
      ...state,
      accountList: action.accounts
    })
  ),
  on(AuthStateActions.logOutSuccess, (state, action): AuthState => authInitialState),
  on(AuthStateActions.authDataCleared, (state, action): AuthState => authInitialState)
);
