import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { map, Observable, withLatestFrom } from 'rxjs';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { VenueHoursStatus } from '../../../models/enum/venue-hours-status.enum';
import { ChipSortPipe } from '../../../pipes/chip-sort-pipe/chip-sort.pipe';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { SavedStateService } from '../../../store/saved-state/saved-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { ChipComponent } from '../chip/chip.component';
import { CopyButtonComponent } from '../copy-button/copy-button.component';
import { UiFormErrorComponent } from '../ui-form-error/ui-form-error.component';

@Component({
  selector: 'app-venue-post',
  standalone: true,
  imports: [CommonModule, ChipComponent, TimePipe, ChipSortPipe, RouterLink, UiFormErrorComponent, ClipboardModule, CopyButtonComponent],
  templateUrl: './venue-post.component.html',
  styleUrl: './venue-post.component.css'
})
export class VenuePostComponent implements OnInit {
  @Input() venue: CombinedVenue;
  @Input() expanded: boolean = false;

  isLoggedIn$: Observable<boolean>;
  isSaved$: Observable<boolean>;
  canEdit$: Observable<boolean>;

  venueHoursStatus: VenueHoursStatus;
  borderColor: string;

  isDeleting: boolean = false;
  showCommTooltip: boolean = false;
  FormName = FormName;
  VenueHoursStatus = VenueHoursStatus;

  constructor(
    private venueStateService: VenueStateService,
    private authStateService: AuthStateService,
    private savedStateService: SavedStateService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authStateService.authToken$.pipe(
      withLatestFrom(this.authStateService.isCharacterVerified$),
      map(([token, isVerified]) => !!token && !!isVerified)
    );

    this.canEdit$ = this.authStateService.accountID$.pipe(
      withLatestFrom(this.authStateService.isAdmin$),
      map(([accountID, isAdmin]) => {
        return isAdmin || this.venue.venue.userID === accountID;
      })
    );

    this.isSaved$ = this.savedStateService.savedVenues$.pipe(map(saved => !!saved.find(v => v === this.venue.venue.venueID)));

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

  toggleTooltip(show: boolean) {
    this.showCommTooltip = show;
  }

  star() {
    this.venueStateService.onStarVenue(this.venue.venue.venueID);
  }

  save() {
    this.savedStateService.onSaveVenue(this.venue);
  }

  unsave() {
    this.savedStateService.onUnsaveVenue(this.venue);
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
