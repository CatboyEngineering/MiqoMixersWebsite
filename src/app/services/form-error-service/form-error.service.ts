import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormName } from '../../models/enum/form-name.enum';
import { FormValidationError } from '../../models/form-validation-error.interface';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  constructor() {}

  mapFormAPIError(form: FormName, error: HttpErrorResponse): FormValidationError {
    switch (form) {
      case FormName.REGISTER_ACCOUNT:
        return this.mapRegisterFailure(error);
      case FormName.LOG_IN:
        return this.mapLoginFailure(error);
      case FormName.VERIFY_CHARACTER:
        return this.mapVerifyFailure(error);
    }

    switch (error.status) {
      case 400:
        return {
          form,
          error: 'There was an error processing your request. Please check your data and try again.'
        };
      case 401:
        return {
          form,
          error: 'Your login expired. Please log back in and try again.'
        };
      default:
        return {
          form,
          error: 'There was an error with your request. Please try again.'
        };
    }
  }

  private mapRegisterFailure(error: HttpErrorResponse): FormValidationError {
    let form = FormName.REGISTER_ACCOUNT;

    switch (error.status) {
      case 400:
        return {
          form,
          error: 'There was an error processing your request. Please check your data and try again.'
        };
      case 401:
        return {
          form,
          error: 'Your email address or password was incorrect.'
        };
      default:
        return {
          form,
          error: 'There was an error with your request. Please try again.'
        };
    }
  }

  private mapLoginFailure(error: HttpErrorResponse): FormValidationError {
    let form = FormName.LOG_IN;

    switch (error.status) {
      case 400:
        return {
          form,
          error: 'There was an error processing your request. Please check your data and try again.'
        };
      case 401:
        return {
          form,
          error: 'Your email address or password is incorrect.'
        };
      case 404:
        return {
          form,
          error: "We couldn't find your character. Please ensure the spelling and home world are correct."
        };
      case 409: {
        return {
          form,
          error: 'An account with that email address already exists.'
        };
      }
      default:
        return {
          form,
          error: 'There was an error with your request. Please try again.'
        };
    }
  }

  private mapVerifyFailure(error: HttpErrorResponse): FormValidationError {
    let form = FormName.VERIFY_CHARACTER;

    switch (error.status) {
      case 400:
        return {
          form,
          error: "We couldn't find the code in your bio. Please wait a few minutes and try again."
        };
      case 401:
        return {
          form,
          error: 'Your login expired. Please log in and try again.'
        };
      case 409:
        return {
          form,
          error: 'Your character has already been verified.'
        };
      default:
        return {
          form,
          error: 'There was an error with your request. Please try again.'
        };
    }
  }
}
