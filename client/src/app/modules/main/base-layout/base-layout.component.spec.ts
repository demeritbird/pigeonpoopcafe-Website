import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BaseLayoutComponent } from './base-layout.component';
import { DebugElement } from '@angular/core';
import { MainModule } from '../main.module';

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BaseLayoutComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
