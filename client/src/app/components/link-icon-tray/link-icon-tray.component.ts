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

  modalOpen: boolean = false;
  onModalToggle() {
    this.modalOpen = !this.modalOpen;
  }

  email: string = '';
  onModalSubmit() {
    this.mailerService.requestMail(this.email).subscribe();
    this.onModalToggle();
  }

  onMailIconClick() {
    this.onModalToggle();
  }
}
