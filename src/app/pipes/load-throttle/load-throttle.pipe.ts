import { Pipe, PipeTransform } from '@angular/core';
import { CombinedVenue } from '../../models/combined-venue.interface';

@Pipe({
  name: 'loadThrottle',
  standalone: true
})
export class LoadThrottlePipe implements PipeTransform {
  transform(venues: CombinedVenue[] | undefined, take: number): CombinedVenue[] | undefined {
    return venues?.slice(0, take);
  }
}
