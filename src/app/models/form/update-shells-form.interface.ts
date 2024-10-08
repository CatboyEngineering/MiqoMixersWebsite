import { FormControl } from '@angular/forms';

export interface UpdateShellsForm {
  userID: FormControl<string | null>;
  updateAll: FormControl<boolean>;
  maxShells: FormControl<number>;
}
