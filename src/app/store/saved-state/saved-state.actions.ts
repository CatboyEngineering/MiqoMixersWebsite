import { createAction, props } from '@ngrx/store';
import { CombinedVenue } from '../../models/combined-venue.interface';

export abstract class SavedStateActions {
  static readonly saveAttempt = createAction('@miqomixers/action/save/attempt', props<{ venue: CombinedVenue }>());
  static readonly saveSuccess = createAction('@miqomixers/action/save/success', props<{ venue: CombinedVenue }>());
  static readonly unsaveAttempt = createAction('@miqomixers/action/unsave/attempt', props<{ venue: CombinedVenue }>());
  static readonly unsaveSuccess = createAction('@miqomixers/action/unsave/success', props<{ venue: CombinedVenue }>());
  static readonly clearAttempt = createAction('@miqomixers/action/save/clear/attempt');
  static readonly clearSuccess = createAction('@miqomixers/action/save/clear/success');
}
