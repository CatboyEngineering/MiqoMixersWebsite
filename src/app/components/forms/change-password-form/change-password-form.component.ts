import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../../../models/API/request/change-password-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { ChangePasswordForm } from '../../../models/form/change-password-form.interface';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent {
  changePasswordForm: FormGroup<ChangePasswordForm>;
  FormName = FormName;

  changedSuccess = false;

  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authStateService: AuthStateService,
    private appDetailsState: AppDetailsStateService,
    private loadingService: LoadingService
  ) {
    this.isLoading$ = loadingService.isLoading$;

    this.changePasswordForm = this.formBuilder.group<ChangePasswordForm>({
      newPassword: this.formBuilder.nonNullable.control('', {
        validators: Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).+$')])
      }),
      confirmPassword: this.formBuilder.nonNullable.control('', {
        validators: Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).+$')])
      })
    });
  }

  submit() {
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.controls.newPassword.value !== this.changePasswordForm.controls.confirmPassword.value) {
        this.appDetailsState.onFormError({
          form: FormName.CHANGE_PASSWORD,
          error: 'Passwords do not match!'
        });

        return;
      }

      let request: ChangePasswordRequest = {
        newPassword: this.changePasswordForm.controls.newPassword.value
      };

      this.authStateService.onChangePasswordRequest(request);
      this.appDetailsState.onFormErrorsCleared();

      this.changedSuccess = true;
    }
  }
}
