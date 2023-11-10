import { TestBed } from '@angular/core/testing';

import { MailerService } from './mailer.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('MailerService', () => {
  let mailerService: MailerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MailerService],
    });

    mailerService = TestBed.inject(MailerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(mailerService).toBeTruthy();
  });
});
