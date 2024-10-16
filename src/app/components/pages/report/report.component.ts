import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, Observable, withLatestFrom } from 'rxjs';
import { Venue } from '../../../models/venue.interface';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { ReportVenueFormComponent } from '../../forms/report-venue-form/report-venue-form.component';
import { VenuePostComponent } from '../../ui/venue-post/venue-post.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ReportVenueFormComponent, CommonModule, VenuePostComponent, RouterLink],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  venue$: Observable<Venue | undefined>;

  constructor(private route: ActivatedRoute, private venueStateService: VenueStateService) {}

  ngOnInit(): void {
    this.venue$ = this.route.queryParamMap.pipe(
      filter(params => !!params.get('id')),
      withLatestFrom(this.venueStateService.venues$),
      map(([params, venues]) => {
        return venues.find(v => v.venue.venueID === params.get('id'));
      })
    );
  }
}
