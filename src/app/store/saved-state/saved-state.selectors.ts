import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SavedState } from './saved-state.interface';

export const selectSavedState = createFeatureSelector<SavedState>('savedState');
export const selectSavedVenues = createSelector(selectSavedState, (state: SavedState) => state.savedVenues);
