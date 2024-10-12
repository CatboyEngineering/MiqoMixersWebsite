import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HoursForm } from '../../../models/form/hours-form.interface';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-hours-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UiFormFieldErrorComponent],
  templateUrl: './hours-form.component.html',
  styleUrl: './hours-form.component.css'
})
export class HoursFormComponent {
  @Output() onHoursAdded = new EventEmitter<{
    day?: string;
    open?: string;
    close?: string;
    timezoneID?: string;
    variableDay?: string;
    variableTimes?: string;
  }>();

  hoursForm: FormGroup<HoursForm>;

  day?: string;
  open?: string;
  close?: string;
  timezoneID?: string;
  variableDay?: string;
  variableTimes?: string;

  constructor(private formBuilder: FormBuilder) {
    this.hoursForm = this.formBuilder.group<HoursForm>({
      isConstant: this.formBuilder.nonNullable.control(true),
      day: this.formBuilder.control(''),
      open: this.formBuilder.control('', { validators: Validators.pattern(/^((0?\d)|(1[0-2])):[0-5]\d{1}$/) }),
      close: this.formBuilder.control('', { validators: Validators.pattern(/^((0?\d)|(1[0-2])):[0-5]\d{1}$/) }),
      timezoneID: this.formBuilder.control(''),
      variableDay: this.formBuilder.control(''),
      variableTimes: this.formBuilder.control('')
    });
  }

  submit() {
    if (this.hoursForm.valid) {
      this.onHoursAdded.emit({
        day: this.hoursForm.controls.day?.value || undefined,
        open: this.hoursForm.controls.open?.value || undefined,
        close: this.hoursForm.controls.close?.value || undefined,
        timezoneID: this.hoursForm.controls.timezoneID?.value || undefined,
        variableDay: this.hoursForm.controls.variableDay?.value || undefined,
        variableTimes: this.hoursForm.controls.variableTimes?.value || undefined
      });

      this.hoursForm.reset();
    }
  }
}
