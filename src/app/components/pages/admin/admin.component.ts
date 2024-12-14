import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAccountListResponse } from '../../../models/API/response/admin-account-list-response.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { Report } from '../../../models/report.interface';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { AdminStateService } from '../../../store/admin-state/admin-state.service';
import { ReassignVenueFormComponent } from '../../forms/reassign-venue-form/reassign-venue-form.component';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, UiFormErrorComponent, ReassignVenueFormComponent, TimePipe, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  accounts$: Observable<AdminAccountListResponse[]>;
  reports$: Observable<Report[]>;

  FormName = FormName;

  constructor(private adminStateService: AdminStateService) {
    this.accounts$ = adminStateService.accounts$;
    this.reports$ = adminStateService.reports$;
  }

  ngOnInit(): void {
    this.adminStateService.onGetAccounts();
    this.adminStateService.onGetReports();
  }

  toggleUserStatus(accountID: string): void {
    this.adminStateService.onToggleAccountStatus(accountID);
  }

  deleteReport(reportID: string) {
    this.adminStateService.onDeleteReport(reportID);
  }
}
