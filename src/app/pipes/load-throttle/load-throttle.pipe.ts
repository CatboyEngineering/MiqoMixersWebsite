import { Pipe, PipeTransform } from '@angular/core';
import { Venue } from '../../models/venue.interface';

@Pipe({
  name: 'loadThrottle',
  standalone: true
})
export class LoadThrottlePipe implements PipeTransform {
  transform(venues: Venue[] | undefined, take: number): Venue[] | undefined {
    return venues?.slice(0, take);
  }
}
