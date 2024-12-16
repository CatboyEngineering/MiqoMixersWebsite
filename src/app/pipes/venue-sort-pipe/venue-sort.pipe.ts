import { Pipe, PipeTransform } from '@angular/core';
import { VenueHoursStatus } from '../../models/enum/venue-hours-status.enum';
import { Venue } from '../../models/venue.interface';

@Pipe({
  name: 'venueSort',
  standalone: true
})
export class VenueSortPipe implements PipeTransform {
  readonly order = [VenueHoursStatus.OPENING_SOON, VenueHoursStatus.OPEN, VenueHoursStatus.CLOSING_SOON, VenueHoursStatus.CLOSED];

  transform(venues: Venue[] | undefined): Venue[] | undefined {
    return venues?.sort((a: Venue, b: Venue) => this.order.indexOf(a.venue.hoursStatus!) - this.order.indexOf(b.venue.hoursStatus!));
  }
}
