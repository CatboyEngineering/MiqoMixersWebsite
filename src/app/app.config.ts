import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaLoaderService } from 'ng-recaptcha';
import { environment } from '../environments/environment.dev';
import { routes } from './app.routes';
import { AdminStateEffects } from './store/admin-state/admin-state.effects';
import { AppDetailsStateEffects } from './store/app-details-state/app-details-state.effects';
import { AuthStateEffects } from './store/auth-state/auth-state.effects';
import { localstorageMetaReducer } from './store/localstorage-meta.reducer';
import { SavedStateEffects } from './store/saved-state/saved-state.effects';
import { rootReducer } from './store/store';
import { VenueStateEffects } from './store/venue-state/venue-state.effects';

export const metaReducers: MetaReducer[] = [localstorageMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    ),
    provideStore(rootReducer, { metaReducers: metaReducers }),
    provideEffects([AuthStateEffects, AppDetailsStateEffects, VenueStateEffects, AdminStateEffects, SavedStateEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !environment.production }),
    provideHttpClient(withFetch()),
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfJH6kpAAAAAB5TGSlE098R0HU5E32cbrjsa8f0'
    },
    ReCaptchaV3Service,
    RecaptchaLoaderService
  ]
};
