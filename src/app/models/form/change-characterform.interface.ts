import { FormControl } from '@angular/forms';

export interface ChangeCharacterForm {
  characterName: FormControl<string>;
  characterServer: FormControl<string>;
}
