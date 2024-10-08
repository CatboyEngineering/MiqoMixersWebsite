import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-state.interface';
import { AuthState } from './auth-state.interface';

export const selectAuthState = createFeatureSelector<AuthState>('authState');
export const selectAuthToken = createSelector(selectAuthState, (state: AuthState) => state.authToken);
export const selectUserID = createSelector(selectAuthState, (state: AuthState) => state.accountID);
export const selectDisplayName = createSelector(selectAuthState, (state: AuthState) => state.displayName);
export const selectIsAdmin = createSelector(selectAuthState, (state: AuthState) => state.isAdmin);
export const selectAccounts = createSelector(selectAuthState, (state: AuthState) => state.accountList);
