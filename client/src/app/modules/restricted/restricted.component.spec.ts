import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedComponent } from './restricted.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('RestrictedComponent', () => {
  let component: RestrictedComponent;
  let fixture: ComponentFixture<RestrictedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [RestrictedComponent],
    });
    fixture = TestBed.createComponent(RestrictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
