import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormName } from '../../../models/enum/form-name.enum';
import { VenueHoursStatus } from '../../../models/enum/venue-hours-status.enum';
import { Venue } from '../../../models/venue.interface';
import { ChipSortPipe } from '../../../pipes/chip-sort-pipe/chip-sort.pipe';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { TimeService } from '../../../services/time-service/time.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { ChipComponent } from '../chip/chip.component';
import { UiFormErrorComponent } from '../ui-form-error/ui-form-error.component';

@Component({
  selector: 'app-venue-post',
  standalone: true,
  imports: [CommonModule, ChipComponent, TimePipe, ChipSortPipe, RouterLink, UiFormErrorComponent],
  templateUrl: './venue-post.component.html',
  styleUrl: './venue-post.component.css'
})
export class VenuePostComponent implements OnInit {
  @Input() venue: Venue;
  @Input() isEditing: boolean = false;
  @Input() expanded: boolean = false;

  venueHoursStatus: VenueHoursStatus;
  borderColor: string;

  isDeleting: boolean = false;
  FormName = FormName;
  VenueHoursStatus = VenueHoursStatus;

  constructor(private venueStateService: VenueStateService, private timeService: TimeService) {}

  ngOnInit(): void {
    this.venueHoursStatus = this.venue.venue.hoursStatus!;
    this.setBorderColor();
  }

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

  private setBorderColor() {
    switch (this.venueHoursStatus) {
      case VenueHoursStatus.CLOSED:
        this.borderColor = 'border: 1px solid #aaa;';
        break;
      case VenueHoursStatus.OPENING_SOON:
        this.borderColor = 'border: 1px solid #257180;';
        break;
      case VenueHoursStatus.OPEN:
        this.borderColor = 'border: 1px solid #0aad4b;';
        break;
      case VenueHoursStatus.CLOSING_SOON:
        this.borderColor = 'border: 1px solid #CB6040;';
        break;
    }
  }
}
