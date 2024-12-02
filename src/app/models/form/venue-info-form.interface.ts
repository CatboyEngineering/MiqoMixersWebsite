import { FormControl } from '@angular/forms';

export interface VenueInfoForm {
  venueName: FormControl<string>;
  about: FormControl<string>;
  datacenter: FormControl<string>;
  world: FormControl<string>;
  district: FormControl<string>;
  ward: FormControl<number>;
  plot: FormControl<number>;
  hours: FormControl<
    {
      day?: string;
      open?: string;
      close?: string;
      timezoneID?: string;
      variableDay?: string;
      variableTimes?: string;
    }[]
  >;
  website: FormControl<string>;
  tags: FormControl<string>;
  syncShellID: FormControl<string | null>;
  syncShellPass: FormControl<string | null>;
}
