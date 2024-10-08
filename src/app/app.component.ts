import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecaptchaV3Module } from 'ng-recaptcha';
import { NavComponent } from './components/ui/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecaptchaV3Module, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MiqoMixers';
}
