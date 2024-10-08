import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective, NgForm, UntypedFormGroup } from '@angular/forms';
import { Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'ui-form-field-error [form][errorFor]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-form-field-error.component.html',
  styleUrl: './ui-form-field-error.component.css'
})
export class UiFormFieldErrorComponent implements OnInit {
  @Input({required: true}) errorFor!: string;
  @Input({required: true}) errorType!: string;
  @Input({required: true}) form!: FormGroupDirective;

  hasError$: Observable<boolean | undefined> | undefined;

  constructor() {}

  ngOnInit(): void {
    var control = this.form.form.controls[this.errorFor];
    this.hasError$ = this.form!.ngSubmit.pipe(map(() => control.hasError(this.errorType)));
  }
}
