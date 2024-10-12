import { Component } from '@angular/core';
import { VenueInfoFormComponent } from '../../forms/venue-info-form/venue-info-form.component';

@Component({
  selector: 'app-add-venue',
  standalone: true,
  imports: [VenueInfoFormComponent],
  templateUrl: './add-venue.component.html',
  styleUrl: './add-venue.component.css'
})
export class AddVenueComponent {}
