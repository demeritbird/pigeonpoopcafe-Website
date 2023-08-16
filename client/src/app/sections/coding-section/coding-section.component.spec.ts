import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingSectionComponent } from './coding-section.component';

describe('CodingSectionComponent', () => {
  let component: CodingSectionComponent;
  let fixture: ComponentFixture<CodingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodingSectionComponent],
    });
    fixture = TestBed.createComponent(CodingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
