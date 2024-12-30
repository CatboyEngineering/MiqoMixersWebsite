import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';

@Component({
  selector: 'app-verify-character',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent],
  templateUrl: './verify-character.component.html',
  styleUrl: './verify-character.component.css'
})
export class VerifyCharacterComponent {
  characterName$: Observable<string>;
  characterServer$: Observable<string>;
  verificationCode$: Observable<string | undefined>;
  characterID$: Observable<string>;

  isLoading$: BehaviorSubject<boolean>;

  constructor(private authStateService: AuthStateService, private loadingService: LoadingService) {
    this.characterName$ = authStateService.characterName$;
    this.characterServer$ = authStateService.characterServer$;
    this.verificationCode$ = authStateService.characterVerificationCode$;
    this.characterID$ = authStateService.characterID$;

    this.isLoading$ = loadingService.isLoading$;
  }

  onSubmit() {
    this.authStateService.onVerifyCharacterRequest();
  }
}
