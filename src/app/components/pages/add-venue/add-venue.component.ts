import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { VenueInfoFormComponent } from '../../forms/venue-info-form/venue-info-form.component';

@Component({
  selector: 'app-add-venue',
  standalone: true,
  imports: [VenueInfoFormComponent],
  templateUrl: './add-venue.component.html',
  styleUrl: './add-venue.component.css'
})
export class AddVenueComponent implements OnInit {
  constructor(private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.authStateService.onHeartbeat();
  }
}
