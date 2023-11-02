import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTagComponent } from './language-tag.component';

describe('LanguageTagComponent', () => {
  let component: LanguageTagComponent;
  let fixture: ComponentFixture<LanguageTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageTagComponent]
    });
    fixture = TestBed.createComponent(LanguageTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
