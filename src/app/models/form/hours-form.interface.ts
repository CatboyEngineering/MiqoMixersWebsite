import { FormControl } from '@angular/forms';

export interface HoursForm {
  isConstant: FormControl<boolean>;
  day?: FormControl<string | null>;
  openHour?: FormControl<number | null>;
  openMinute?: FormControl<number | null>;
  closeHour?: FormControl<number | null>;
  closeMinute?: FormControl<number | null>;
  timezoneID?: FormControl<string | null>;
  variableDay?: FormControl<string | null>;
  variableTimes?: FormControl<string | null>;
}
