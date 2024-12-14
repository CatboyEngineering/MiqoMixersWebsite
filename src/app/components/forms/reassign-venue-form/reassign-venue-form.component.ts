import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ReassignVenueRequest } from '../../../models/API/request/reassign-venue-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { ReassignForm } from '../../../models/form/reassign-form';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AdminStateService } from '../../../store/admin-state/admin-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-reassign-venue-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule],
  templateUrl: './reassign-venue-form.component.html',
  styleUrl: './reassign-venue-form.component.css'
})
export class ReassignVenueFormComponent {
  reassignForm: FormGroup<ReassignForm>;
  FormName = FormName;

  isLoading$: BehaviorSubject<boolean>;

  constructor(private formBuilder: FormBuilder, private adminStateService: AdminStateService, private loadingService: LoadingService) {
    this.isLoading$ = loadingService.isLoading$;

    this.reassignForm = this.formBuilder.group<ReassignForm>({
      venueID: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.required
      }),
      accountID: this.formBuilder.nonNullable.control('', { updateOn: 'submit', validators: Validators.required })
    });
  }

  submit() {
    if (this.reassignForm.valid) {
      let request: ReassignVenueRequest = {
        venueID: this.reassignForm.controls.venueID.value,
        accountID: this.reassignForm.controls.accountID.value
      };

      this.adminStateService.onReassignVenue(request);
    }
  }
}
