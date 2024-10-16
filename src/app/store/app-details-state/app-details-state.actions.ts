import { createAction, props } from '@ngrx/store';
import { ReportVenueRequest } from '../../models/API/request/report-venue-request.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { FormValidationError } from '../../models/form-validation-error.interface';

export abstract class AppDetailsStateActions {
  static readonly serverError = createAction('@miqomixers/action/error/server', props<{ error: any }>());
  static readonly formError = createAction('@miqomixers/action/error/form', props<{ error: FormValidationError }>());
  static readonly formErrorsCleared = createAction('@miqomixers/action/error/form/clear');
  static readonly requestReport = createAction('@miqomixers/action/report/request', props<{ request: ReportVenueRequest }>());
  static readonly receiveReport = createAction('@miqomixers/action/report/received');
  static readonly clearFullState = createAction('@miqomixers/action/state/cleared');
  static readonly retrievalError = createAction('@miqomixers/action/app/error', props<{ form: FormName; error: any }>());
}
