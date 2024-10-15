import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  expanded = false;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean | undefined>;

  constructor(private authStateService: AuthStateService) {
    this.isLoggedIn$ = authStateService.authToken$.pipe(map(token => !!token));
    this.isAdmin$ = authStateService.isAdmin$;
  }

  logOut(): void {
    this.authStateService.onLogOut();
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}
