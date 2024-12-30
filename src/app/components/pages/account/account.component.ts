import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { ChangeCharacterFormComponent } from '../../forms/change-character-form/change-character-form.component';
import { ChangePasswordFormComponent } from '../../forms/change-password-form/change-password-form.component';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ChangeCharacterFormComponent, ChangePasswordFormComponent, RouterLink, PageHeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  characterName$: Observable<string>;
  isVerified$: Observable<boolean>;
  accountID$: Observable<string>;

  isDeleting: boolean;

  constructor(private authStateService: AuthStateService) {
    this.characterName$ = authStateService.characterName$;
    this.isVerified$ = authStateService.isCharacterVerified$;
    this.accountID$ = authStateService.accountID$;
  }

  setIsDeleting() {
    this.isDeleting = true;
  }

  deleteAccount() {
    this.authStateService.onDeleteAccountRequest();
  }
}
