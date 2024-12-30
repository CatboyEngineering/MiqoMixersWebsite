import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable, of, withLatestFrom } from 'rxjs';
import { AdminAccountListResponse } from '../../../models/API/response/admin-account-list-response.interface';
import { CombinedVenue } from '../../../models/combined-venue.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { Report } from '../../../models/report.interface';
import { TimePipe } from '../../../pipes/time-pipe/time.pipe';
import { AdminStateService } from '../../../store/admin-state/admin-state.service';
import { VenueStateService } from '../../../store/venue-state/venue-state.service';
import { ReassignVenueFormComponent } from '../../forms/reassign-venue-form/reassign-venue-form.component';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, UiFormErrorComponent, ReassignVenueFormComponent, TimePipe, RouterLink, PageHeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  accounts$: Observable<AdminAccountListResponse[]>;
  reports$: Observable<Report[]>;
  reporterNames$: Observable<
    {
      accountID: string;
      name: string;
    }[]
  >;

  FormName = FormName;

  constructor(private adminStateService: AdminStateService, private venueStateService: VenueStateService) {
    this.accounts$ = adminStateService.accounts$;
    this.reports$ = adminStateService.reports$;
    this.reporterNames$ = this.reports$.pipe(
      withLatestFrom(this.accounts$),
      map(([reports, accounts]) => {
        var mappings: {
          accountID: string;
          name: string;
        }[] = [];

        reports.forEach(report => {
          if (report.reporterID) {
            mappings.push({
              accountID: report.reporterID,
              name: accounts.find(a => a.accountID === report.reporterID)?.characterName || 'Unknown: ' + report.reporterID.substring(0, 10)
            });
          }
        });

        return mappings;
      })
    );
  }

  ngOnInit(): void {
    this.adminStateService.onGetAccounts();
    this.adminStateService.onGetReports();
  }

  getReporterName$(accountID: string | undefined): Observable<string> {
    if (!accountID) {
      return of('Guest');
    }

    return this.reporterNames$.pipe(
      map(rn => {
        var filtered = rn.filter(r => r.accountID === accountID);

        if (filtered.length == 1) {
          return filtered[0].name;
        }

        return 'Unknown';
      })
    );
  }

  getVenueDetails$(venueID: string): Observable<CombinedVenue | undefined> {
    return this.venueStateService.venues$.pipe(map(venues => venues.find(v => v.venue.venueID === venueID)));
  }

  toggleUserStatus(accountID: string): void {
    this.adminStateService.onToggleAccountStatus(accountID);
  }

  deleteReport(reportID: string) {
    this.adminStateService.onDeleteReport(reportID);
  }
}
