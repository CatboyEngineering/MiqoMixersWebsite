import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { FormName } from '../../../models/enum/form-name.enum';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { NameChangeForm } from '../../../models/form/name-change-form.interface';
import { NameChangeRequest } from '../../../models/API/request/name-change-request.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-change-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule],
  templateUrl: './name-change-form.component.html',
  styleUrl: './name-change-form.component.css'
})
export class NameChangeFormComponent {
  nameChangeForm: FormGroup<NameChangeForm>;
  FormName = FormName;

  changedSuccess = false;

  constructor(private formBuilder: FormBuilder, private authStateService: AuthStateService) {
    this.nameChangeForm = this.formBuilder.group<NameChangeForm>({
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
    if (this.nameChangeForm.valid) {
      let request: NameChangeRequest = {
        displayName: this.nameChangeForm.controls.displayName.value
      };

      this.authStateService.onNameChangeRequest(request);

      this.changedSuccess = true;

      window.scrollTo(0, 0);
      window.focus();
    }
  }
}
