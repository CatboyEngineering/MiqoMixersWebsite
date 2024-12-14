import { FormControl } from '@angular/forms';

export interface ReassignForm {
  venueID: FormControl<string>;
  accountID: FormControl<string>;
}
