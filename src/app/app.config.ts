import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MetaReducer, provideStore } from '@ngrx/store';
import { localstorageMetaReducer } from './store/localstorage-meta.reducer';
import { rootReducer } from './store/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthStateEffects } from './store/auth-state/auth-state.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppDetailsStateEffects } from './store/app-details-state/app-details-state.effects';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service, RecaptchaLoaderService, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment.dev';

export const metaReducers: MetaReducer[] = [localstorageMetaReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(rootReducer, { metaReducers: metaReducers }),
    provideEffects([AuthStateEffects, AppDetailsStateEffects]),
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
