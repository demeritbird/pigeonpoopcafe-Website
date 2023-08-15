import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceProjectsSectionComponent } from './experience-projects-section.component';

describe('ExperienceProjectsSectionComponent', () => {
  let component: ExperienceProjectsSectionComponent;
  let fixture: ComponentFixture<ExperienceProjectsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceProjectsSectionComponent]
    });
    fixture = TestBed.createComponent(ExperienceProjectsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
