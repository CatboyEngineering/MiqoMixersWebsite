import { createAction, props } from '@ngrx/store';
import { VenueChangeRequest } from '../../models/API/request/venue-change-request.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { Venue } from '../../models/venue.interface';

export abstract class VenueStateActions {
  static readonly requestVenues = createAction('@miqomixers/action/venue/request');
  static readonly receiveVenues = createAction('@miqomixers/action/venue/received', props<{ venues: Venue[] }>());
  static readonly requestDeleteVenue = createAction('@miqomixers/action/venue/delete/request', props<{ venue: Venue }>());
  static readonly receiveDeleteVenue = createAction('@miqomixers/action/venue/delete/received', props<{ venue: Venue }>());
  static readonly requestAddVenue = createAction('@miqomixers/action/venue/add/request', props<{ request: VenueChangeRequest }>());
  static readonly receiveAddVenue = createAction('@miqomixers/action/venue/add/received');
  static readonly requestUpdateVenue = createAction(
    '@miqomixers/action/venue/update/request',
    props<{ request: VenueChangeRequest; venueID: string }>()
  );
  static readonly receiveUpdateVenue = createAction('@miqomixers/action/venue/update/received');
  static readonly clearVenues = createAction('@miqomixers/action/venue/clear');
  static readonly retrievalError = createAction('@miqomixers/action/venue/error', props<{ form: FormName; error: any }>());
}
