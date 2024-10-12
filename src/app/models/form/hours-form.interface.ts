import { FormControl } from '@angular/forms';

export interface HoursForm {
  day?: FormControl<string>;
  open?: FormControl<string>;
  close?: FormControl<string>;
  timezoneID?: FormControl<string>;
  variableDay?: FormControl<string>;
  variableTimes?: FormControl<string>;
}
