import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [ClipboardModule, CommonModule],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.css'
})
export class CopyButtonComponent {
  @Input() copyText: string;

  showCopyTooltip: boolean = false;
  copyTooltipText = 'Copy';

  toggleTooltip(show: boolean) {
    this.showCopyTooltip = show;

    if (!show) {
      this.copyTooltipText = 'Copy';
    }
  }

  updateTooltip() {
    this.copyTooltipText = 'Copied!';
  }
}
