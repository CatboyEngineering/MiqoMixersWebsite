import { createAction, props } from '@ngrx/store';
import { AdminAccountListResponse } from '../../models/API/response/admin-account-list-response.interface';
import { FormName } from '../../models/enum/form-name.enum';

export abstract class AdminStateActions {
  static readonly requestAccounts = createAction('@miqomixers/action/admin/account/request');
  static readonly receiveAccounts = createAction('@miqomixers/action/admin/account/received', props<{ accounts: AdminAccountListResponse[] }>());
  static readonly requestAccountStatusToggle = createAction('@miqomixers/action/admin/account/toggle/request', props<{ accountID: string }>());
  static readonly receiveAccountStatusToggle = createAction(
    '@miqomixers/action/admin/account/toggle/received',
    props<{ account: AdminAccountListResponse }>()
  );
  static readonly retrievalError = createAction('@miqomixers/action/admin/error', props<{ form: FormName; error: any }>());
}
