import { Component, Input } from '@angular/core';
import { Venue } from '../../../models/venue.interface';

@Component({
  selector: 'app-add-venue-form',
  standalone: true,
  imports: [],
  templateUrl: './add-venue-form.component.html',
  styleUrl: './add-venue-form.component.css'
})
export class AddVenueFormComponent {
  @Input() venue: Venue;
}
