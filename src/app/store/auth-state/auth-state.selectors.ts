import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-state.interface';

export const selectAuthState = createFeatureSelector<AuthState>('authState');
export const selectAuthToken = createSelector(selectAuthState, (state: AuthState) => state.authToken);
export const selectUserID = createSelector(selectAuthState, (state: AuthState) => state.accountID);
export const selectCharacterName = createSelector(selectAuthState, (state: AuthState) => state.characterName);
export const selectCharacterServer = createSelector(selectAuthState, (state: AuthState) => state.characterServer);
export const selectAvatarURL = createSelector(selectAuthState, (state: AuthState) => state.userAvatarUrl);
