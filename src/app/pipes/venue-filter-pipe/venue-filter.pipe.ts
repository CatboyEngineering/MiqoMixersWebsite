import { Pipe, PipeTransform } from '@angular/core';
import { CombinedVenue } from '../../models/combined-venue.interface';

@Pipe({
  name: 'venueFilter',
  standalone: true
})
export class VenueFilterPipe implements PipeTransform {
  transform(venues: CombinedVenue[] | null, tags: string[]): CombinedVenue[] | undefined {
    if (venues && tags.length == 0) {
      return venues;
    }

    return venues?.filter(v =>
      tags.find(tag =>
        v.venue.tags.find(vt => {
          var exact = RegExp('^".+"$').test(tag);
          var testPattern = exact ? '^' + tag.replaceAll('"', '') + '$' : tag;

          return RegExp(testPattern, 'gi').test(vt.toLowerCase());
        })
      )
    );
  }
}
