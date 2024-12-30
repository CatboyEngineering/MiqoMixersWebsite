import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { CombinedVenue } from '../../models/combined-venue.interface';
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
    private formErrorService: FormErrorService,
    private router: Router
  ) {}

  venuesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.requestVenues),
      mergeMap(action =>
        this.httpService.GET<CombinedVenue[]>('venue', undefined).pipe(
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
          this.venueStateService.setCurrentTime();
          var newVenues: CombinedVenue[] = [];

          action.venues.forEach(v =>
            newVenues.push({
              ...v,
              venue: {
                ...v.venue,
                hoursStatus: this.venueStateService.calculateVenueHoursStatus(v)
              }
            })
          );

          this.venueStateService.venues$.next(newVenues);
        })
      ),
    { dispatch: false }
  );

  venueDeleteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.requestDeleteVenue),
      mergeMap(action =>
        this.httpService.DELETE<any>('venue/' + action.venue.venue.venueID, undefined).pipe(
          map(response => {
            return VenueStateActions.receiveDeleteVenue({ venue: action.venue });
          }),
          catchError(error => {
            return of(VenueStateActions.retrievalError({ form: FormName.DELETE_VENUE, error: error }));
          })
        )
      )
    )
  );

  venueDeleteReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.receiveDeleteVenue),
      map(() => VenueStateActions.requestVenues())
    )
  );

  venueAddRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.requestAddVenue),
      mergeMap(action =>
        this.httpService.PUT<any>('venue', action.request, undefined).pipe(
          map(response => {
            return VenueStateActions.receiveAddVenue();
          }),
          catchError(error => {
            return of(VenueStateActions.retrievalError({ form: FormName.UPSERT_VENUE, error: error }));
          })
        )
      )
    )
  );

  venueAddReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.receiveAddVenue),
      tap(() => this.router.navigate(['/my-venues'])),
      map(() => VenueStateActions.requestVenues())
    )
  );

  venueStarRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.requestStarVenue),
      mergeMap(action =>
        this.httpService.POST<Venue>('venue/star/' + action.venueID, undefined, 'POST_STAR').pipe(
          map(response => {
            return VenueStateActions.receiveStarVenue({ venue: response.body! });
          }),
          catchError(error => {
            return of(VenueStateActions.retrievalError({ form: FormName.UPSERT_VENUE, error: error }));
          })
        )
      )
    )
  );

  venueStarReceived$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(VenueStateActions.receiveStarVenue),
        withLatestFrom(this.venueStateService.venues$),
        tap(([action, venues]) => {
          var newVenues: CombinedVenue[] = [];

          venues.forEach(v => {
            if (v.venue.venueID === action.venue.venueID) {
              newVenues.push({ ...v, venue: action.venue });
            } else {
              newVenues.push(v);
            }
          });

          this.venueStateService.venues$.next(newVenues);
        })
      ),
    { dispatch: false }
  );

  venueUpdateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.requestUpdateVenue),
      mergeMap(action =>
        this.httpService.PATCH<any>('venue/' + action.venueID, action.request, undefined).pipe(
          map(response => {
            return VenueStateActions.receiveUpdateVenue();
          }),
          catchError(error => {
            return of(VenueStateActions.retrievalError({ form: FormName.UPSERT_VENUE, error: error }));
          })
        )
      )
    )
  );

  venueUpdateReceived$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VenueStateActions.receiveUpdateVenue),
      tap(() => this.router.navigate(['/my-venues'])),
      map(() => VenueStateActions.requestVenues())
    )
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
