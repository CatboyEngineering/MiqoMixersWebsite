import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
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
}
