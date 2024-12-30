import { createReducer, on } from '@ngrx/store';
import { savedInitialState } from './saved-initial-state';
import { SavedStateActions } from './saved-state.actions';
import { SavedState } from './saved-state.interface';

export const savedStateReducer = createReducer(
  savedInitialState,
  on(
    SavedStateActions.saveSuccess,
    (state, action): SavedState => ({
      ...state,
      savedVenues: [...state.savedVenues, action.venue.venue.venueID]
    })
  ),
  on(
    SavedStateActions.clearSuccess,
    (state, action): SavedState => ({
      ...state,
      savedVenues: []
    })
  ),
  on(SavedStateActions.unsaveSuccess, (state, action): SavedState => {
    var newList = [...state.savedVenues];
    var i = newList.findIndex(v => v === action.venue.venue.venueID);

    if (i >= 0) {
      newList.splice(i, 1);
    }

    return {
      ...state,
      savedVenues: newList
    };
  })
);
