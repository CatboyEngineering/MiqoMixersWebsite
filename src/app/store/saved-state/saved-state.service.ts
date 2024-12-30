import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CombinedVenue } from '../../models/combined-venue.interface';
import { SavedStateActions } from './saved-state.actions';
import { selectSavedVenues } from './saved-state.selectors';

@Injectable({
  providedIn: 'root'
})
export class SavedStateService {
  savedVenues$: Observable<string[]> = this.store.select(selectSavedVenues);

  constructor(private store: Store) {}

  onSaveVenue(venue: CombinedVenue): void {
    this.store.dispatch(SavedStateActions.saveAttempt({ venue }));
  }

  onUnsaveVenue(venue: CombinedVenue): void {
    this.store.dispatch(SavedStateActions.unsaveAttempt({ venue }));
  }

  onClearSaved(): void {
    this.store.dispatch(SavedStateActions.clearAttempt());
  }
}
