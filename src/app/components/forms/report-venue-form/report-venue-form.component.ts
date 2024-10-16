import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ReportVenueRequest } from '../../../models/API/request/report-venue-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { ReportVenueForm } from '../../../models/form/report-venue-form.interface';
import { Venue } from '../../../models/venue.interface';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-report-venue-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UiFormErrorComponent, UiFormFieldErrorComponent],
  templateUrl: './report-venue-form.component.html',
  styleUrl: './report-venue-form.component.css'
})
export class ReportVenueFormComponent {
  @Input() venue?: Venue;

  reportVenueForm: FormGroup<ReportVenueForm>;
  FormName = FormName;

  isLoading$: BehaviorSubject<boolean>;

  constructor(private formBuilder: FormBuilder, private loadingService: LoadingService, private appDetailsStateService: AppDetailsStateService) {
    this.isLoading$ = loadingService.isLoading$;

    this.reportVenueForm = this.formBuilder.group<ReportVenueForm>({
      reportReason: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.required
      }),
      details: this.formBuilder.nonNullable.control('', { updateOn: 'submit', validators: Validators.required })
    });
  }

  submit() {
    if (this.reportVenueForm.valid) {
      let request: ReportVenueRequest = {
        venueID: this.venue!.venue.venueID,
        reportReason: this.reportVenueForm.controls.reportReason.value.toLowerCase(),
        details: this.reportVenueForm.controls.details.value
      };

      this.appDetailsStateService.onRequestReport(request);
    }
  }
}
