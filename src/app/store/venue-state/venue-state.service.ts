import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import moment from 'moment-timezone';
import { BehaviorSubject } from 'rxjs';
import { VenueChangeRequest } from '../../models/API/request/venue-change-request.interface';
import { VenueHoursStatus } from '../../models/enum/venue-hours-status.enum';
import { Venue } from '../../models/venue.interface';
import { TimeService } from '../../services/time-service/time.service';
import { VenueStateActions } from './venue-state.actions';

@Injectable({
  providedIn: 'root'
})
export class VenueStateService {
  venues$: BehaviorSubject<Venue[]>;

  dayOfWeek: string;
  now: moment.Moment;

  constructor(private store: Store, private timeService: TimeService) {
    this.venues$ = new BehaviorSubject<Venue[]>([]);
    this.dayOfWeek = this.timeService.getDayOfWeek();
  }

  onGetVenues(): void {
    this.store.dispatch(VenueStateActions.requestVenues());
  }

  onAddVenue(request: VenueChangeRequest): void {
    this.store.dispatch(VenueStateActions.requestAddVenue({ request }));
  }

  onUpdateVenue(request: VenueChangeRequest, venueID: string): void {
    this.store.dispatch(VenueStateActions.requestUpdateVenue({ request, venueID }));
  }

  onDeleteVenue(venue: Venue): void {
    this.store.dispatch(VenueStateActions.requestDeleteVenue({ venue }));
  }

  onClearVenues() {
    this.store.dispatch(VenueStateActions.clearVenues());
  }

  setCurrentTime() {
    this.now = moment();
  }

  calculateVenueHoursStatus(venue: Venue): VenueHoursStatus {
    for (var i = 0; i < venue.venue.hours.length; i++) {
      let hours = venue.venue.hours[i];

      if (hours.day) {
        if (hours.day.toLowerCase() === this.dayOfWeek.toLowerCase()) {
          let timeOpenServer = this.timeService.convertUtcToLocal(hours.open!);
          let timeCloseServer = this.timeService.convertUtcToLocal(hours.close!);
          let timeOpen = moment(this.now).set('hour', timeOpenServer.hours()).set('minute', timeOpenServer.minutes()).set('seconds', 0);
          let timeClose = moment(this.now).set('hour', timeCloseServer.hours()).set('minute', timeCloseServer.minutes()).set('seconds', 0);

          if (timeClose.isBefore(timeOpen)) {
            timeClose = timeClose.add(1, 'days');
          }

          if (this.now.isAfter(timeOpen) && this.now.isBetween(moment(timeClose).subtract(1, 'hour'), timeClose)) {
            return VenueHoursStatus.CLOSING_SOON;
          } else if (this.now.isBetween(timeOpen, timeClose)) {
            return VenueHoursStatus.OPEN;
          } else if (this.now.isBefore(timeOpen) && this.now.isBetween(moment(timeOpen).subtract(1, 'hour'), timeOpen)) {
            return VenueHoursStatus.OPENING_SOON;
          } else {
            return VenueHoursStatus.CLOSED;
          }
        }
      }
    }

    return VenueHoursStatus.CLOSED;
  }
}
