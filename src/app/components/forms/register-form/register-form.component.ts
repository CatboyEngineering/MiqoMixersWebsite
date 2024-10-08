import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '../../../models/form/register-form.interface';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { AccountCreateRequest } from '../../../models/API/request/account-create-request.interface';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';
import { FormName } from '../../../models/enum/form-name.enum';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { BehaviorSubject } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registerForm: FormGroup<RegisterForm>;
  FormName = FormName;

  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authStateService: AuthStateService,
    private appDetailsStateService: AppDetailsStateService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = loadingService.isLoading$;

    this.registerForm = this.formBuilder.group<RegisterForm>({
      username: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')])
      }),
      password: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).+$')])
      }),
      confirmPassword: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.required
      }),
      displayName: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern(/^[a-zA-Z0-9\s\-\'_]+$/)
        ])
      })
    });
  }

  submit() {
    this.appDetailsStateService.onFormErrorsCleared();

    if (this.registerForm.valid) {
      if (this.registerForm.controls.password.value !== this.registerForm.controls.confirmPassword.value) {
        this.appDetailsStateService.onFormError({
          form: FormName.REGISTER_ACCOUNT,
          error: 'Passwords do not match!'
        });

        return;
      }

      let request: AccountCreateRequest = {
        username: this.registerForm.controls.username.value.toLowerCase(),
        password: this.registerForm.controls.password.value,
        displayName: this.registerForm.controls.displayName.value
      };

      this.authStateService.onRegisterRequest(request);
    }
  }
}
