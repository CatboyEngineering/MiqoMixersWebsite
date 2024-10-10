import { createAction, props } from '@ngrx/store';
import { FormName } from '../../models/enum/form-name.enum';
import { Venue } from '../../models/venue.interface';

export abstract class VenueStateActions {
  static readonly requestVenues = createAction('@miqomixers/action/venue/request');
  static readonly receiveVenues = createAction('@miqomixers/action/venue/received', props<{ venues: Venue[] }>());
  static readonly clearVenues = createAction('@miqomixers/action/venue/clear');
  static readonly retrievalError = createAction('@miqomixers/action/venue/error', props<{ form: FormName; error: any }>());
}
