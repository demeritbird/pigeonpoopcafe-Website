import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-icon-tray',
  templateUrl: './link-icon-tray.component.html',
  styleUrls: ['./link-icon-tray.component.scss'],
})
export class LinkIconTrayComponent {
  @Input() hasBound: boolean = false;
}
