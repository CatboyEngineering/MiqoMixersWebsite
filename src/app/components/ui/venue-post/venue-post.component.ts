import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Venue } from '../../../models/venue.interface';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { ChipComponent } from '../chip/chip.component';

@Component({
  selector: 'app-venue-post',
  standalone: true,
  imports: [CommonModule, ChipComponent, TimePipe, RouterLink],
  templateUrl: './venue-post.component.html',
  styleUrl: './venue-post.component.css'
})
export class VenuePostComponent {
  @Input() venue: Venue;
  @Input() isEditing: boolean = false;

  expanded: boolean = false;
  isDeleting: boolean = false;

  constructor(private venueStateService: VenueStateService) {}

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  toggleDelete() {
    this.isDeleting = !this.isDeleting;
  }

  delete() {
    if (this.isDeleting) {
      this.venueStateService.onDeleteVenue(this.venue);
    } else {
      this.isDeleting = true;
    }
  }
}
