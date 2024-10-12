import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HoursForm } from '../../../models/form/hours-form.interface';

@Component({
  selector: 'app-hours-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
      day: this.formBuilder.nonNullable.control(''),
      open: this.formBuilder.nonNullable.control(''),
      close: this.formBuilder.nonNullable.control(''),
      timezoneID: this.formBuilder.nonNullable.control(''),
      variableDay: this.formBuilder.nonNullable.control('M - F'),
      variableTimes: this.formBuilder.nonNullable.control('3-5pm ET')
    });
  }

  submit() {
    if (this.hoursForm.valid) {
      this.onHoursAdded.emit({
        day: this.hoursForm.controls.day?.value,
        open: this.hoursForm.controls.open?.value,
        close: this.hoursForm.controls.close?.value,
        timezoneID: this.hoursForm.controls.timezoneID?.value,
        variableDay: this.hoursForm.controls.variableDay?.value,
        variableTimes: this.hoursForm.controls.variableTimes?.value
      });
    }
  }
}
