import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, withLatestFrom } from 'rxjs';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { SavedStateService } from '../../../store/saved-state/saved-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-saved-venues',
  standalone: true,
  imports: [CommonModule, VenuePostComponent],
  templateUrl: './saved-venues.component.html',
  styleUrl: './saved-venues.component.css'
})
export class SavedVenuesComponent {
  savedVenues$: Observable<CombinedVenue[]>;

  constructor(private venueStateService: VenueStateService, private savedStateService: SavedStateService) {
    this.savedVenues$ = savedStateService.savedVenues$.pipe(
      withLatestFrom(venueStateService.venues$),
      map(([savedVenues, venues]) => venues.filter(venue => savedVenues.find(sv => sv === venue.venue.venueID)))
    );
  }
}
