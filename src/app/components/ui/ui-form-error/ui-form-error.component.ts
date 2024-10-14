import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { FormName } from '../../../models/enum/form-name.enum';
import { FormValidationError } from '../../../models/form-validation-error.interface';
import { AppDetailsStateService } from '../../../store/app-details-state/app-details-state.service';

@Component({
  selector: 'ui-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-form-error.component.html',
  styleUrl: './ui-form-error.component.css'
})
export class UiFormErrorComponent {
  @Input() formName: FormName | undefined;

  formErrors$: Observable<FormValidationError[]>;

  constructor(private appDetailsStateService: AppDetailsStateService) {
    this.formErrors$ = this.appDetailsStateService.formErrors$.pipe(
      filter(formErrors => !!formErrors),
      map(formErrors => formErrors.filter(error => error.form === this.formName))
    );
  }
}
