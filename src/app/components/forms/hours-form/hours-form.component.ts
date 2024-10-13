import { CommonModule, DatePipe } from '@angular/common';
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

  timeRegex = /^((0?\d)|(1[0-2])):([0-5]\d{1})\s?((A|P)M)$/;


  // TODO need fields for openHour, openMinute, closeHour...
  constructor(private formBuilder: FormBuilder) {
    this.hoursForm = this.formBuilder.group<HoursForm>({
      isConstant: this.formBuilder.nonNullable.control(true),
      day: this.formBuilder.control(null),
      open: this.formBuilder.control('', { validators: Validators.pattern(this.timeRegex) }),
      close: this.formBuilder.control('', { validators: Validators.pattern(this.timeRegex) }),
      timezoneID: this.formBuilder.control(null),
      variableDay: this.formBuilder.control(''),
      variableTimes: this.formBuilder.control('')
    });

    this.prepareIsConstant();
  }

  prepareIsConstant() {
    this.hoursForm.controls.day?.addValidators(Validators.required);
    this.hoursForm.controls.open?.addValidators(Validators.required);
    this.hoursForm.controls.close?.addValidators(Validators.required);
    this.hoursForm.controls.timezoneID?.addValidators(Validators.required);

    this.hoursForm.controls.variableDay?.removeValidators(Validators.required);
    this.hoursForm.controls.variableTimes?.removeValidators(Validators.required);
  }

  prepareIsVariable() {
    this.hoursForm.controls.day?.removeValidators(Validators.required);
    this.hoursForm.controls.open?.removeValidators(Validators.required);
    this.hoursForm.controls.close?.removeValidators(Validators.required);
    this.hoursForm.controls.timezoneID?.removeValidators(Validators.required);

    this.hoursForm.controls.variableDay?.addValidators(Validators.required);
    this.hoursForm.controls.variableTimes?.addValidators(Validators.required);
  }

  submit() {
    if (this.hoursForm.valid) {
      var hour = this.hoursForm.controls.open?.value?.exec(this.timeRegex);

      
      var timeOpenUTC = new DatePipe('en', 'UTC').transform(, 'h:mm aa');

      console.log(timeOpenUTC);

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
