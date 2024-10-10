import { Routes } from '@angular/router';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { VerifyCharacterSuccessComponent } from './components/pages/verify-character-success/verify-character-success.component';
import { VerifyCharacterComponent } from './components/pages/verify-character/verify-character.component';
import { canActivateAuthenticated } from './guards/auth-guard/can-activate-authenticated';
import { canActivateCharacterUnverified } from './guards/unverified-guard/can-activate-character-unverified';
import { canActivateCharacterVerified } from './guards/verified-guard/can-activate-character-verified';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-character',
    component: VerifyCharacterComponent,
    canActivate: [canActivateAuthenticated(), canActivateCharacterUnverified()]
  },
  {
    path: 'verify-character-success',
    component: VerifyCharacterSuccessComponent,
    canActivate: [canActivateAuthenticated(), canActivateCharacterVerified()]
  },
  {
    path: 'privacy-policy',
    component: PrivacyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
