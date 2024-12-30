import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent, PageHeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {}
