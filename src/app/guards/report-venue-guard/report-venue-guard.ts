import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { VenueStateService } from '../../store/venue-state/venue-state.service';

export const canActivateReportVenue: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const venueStateService = inject(VenueStateService);
  const router = inject(Router);

  return venueStateService.venues$.pipe(
    filter(venues => venues.length > 0),
    map(venues => {
      if (!next.queryParamMap.has('id')) {
        router.navigate(['/']);
        return false;
      }

      return !!venues.find(v => v.venue.venueID === next.queryParamMap.get('id'));
    })
  );
};
