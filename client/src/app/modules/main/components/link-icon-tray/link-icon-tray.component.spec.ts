import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkIconTrayComponent } from './link-icon-tray.component';

describe('LinkIconTrayComponent', () => {
  let component: LinkIconTrayComponent;
  let fixture: ComponentFixture<LinkIconTrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkIconTrayComponent]
    });
    fixture = TestBed.createComponent(LinkIconTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
