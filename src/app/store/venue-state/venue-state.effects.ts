import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { FormName } from '../../models/enum/form-name.enum';
import { Venue } from '../../models/venue.interface';
import { FormErrorService } from '../../services/form-error-service/form-error.service';
import { HTTPService } from '../../services/http-service/http.service';
import { AppDetailsStateActions } from '../app-details-state/app-details-state.actions';
import { VenueStateActions } from './venue-state.actions';
import { VenueStateService } from './venue-state.service';

@Injectable()
export class VenueStateEffects {
  constructor(
    private actions$: Actions,
    private venueStateService: VenueStateService,
    private httpService: HTTPService,
    private formErrorService: FormErrorService
  ) {}

  venuesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.requestVenues),
      mergeMap(action =>
        this.httpService.GET<Venue[]>('venue', 'GET_VENUES').pipe(
          map(response => {
            return VenueStateActions.receiveVenues({ venues: response.body! });
          }),
          catchError(error => {
            return of(VenueStateActions.retrievalError({ form: FormName.VENUE_LIST, error: error }));
          })
        )
      )
    )
  );

  venuesReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VenueStateActions.receiveVenues),
        tap(action => {
          this.venueStateService.venues$.next(action.venues);
        })
      ),
    { dispatch: false }
  );

  stateCleared$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VenueStateActions.clearVenues),
        tap(() => this.venueStateService.venues$.next([]))
      ),
    { dispatch: false }
  );

  retrievalFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.retrievalError),
      map(payload => AppDetailsStateActions.formError({ error: this.formErrorService.mapFormAPIError(payload.form, payload.error) }))
    )
  );
}
