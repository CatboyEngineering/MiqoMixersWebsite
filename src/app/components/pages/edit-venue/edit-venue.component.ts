import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, withLatestFrom } from 'rxjs';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { VenueInfoFormComponent } from '../../forms/venue-info-form/venue-info-form.component';

@Component({
  selector: 'app-edit-venue',
  standalone: true,
  imports: [VenueInfoFormComponent, CommonModule],
  templateUrl: './edit-venue.component.html',
  styleUrl: './edit-venue.component.css'
})
export class EditVenueComponent implements OnInit {
  venue$: Observable<CombinedVenue | undefined>;

  constructor(private route: ActivatedRoute, private authStateService: AuthStateService, private venueStateService: VenueStateService) {}

  ngOnInit(): void {
    this.venue$ = this.route.queryParamMap.pipe(
      filter(params => !!params.get('id')),
      withLatestFrom(this.venueStateService.venues$, this.authStateService.accountID$, this.authStateService.isAdmin$),
      map(([params, venues, accountID, isAdmin]) => {
        return venues.find(v => v.venue.venueID === params.get('id') && (isAdmin || v.venue.userID === accountID));
      })
    );
  }
}
