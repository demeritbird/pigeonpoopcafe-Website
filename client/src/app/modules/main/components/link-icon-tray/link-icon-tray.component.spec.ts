import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LinkIconTrayComponent } from './link-icon-tray.component';
import { MailerService } from '../../services/mailer.service';

describe('LinkIconTrayComponent', () => {
  let component: LinkIconTrayComponent;
  let fixture: ComponentFixture<LinkIconTrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkIconTrayComponent],
      imports: [HttpClientTestingModule],
      providers: [MailerService],
    });
    fixture = TestBed.createComponent(LinkIconTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
