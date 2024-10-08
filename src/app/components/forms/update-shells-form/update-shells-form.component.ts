import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormName } from '../../../models/enum/form-name.enum';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';
import { UpdateShellsForm } from '../../../models/form/update-shells-form.interface';
import { UpdateMaxShellsRequest } from '../../../models/API/request/update-max-shells-request.interface';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-update-shells-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormErrorComponent, UiFormFieldErrorComponent],
  templateUrl: './update-shells-form.component.html',
  styleUrl: './update-shells-form.component.css'
})
export class UpdateShellsFormComponent {
  changeMaxShellsForm: FormGroup<UpdateShellsForm>;
  FormName = FormName;

  constructor(private formBuilder: FormBuilder, private authStateService: AuthStateService, private appDetailsState: AppDetailsStateService) {
    this.changeMaxShellsForm = this.formBuilder.group<UpdateShellsForm>({
      userID: this.formBuilder.control(''),
      updateAll: this.formBuilder.nonNullable.control(false),
      maxShells: this.formBuilder.nonNullable.control(1, {
        validators: Validators.required
      })
    });
  }

  submit() {
    if (this.changeMaxShellsForm.valid) {
      let request: UpdateMaxShellsRequest = {
        userID: this.changeMaxShellsForm.controls.userID.value ?? undefined,
        updateAll: this.changeMaxShellsForm.controls.updateAll.value,
        maxShells: this.changeMaxShellsForm.controls.maxShells.value
      };

      this.authStateService.onRequestAdjustUserShells(request);
    }
  }
}
