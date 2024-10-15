import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminAccountListResponse } from '../../../models/API/response/admin-account-list-response.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { AdminStateService } from '../../../store/admin-state/admin-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, UiFormErrorComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  accounts$: Observable<AdminAccountListResponse[]>;

  FormName = FormName;

  constructor(private adminStateService: AdminStateService) {
    this.accounts$ = adminStateService.accounts$;
  }

  ngOnInit(): void {
    this.adminStateService.onGetAccounts();
  }

  toggleUserStatus(accountID: string): void {
    this.adminStateService.onToggleAccountStatus(accountID);
  }
}
