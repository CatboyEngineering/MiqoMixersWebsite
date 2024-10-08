import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormName } from '../../../models/enum/form-name.enum';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { ChangePasswordRequest } from '../../../models/API/request/change-password-request.interface';
import { ChangePasswordForm } from '../../../models/form/change-password-form.interface';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';
import { CommonModule } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder, private authStateService: AuthStateService, private appDetailsState: AppDetailsStateService) {
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
        password: this.changePasswordForm.controls.newPassword.value
      };

      this.authStateService.onChangePasswordRequest(request);

      this.changedSuccess = true;
    }
  }
}
