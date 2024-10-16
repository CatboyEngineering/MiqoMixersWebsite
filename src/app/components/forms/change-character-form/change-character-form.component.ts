import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChangeCharacterRequest } from '../../../models/API/request/change-character-request.interface';
import { FormName } from '../../../models/enum/form-name.enum';
import { ChangeCharacterForm } from '../../../models/form/change-characterform.interface';
import { LoadingService } from '../../../services/loading-service/loading.service';
import { AuthStateService } from '../../../store/auth-state/auth-state.service';
import { UiFormErrorComponent } from '../../ui/ui-form-error/ui-form-error.component';
import { UiFormFieldErrorComponent } from '../../ui/ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-change-character-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormFieldErrorComponent, UiFormErrorComponent, CommonModule],
  templateUrl: './change-character-form.component.html',
  styleUrl: './change-character-form.component.css'
})
export class ChangeCharacterFormComponent {
  changeCharacterForm: FormGroup<ChangeCharacterForm>;
  FormName = FormName;

  isLoading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private authStateService: AuthStateService, private loadingService: LoadingService) {
    this.isLoading$ = loadingService.isLoading$;

    this.changeCharacterForm = this.formBuilder.group<ChangeCharacterForm>({
      characterName: this.formBuilder.nonNullable.control('', {
        updateOn: 'submit',
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\s\-\'_]+$/)
        ])
      }),
      characterServer: this.formBuilder.nonNullable.control('Adamantoise', {
        updateOn: 'submit',
        validators: Validators.compose([Validators.required])
      })
    });
  }

  submit() {
    if (this.changeCharacterForm.valid) {
      let request: ChangeCharacterRequest = {
        characterName: this.changeCharacterForm.controls.characterName.value,
        characterServer: this.changeCharacterForm.controls.characterServer.value
      };

      this.authStateService.onChangeCharacterRequest(request);

      window.scrollTo(0, 0);
      window.focus();
    }
  }
}
