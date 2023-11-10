import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSectionComponent } from './footer-section.component';
import { LinkIconTrayComponent } from '../../components/link-icon-tray/link-icon-tray.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MailerService } from '../../services/mailer.service';

describe('FooterSectionComponent', () => {
  let component: FooterSectionComponent;
  let fixture: ComponentFixture<FooterSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterSectionComponent, LinkIconTrayComponent],
      imports: [HttpClientTestingModule],
      providers: [MailerService],
    });
    fixture = TestBed.createComponent(FooterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
