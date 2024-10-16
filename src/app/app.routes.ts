import { Routes } from '@angular/router';
import { AccountComponent } from './components/pages/account/account.component';
import { AddVenueComponent } from './components/pages/add-venue/add-venue.component';
import { AdminComponent } from './components/pages/admin/admin.component';
import { ContentGuidelinesComponent } from './components/pages/content-guidelines/content-guidelines.component';
import { EditVenueComponent } from './components/pages/edit-venue/edit-venue.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MyVenuesComponent } from './components/pages/my-venues/my-venues.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { VerifyCharacterSuccessComponent } from './components/pages/verify-character-success/verify-character-success.component';
import { VerifyCharacterComponent } from './components/pages/verify-character/verify-character.component';
import { canActivateIsAdmin } from './guards/admin-guard/can-activate-admin';
import { canActivateAuthenticated } from './guards/auth-guard/can-activate-authenticated';
import { canActivateEditVenue } from './guards/can-activate-edit-venue-guard/can-activate-edit-venue';
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
    path: 'add-venue',
    component: AddVenueComponent,
    canActivate: [canActivateAuthenticated()]
  },
  {
    path: 'edit-venue',
    component: EditVenueComponent,
    canActivate: [canActivateAuthenticated(), canActivateEditVenue]
  },
  {
    path: 'my-venues',
    component: MyVenuesComponent,
    canActivate: [canActivateAuthenticated()]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [canActivateAuthenticated(), canActivateIsAdmin()]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [canActivateAuthenticated()]
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
    path: 'content-guidelines',
    component: ContentGuidelinesComponent
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
