import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../shared-ui/page-header/page-header.component';

@Component({
  selector: 'app-report-submitted',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './report-submitted.component.html',
  styleUrl: './report-submitted.component.css'
})
export class ReportSubmittedComponent {}
