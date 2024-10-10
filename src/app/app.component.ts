import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecaptchaV3Module } from 'ng-recaptcha';
import { NavComponent } from './components/ui/nav/nav.component';
import { VenueStateService } from './store/venue-state/venue-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecaptchaV3Module, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MiqoMixers';

  constructor(private venueStateService: VenueStateService) {}

  ngOnInit(): void {
    this.venueStateService.onGetVenues();
  }
}
