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

  timeRegex = /^((0?\d)|(1[0-2])):([0-5]\d{1})\s?((A|P)M)$/;

  constructor(private formBuilder: FormBuilder) {
    this.hoursForm = this.formBuilder.group<HoursForm>({
      isConstant: this.formBuilder.nonNullable.control(true),
      day: this.formBuilder.control(null),
      openHour: this.formBuilder.control(null),
      openMinute: this.formBuilder.control(45),
      closeHour: this.formBuilder.control(null),
      closeMinute: this.formBuilder.control(15),
      timezoneID: this.formBuilder.control(null),
      variableDay: this.formBuilder.control(''),
      variableTimes: this.formBuilder.control('')
    });

    this.prepareIsConstant();
  }

  prepareIsConstant() {
    this.hoursForm.controls.day?.addValidators(Validators.required);
    this.hoursForm.controls.openHour?.addValidators(Validators.required);
    this.hoursForm.controls.openMinute?.addValidators(Validators.required);
    this.hoursForm.controls.closeHour?.addValidators(Validators.required);
    this.hoursForm.controls.closeMinute?.addValidators(Validators.required);
    this.hoursForm.controls.timezoneID?.addValidators(Validators.required);

    this.hoursForm.controls.variableDay?.removeValidators(Validators.required);
    this.hoursForm.controls.variableTimes?.removeValidators(Validators.required);
  }

  prepareIsVariable() {
    this.hoursForm.controls.day?.removeValidators(Validators.required);
    this.hoursForm.controls.openHour?.removeValidators(Validators.required);
    this.hoursForm.controls.openMinute?.removeValidators(Validators.required);
    this.hoursForm.controls.closeHour?.removeValidators(Validators.required);
    this.hoursForm.controls.closeMinute?.removeValidators(Validators.required);
    this.hoursForm.controls.timezoneID?.removeValidators(Validators.required);

    this.hoursForm.controls.variableDay?.addValidators(Validators.required);
    this.hoursForm.controls.variableTimes?.addValidators(Validators.required);
  }

  submit() {
    if (this.hoursForm.valid) {
      if (this.hoursForm.controls.openHour?.value) {
        var openHour = this.hoursForm.controls.openHour!.value!;
        var openMinute = this.hoursForm.controls.openMinute!.value!;
        var closeHour = this.hoursForm.controls.closeHour!.value!;
        var closeMinute = this.hoursForm.controls.closeMinute!.value!;

        var open = new Date(Date.now());
        var close = new Date(Date.now());

        open.setHours(openHour, openMinute, 0, 0);
        close.setHours(closeHour, closeMinute, 0, 0);

        var timeOpenUTC = open.toISOString();
        var timeCloseUTC = close.toISOString();

        this.onHoursAdded.emit({
          day: this.hoursForm.controls.day?.value || undefined,
          open: timeOpenUTC || undefined,
          close: timeCloseUTC || undefined,
          timezoneID: this.hoursForm.controls.timezoneID?.value || undefined,
          variableDay: this.hoursForm.controls.variableDay?.value || undefined,
          variableTimes: this.hoursForm.controls.variableTimes?.value || undefined
        });
      }

      this.hoursForm.reset();
      // Errors don't go away
    }
  }
}
