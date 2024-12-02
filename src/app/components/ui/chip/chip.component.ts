import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css'
})
export class ChipComponent implements OnInit {
  @Input() chip?: string;

  bgColor: string = '#257180';

  ngOnInit(): void {
    switch (this.chip) {
      case 'DJ':
        this.bgColor = '#6C0345';
        break;
      case 'Lotto':
        this.bgColor = '#DC6B19';
        break;
      case 'Furry':
        this.bgColor = '#6F4E37';
        break;
      case 'LGBT':
      case 'LGBT+':
      case 'LGBTQ':
      case 'LGBTQ+':
        this.bgColor = '#85586F';
        break;
      case 'NSFW':
      case '18+':
        this.bgColor = '#9B3922';
        break;
      case 'SFW':
        this.bgColor = '#61764B';
        break;
    }
  }
}
