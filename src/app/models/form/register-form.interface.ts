import { FormControl } from '@angular/forms';

export interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  characterName: FormControl<string>;
  characterServer: FormControl<string>;
}
