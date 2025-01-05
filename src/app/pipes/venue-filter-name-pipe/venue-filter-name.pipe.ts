import { Pipe, PipeTransform } from '@angular/core';
import { CombinedVenue } from '../../models/combined-venue.interface';

@Pipe({
  name: 'venueFilterName',
  standalone: true
})
export class VenueFilterNamePipe implements PipeTransform {
  transform(venues: CombinedVenue[] | undefined, name: string): CombinedVenue[] | undefined {
    if (!name || name === '') {
      return venues;
    }

    return venues?.filter(v => {
      return RegExp(name, 'gi').test(v.venue.venueName);
    });
  }
}
