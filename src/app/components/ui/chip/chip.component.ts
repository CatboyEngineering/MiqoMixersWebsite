import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css'
})
export class ChipComponent implements OnInit {
  @Input() chip?: string;

  bgColor: string = '#257180';
  tooltip: string;
  showTooltip: boolean = false;

  ngOnInit(): void {
    switch (this.chip) {
      case 'AFK':
        this.bgColor = '#4d5b4c';
        this.tooltip = 'Great for idling';
        break;
      case 'Discord':
        this.bgColor = '#5865F2';
        this.tooltip = 'Has a Discord community';
        break;
      case 'DJ':
      case 'Games':
      case 'Events':
        this.bgColor = '#6C0345';
        break;
      case 'Lotto':
      case 'Giveaways':
        this.bgColor = '#DC6B19';
        this.tooltip = 'Giveaways and promotions';
        break;
      case 'Furry':
        this.bgColor = '#6F4E37';
        break;
      case 'LGBT':
      case 'LGBT+':
      case 'LGBTQ':
      case 'LGBTQ+':
        this.bgColor = '#85586F';
        this.tooltip = 'Identifies as LGBT+ friendly';
        break;
      case 'NSFW':
      case '18+':
      case 'ERP':
        this.bgColor = '#9B3922';
        this.tooltip = 'Contains or endorses adult themes';
        break;
      case 'RP':
        this.bgColor = '#cea837';
        this.tooltip = 'Encourages Roleplay';
        break;
      case 'IRP':
        this.bgColor = '#cea837';
        this.tooltip = 'Focuses on Immersive Roleplay';
        break;
      case 'SFW':
        this.bgColor = '#61764B';
        this.tooltip = 'Safe for general audiences';
        break;
      default:
        this.tooltip = '';
        break;
    }
  }

  toggleTooltip(show: boolean) {
    if (this.tooltip) {
      this.showTooltip = show;
    }
  }
}
