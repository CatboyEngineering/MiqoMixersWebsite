import { Injectable } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  createCaptchaToken$(action?: string): Observable<string> {
    if (environment.production) {
      if (action) {
        return this.recaptchaV3Service.execute(action);
      }
    }

    return of('token');
  }
}
