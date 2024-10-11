import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Venue } from '../../models/venue.interface';
import { VenueStateActions } from './venue-state.actions';

@Injectable({
  providedIn: 'root'
})
export class VenueStateService {
  venues$: BehaviorSubject<Venue[]>;

  constructor(private store: Store, private router: Router) {
    this.venues$ = new BehaviorSubject<Venue[]>([]);
  }

  onGetVenues(): void {
    this.store.dispatch(VenueStateActions.requestVenues());
  }

  onDeleteVenue(venue: Venue): void {
    this.store.dispatch(VenueStateActions.requestDeleteVenue({ venue }));
  }

  onClearVenues() {
    this.store.dispatch(VenueStateActions.clearVenues());
  }
}
