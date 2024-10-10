import { createAction, props } from '@ngrx/store';
import { AccountCreateRequest } from '../../models/API/request/account-create-request.interface';
import { AccountLoginRequest } from '../../models/API/request/account-login-request.interface';
import { NameChangeRequest } from '../../models/API/request/name-change-request.interface';
import { AccountAuthenticatedResponse } from '../../models/API/response/account-authenticated-response.interface';
import { CharacterVerifiedResponse } from '../../models/API/response/character-verified-response.interface';
import { NameChangeResponse } from '../../models/API/response/name-change-response.interface';
import { FormName } from '../../models/enum/form-name.enum';

export abstract class AuthStateActions {
  static readonly registerAttempt = createAction('@miqomixers/action/register/attempt', props<{ request: AccountCreateRequest }>());
  static readonly registerSuccess = createAction('@miqomixers/action/register/success', props<{ response: AccountAuthenticatedResponse }>());
  static readonly loginAttempt = createAction('@miqomixers/action/login/attempt', props<{ request: AccountLoginRequest }>());
  static readonly loginSuccess = createAction('@miqomixers/action/login/success', props<{ response: AccountAuthenticatedResponse }>());
  static readonly authFailure = createAction('@miqomixers/action/authentication/failure', props<{ form: FormName; error: any }>());
  static readonly authExpired = createAction('@miqomixers/action/authentication/expired');
  static readonly verifyAttempt = createAction('@miqomixers/action/verify/attempt');
  static readonly verifySuccess = createAction('@miqomixers/action/verify/success', props<{ response: CharacterVerifiedResponse }>());
  static readonly verifyFailure = createAction('@miqomixers/action/verify/failure', props<{ form: FormName; error: any }>());
  static readonly nameChangeAttempt = createAction('@miqomixers/action/namechange/attempt', props<{ request: NameChangeRequest }>());
  static readonly nameChangeSuccess = createAction('@miqomixers/action/namechange/success', props<{ response: NameChangeResponse }>());
  static readonly logOutAttempt = createAction('@miqomixers/action/logout/attempt');
  static readonly logOutSuccess = createAction('@miqomixers/action/logout/success');
  static readonly deleteAttempt = createAction('@miqomixers/action/delete/attempt');
  static readonly deleteSuccess = createAction('@miqomixers/action/delete/success');
  static readonly authDataCleared = createAction('@miqomixers/action/authentication/cleared');
}
