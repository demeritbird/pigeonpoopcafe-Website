import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFadeWrapperComponent } from './text-fade-wrapper.component';

describe('TextFadeWrapperComponent', () => {
  let component: TextFadeWrapperComponent;
  let fixture: ComponentFixture<TextFadeWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextFadeWrapperComponent]
    });
    fixture = TestBed.createComponent(TextFadeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
