import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { LoadThrottlePipe } from '../../../pipes/load-throttle/load-throttle.pipe';
import { VenueFilterPipe } from '../../../pipes/venue-filter-pipe/venue-filter.pipe';
import { VenueSortPipe } from '../../../pipes/venue-sort-pipe/venue-sort.pipe';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VenueFilterPipe,
    VenueSortPipe,
    VenuePostComponent,
    UiFormErrorComponent,
    LoadThrottlePipe,
    PageHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  venues$: BehaviorSubject<CombinedVenue[]>;
  isLoading$: BehaviorSubject<boolean>;

  FormName = FormName;

  itemLoadStep = 7;
  itemsLoaded = this.itemLoadStep;
  tagFilter: string = '';

  constructor(private venueStateService: VenueStateService, private loadingService: LoadingService) {
    this.venues$ = venueStateService.venues$;
    this.isLoading$ = loadingService.isLoading$;
  }

  loadMore() {
    this.itemsLoaded += this.itemLoadStep;
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
