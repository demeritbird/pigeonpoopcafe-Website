import { Component, Input } from '@angular/core';
import { MailerService } from 'src/app/services/mailer.service';

@Component({
  selector: 'app-link-icon-tray',
  templateUrl: './link-icon-tray.component.html',
  styleUrls: ['./link-icon-tray.component.scss'],
})
export class LinkIconTrayComponent {
  @Input() hasBound: boolean = false;

  constructor(private mailerService: MailerService) {}

  clickMailIconHandler() {
    this.mailerService.requestMail().subscribe();
  }
}
