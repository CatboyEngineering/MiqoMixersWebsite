import { createAction, props } from '@ngrx/store';
import { FormValidationError } from '../../models/form-validation-error.interface';

export abstract class AppDetailsStateActions {
  static readonly serverError = createAction('@miqomixers/action/error/server', props<{ error: any }>());
  static readonly formError = createAction('@miqomixers/action/error/form', props<{ error: FormValidationError }>());
  static readonly formErrorsCleared = createAction('@miqomixers/action/error/form/clear');
  static readonly clearFullState = createAction('@miqomixers/action/state/cleared');
}
