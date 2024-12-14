import { createAction, props } from '@ngrx/store';
import { ReassignVenueRequest } from '../../models/API/request/reassign-venue-request.interface';
import { AdminAccountListResponse } from '../../models/API/response/admin-account-list-response.interface';
import { FormName } from '../../models/enum/form-name.enum';
import { Report } from '../../models/report.interface';

export abstract class AdminStateActions {
  static readonly requestAccounts = createAction('@miqomixers/action/admin/account/request');
  static readonly receiveAccounts = createAction('@miqomixers/action/admin/account/received', props<{ accounts: AdminAccountListResponse[] }>());
  static readonly requestReports = createAction('@miqomixers/action/admin/reports/request');
  static readonly receiveReports = createAction('@miqomixers/action/admin/reports/received', props<{ reports: Report[] }>());
  static readonly requestDeleteReport = createAction('@miqomixers/action/admin/reports/delete/request', props<{ reportID: string }>());
  static readonly receiveDeleteReport = createAction('@miqomixers/action/admin/reports/delete/received');
  static readonly requestAccountStatusToggle = createAction('@miqomixers/action/admin/account/toggle/request', props<{ accountID: string }>());
  static readonly requestReassignVenue = createAction('@miqomixers/action/admin/reassign/request', props<{ request: ReassignVenueRequest }>());
  static readonly receiveReassignVenue = createAction('@miqomixers/action/admin/reassign/received');
  static readonly receiveAccountStatusToggle = createAction(
    '@miqomixers/action/admin/account/toggle/received',
    props<{ account: AdminAccountListResponse }>()
  );
  static readonly retrievalError = createAction('@miqomixers/action/admin/error', props<{ form: FormName; error: any }>());
}
