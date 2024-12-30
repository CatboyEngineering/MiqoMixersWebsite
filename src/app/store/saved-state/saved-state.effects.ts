import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { SavedStateActions } from './saved-state.actions';
import { SavedStateService } from './saved-state.service';

@Injectable()
export class SavedStateEffects {
  constructor(private actions$: Actions, private savedStateService: SavedStateService) {}

  saveVenueAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedStateActions.saveAttempt),
      map(action => SavedStateActions.saveSuccess(action))
    )
  );

  unsaveVenueAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedStateActions.unsaveAttempt),
      map(action => SavedStateActions.unsaveSuccess(action))
    )
  );

  clearVenuesAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavedStateActions.clearAttempt),
      map(action => SavedStateActions.clearSuccess())
    )
  );

  // For success, maybe show a notification
}
