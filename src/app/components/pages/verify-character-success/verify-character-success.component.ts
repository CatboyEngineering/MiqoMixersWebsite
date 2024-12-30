import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';

@Component({
  selector: 'app-verify-character-success',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent],
  templateUrl: './verify-character-success.component.html',
  styleUrl: './verify-character-success.component.css'
})
export class VerifyCharacterSuccessComponent {}
