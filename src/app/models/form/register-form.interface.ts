import { FormControl } from '@angular/forms';

export interface RegisterForm {
  username: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  displayName: FormControl<string>;
}
