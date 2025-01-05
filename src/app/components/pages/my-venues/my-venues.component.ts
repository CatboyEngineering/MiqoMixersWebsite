import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, withLatestFrom } from 'rxjs';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-my-venues',
  standalone: true,
  imports: [CommonModule, VenuePostComponent, PageHeaderComponent],
  templateUrl: './my-venues.component.html',
  styleUrl: './my-venues.component.css'
})
export class MyVenuesComponent {
  myVenues$: Observable<CombinedVenue[]>;

  constructor(private authStateService: AuthStateService, private venueStateService: VenueStateService) {
    this.myVenues$ = venueStateService.venues$.pipe(
      withLatestFrom(authStateService.accountID$),
      map(([venues, accountID]) => venues.filter(venue => venue.venue.userID === accountID))
    );
  }
}
