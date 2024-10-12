import { FormControl } from '@angular/forms';

export interface HoursForm {
  isConstant: FormControl<boolean>;
  day?: FormControl<string | null>;
  open?: FormControl<string | null>;
  close?: FormControl<string | null>;
  timezoneID?: FormControl<string | null>;
  variableDay?: FormControl<string | null>;
  variableTimes?: FormControl<string | null>;
}
