import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { SavedStateService } from '../../../store/saved-state/saved-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-saved-venues',
  standalone: true,
  imports: [CommonModule, VenuePostComponent, PageHeaderComponent],
  templateUrl: './saved-venues.component.html',
  styleUrl: './saved-venues.component.css'
})
export class SavedVenuesComponent {
  savedVenues$: Observable<CombinedVenue[]>;

  constructor(private venueStateService: VenueStateService, private savedStateService: SavedStateService) {
    this.savedVenues$ = combineLatest([savedStateService.savedVenues$, venueStateService.venues$]).pipe(
      map(([savedVenues, venues]) => venues.filter(venue => savedVenues.find(sv => sv === venue.venue.venueID)))
    );
  }
}
