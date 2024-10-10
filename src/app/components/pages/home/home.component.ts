import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Venue } from '../../../models/venue.interface';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, VenuePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  venues$: BehaviorSubject<Venue[]>;

  constructor(private venueStateService: VenueStateService) {
    this.venues$ = venueStateService.venues$;
  }
}
