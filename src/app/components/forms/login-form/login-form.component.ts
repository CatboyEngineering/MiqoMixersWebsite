import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AccountLoginRequest } from '../../../models/API/request/account-login-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { LoginForm } from '../../../models/form/login-form.interface';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup<LoginForm>;
  FormName = FormName;

  isLoading$: BehaviorSubject<boolean>;

  constructor(private formBuilder: FormBuilder, private authStateService: AuthStateService, private loadingService: LoadingService) {
    this.isLoading$ = loadingService.isLoading$;

    this.loginForm = this.formBuilder.group<LoginForm>({
      email: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required, Validators.email])
      }),
      password: this.formBuilder.nonNullable.control('', { updateOn: 'submit', validators: Validators.required })
    });
  }

  submit() {
    if (this.loginForm.valid) {
      let request: AccountLoginRequest = {
        email: this.loginForm.controls.email.value.toLowerCase(),
        password: this.loginForm.controls.password.value
      };

      this.authStateService.onLoginRequest(request);
    }
  }
}
