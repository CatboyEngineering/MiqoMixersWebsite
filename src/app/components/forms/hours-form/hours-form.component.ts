import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment-timezone';
import { HoursForm } from '../../../models/form/hours-form.interface';
import { TimeService } from '../../../services/time-service/time.service';
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

  constructor(private formBuilder: FormBuilder, private timeService: TimeService) {
    this.hoursForm = this.formBuilder.group<HoursForm>({
      isConstant: this.formBuilder.nonNullable.control(true),
      day: this.formBuilder.control(null),
      openHour: this.formBuilder.control(null),
      openMinute: this.formBuilder.control(null),
      closeHour: this.formBuilder.control(null),
      closeMinute: this.formBuilder.control(null),
      timezoneID: this.formBuilder.control(null),
      variableDay: this.formBuilder.control(''),
      variableTimes: this.formBuilder.control('')
    });

    this.prepareIsConstant();
  }

  resetValidators() {
    this.hoursForm.controls.day?.clearValidators();
    this.hoursForm.controls.openHour?.clearValidators();
    this.hoursForm.controls.openMinute?.clearValidators();
    this.hoursForm.controls.closeHour?.clearValidators();
    this.hoursForm.controls.closeMinute?.clearValidators();
    this.hoursForm.controls.timezoneID?.clearValidators();
    this.hoursForm.controls.variableDay?.clearValidators();
    this.hoursForm.controls.variableTimes?.clearValidators();

    this.hoursForm.controls.day?.setErrors(null);
    this.hoursForm.controls.openHour?.setErrors(null);
    this.hoursForm.controls.openMinute?.setErrors(null);
    this.hoursForm.controls.closeHour?.setErrors(null);
    this.hoursForm.controls.closeMinute?.setErrors(null);
    this.hoursForm.controls.timezoneID?.setErrors(null);
    this.hoursForm.controls.variableDay?.setErrors(null);
    this.hoursForm.controls.variableTimes?.setErrors(null);
  }

  prepareIsConstant() {
    this.resetValidators();

    this.hoursForm.controls.day?.addValidators(Validators.required);
    this.hoursForm.controls.openHour?.addValidators(Validators.required);
    this.hoursForm.controls.openMinute?.addValidators(Validators.required);
    this.hoursForm.controls.closeHour?.addValidators(Validators.required);
    this.hoursForm.controls.closeMinute?.addValidators(Validators.required);
    this.hoursForm.controls.timezoneID?.addValidators(Validators.required);
  }

  prepareIsVariable() {
    this.resetValidators();

    this.hoursForm.controls.variableDay?.addValidators(Validators.required);
    this.hoursForm.controls.variableTimes?.addValidators(Validators.required);
  }

  submit() {
    if (this.hoursForm.valid) {
      if (this.hoursForm.controls.isConstant.value) {
        var openHour = this.hoursForm.controls.openHour!.value!;
        var openMinute = this.hoursForm.controls.openMinute!.value!;
        var closeHour = this.hoursForm.controls.closeHour!.value!;
        var closeMinute = this.hoursForm.controls.closeMinute!.value!;
        var timezoneID = this.hoursForm.controls.timezoneID!.value!;

        var open = moment();
        var close = moment();

        open.tz(timezoneID);
        close.tz(timezoneID);

        open.set('hour', openHour).set('minute', openMinute);
        close.set('hour', closeHour).set('minute', closeMinute);

        var timeOpenUTC = open.utc().format();
        var timeCloseUTC = close.utc().format();

        this.onHoursAdded.emit({
          day: this.hoursForm.controls.day?.value || undefined,
          open: timeOpenUTC || undefined,
          close: timeCloseUTC || undefined,
          timezoneID: this.hoursForm.controls.timezoneID?.value || undefined
        });
      } else {
        this.onHoursAdded.emit({
          variableDay: this.hoursForm.controls.variableDay?.value || undefined,
          variableTimes: this.hoursForm.controls.variableTimes?.value || undefined
        });
      }

      this.hoursForm.reset();
      this.hoursForm.controls.isConstant.patchValue(true);
      this.prepareIsConstant();
    }
  }
}
