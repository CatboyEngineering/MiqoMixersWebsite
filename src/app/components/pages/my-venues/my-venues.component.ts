import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, withLatestFrom } from 'rxjs';
import { Venue } from '../../../models/venue.interface';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-my-venues',
  standalone: true,
  imports: [CommonModule, VenuePostComponent],
  templateUrl: './my-venues.component.html',
  styleUrl: './my-venues.component.css'
})
export class MyVenuesComponent {
  myVenues$: Observable<Venue[]>;

  constructor(private authStateService: AuthStateService, private venueStateService: VenueStateService) {
    this.myVenues$ = venueStateService.venues$.pipe(
      withLatestFrom(authStateService.accountID$, authStateService.isAdmin$),
      map(([venues, accountID, isAdmin]) => venues.filter(venue => isAdmin || venue.venue.userID === accountID))
    );
  }
}
