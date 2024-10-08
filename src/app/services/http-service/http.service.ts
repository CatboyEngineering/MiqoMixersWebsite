import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStateService } from '../../store/auth-state/auth-state.service';
import { Router } from '@angular/router';
import { Observable, catchError, combineLatest, filter, finalize, map, mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { CaptchaService } from '../captcha-service/captcha.service';
import { LoadingService } from '../loading-service/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {
  constructor(private http: HttpClient, private authStateService: AuthStateService, private captchaService: CaptchaService, private loadingService: LoadingService) {}

  GET<T>(url: string, action: string): Observable<HttpResponse<T>> {
    this.loadingService.beginLoad();

    return combineLatest([this.authStateService.authToken$, this.captchaService.createCaptchaToken$(action)]).pipe(
      take(1),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.get<T>(environment.api_base + url, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  POST<T>(url: string, body: any, action: string): Observable<HttpResponse<T>> {
    this.loadingService.beginLoad();

    return combineLatest([this.authStateService.authToken$, this.captchaService.createCaptchaToken$(action)]).pipe(
      take(1),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.post<T>(environment.api_base + url, body, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  PUT<T>(url: string, body: any, action: string): Observable<HttpResponse<T>> {
    this.loadingService.beginLoad();

    return combineLatest([this.authStateService.authToken$, this.captchaService.createCaptchaToken$(action)]).pipe(
      take(1),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.put<T>(environment.api_base + url, body, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  PATCH<T>(url: string, body: any, action: string): Observable<HttpResponse<T>> {
    this.loadingService.beginLoad();

    return combineLatest([this.authStateService.authToken$, this.captchaService.createCaptchaToken$(action)]).pipe(
      take(1),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.patch<T>(environment.api_base + url, body, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  DELETE<T>(url: string, action: string): Observable<HttpResponse<T>> {
    this.loadingService.beginLoad();

    return combineLatest([this.authStateService.authToken$, this.captchaService.createCaptchaToken$(action)]).pipe(
      take(1),
      switchMap(([authToken, captchaToken]) => {
        let call = this.http.delete<T>(environment.api_base + url, this.httpCallOptions(authToken, captchaToken));
        return this.mapResponse<T>(call);
      })
    );
  }

  private mapResponse<T>(call: Observable<HttpEvent<T>>): Observable<HttpResponse<T>> {
    return call.pipe(
      filter(call => call.type == HttpEventType.Response),
      map(call => call as HttpResponse<T>),
      catchError(error => {
        throw error;
      }),
      finalize(() => this.loadingService.stopLoad())
    );
  }

  private httpCallOptions(authToken: string, captchaToken: string): any {
    return {
      headers: { Authorization: 'Bearer ' + authToken, 'X-Captcha-Token': captchaToken },
      observe: 'response'
    };
  }
}
