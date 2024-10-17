import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormName } from '../../../models/enum/form-name.enum';
import { Venue } from '../../../models/venue.interface';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, VenuePostComponent, UiFormErrorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  venues$: BehaviorSubject<Venue[]>;
  isLoading$: BehaviorSubject<boolean>;

  FormName = FormName;

  constructor(private venueStateService: VenueStateService, private loadingService: LoadingService) {
    this.venues$ = venueStateService.venues$;
    this.isLoading$ = loadingService.isLoading$;
  }
}
