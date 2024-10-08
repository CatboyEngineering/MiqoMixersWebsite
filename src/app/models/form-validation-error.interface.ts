import { FormName } from './enum/form-name.enum';

export interface FormValidationError {
  form: FormName;
  error: string;
}
