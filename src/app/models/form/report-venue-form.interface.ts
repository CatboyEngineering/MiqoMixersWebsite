import { FormControl } from '@angular/forms';

export interface ReportVenueForm {
  reportReason: FormControl<string>;
  details: FormControl<string>;
}
