import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroSectionComponent } from './hero-section.component';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { ProfileImageComponent } from '../../components/profile-image/profile-image.component';
import { LinkIconTrayComponent } from '../../components/link-icon-tray/link-icon-tray.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MailerService } from '../../services/mailer.service';
import { DebugElement } from '@angular/core';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeroSectionComponent,
        NavigationBarComponent,
        ProfileImageComponent,
        LinkIconTrayComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [MailerService],
    });
    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
