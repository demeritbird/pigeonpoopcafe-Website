import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MainModule } from '../../main.module';
import { CodingSectionComponent } from './coding-section.component';

describe('CodingSectionComponent', () => {
  let component: CodingSectionComponent;
  let fixture: ComponentFixture<CodingSectionComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CodingSectionComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
