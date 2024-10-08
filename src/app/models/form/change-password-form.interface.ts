import { FormControl } from "@angular/forms";

export interface ChangePasswordForm {
    newPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
}