import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountCreateRequest } from '../../../models/API/request/account-create-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { RegisterForm } from '../../../models/form/register-form.interface';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

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
      email: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required, Validators.minLength(6), Validators.email])
      }),
      password: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).+$')])
      }),
      confirmPassword: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.required
      }),
      characterName: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\s\-\'_]+$/)
        ])
      }),
      characterServer: this.formBuilder.nonNullable.control('Adamantoise', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required])
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
        email: this.registerForm.controls.email.value.toLowerCase(),
        password: this.registerForm.controls.password.value,
        characterName: this.registerForm.controls.characterName.value,
        characterServer: this.registerForm.controls.characterServer.value
      };

      this.authStateService.onRegisterRequest(request);
    }
  }
}
