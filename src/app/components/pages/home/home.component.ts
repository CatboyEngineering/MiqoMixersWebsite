import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormName } from '../../../models/enum/form-name.enum';
import { Venue } from '../../../models/venue.interface';
import { VenueFilterPipe } from '../../../pipes/venue-filter-pipe/venue-filter.pipe';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, VenueFilterPipe, VenuePostComponent, UiFormErrorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  venues$: BehaviorSubject<Venue[]>;
  isLoading$: BehaviorSubject<boolean>;

  FormName = FormName;

  tagFilter: string = '';

  constructor(private venueStateService: VenueStateService, private loadingService: LoadingService) {
    this.venues$ = venueStateService.venues$;
    this.isLoading$ = loadingService.isLoading$;
  }

  split(value: string): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(/,/)
      .map(tag => tag.trim())
      .filter(tag => tag != '');
  }
}
