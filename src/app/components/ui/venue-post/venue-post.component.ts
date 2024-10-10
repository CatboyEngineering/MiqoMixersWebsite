import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Venue } from '../../../models/venue.interface';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { ChipComponent } from '../chip/chip.component';

@Component({
  selector: 'app-venue-post',
  standalone: true,
  imports: [CommonModule, ChipComponent, TimePipe],
  templateUrl: './venue-post.component.html',
  styleUrl: './venue-post.component.css'
})
export class VenuePostComponent {
  @Input() venue: Venue;

  expanded: boolean = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
