import { Pipe, PipeTransform } from '@angular/core';
import { CombinedVenue } from '../../models/combined-venue.interface';
import { VenueHoursStatus } from '../../models/enum/venue-hours-status.enum';

@Pipe({
  name: 'venueSort',
  standalone: true
})
export class VenueSortPipe implements PipeTransform {
  readonly order = [VenueHoursStatus.OPENING_SOON, VenueHoursStatus.OPEN, VenueHoursStatus.CLOSING_SOON, VenueHoursStatus.CLOSED];

  transform(venues: CombinedVenue[] | undefined): CombinedVenue[] | undefined {
    return venues?.sort((a: CombinedVenue, b: CombinedVenue) => this.order.indexOf(a.venue.hoursStatus!) - this.order.indexOf(b.venue.hoursStatus!));
  }
}
