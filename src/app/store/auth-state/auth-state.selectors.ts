import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth-state.interface';

export const selectAuthState = createFeatureSelector<AuthState>('authState');
export const selectAuthToken = createSelector(selectAuthState, (state: AuthState) => state.authToken);
export const selectAccountID = createSelector(selectAuthState, (state: AuthState) => state.accountID);
export const selectCharacterID = createSelector(selectAuthState, (state: AuthState) => state.characterID);
export const selectCharacterName = createSelector(selectAuthState, (state: AuthState) => state.characterName);
export const selectCharacterServer = createSelector(selectAuthState, (state: AuthState) => state.characterServer);
export const selectAvatarURL = createSelector(selectAuthState, (state: AuthState) => state.characterAvatarUrl);
export const selectCharacterVerified = createSelector(selectAuthState, (state: AuthState) => state.characterVerified);
export const selectCharacterVerificationCode = createSelector(selectAuthState, (state: AuthState) => state.characterVerificationCode);
export const selectIsAdmin = createSelector(selectAuthState, (state: AuthState) => state.isAdmin);
