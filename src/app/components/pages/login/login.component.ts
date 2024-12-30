import { Component } from '@angular/core';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, PageHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {}
