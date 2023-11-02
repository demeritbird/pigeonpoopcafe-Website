import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectShowcaseComponent } from './project-showcase.component';

describe('ProjectShowcaseComponent', () => {
  let component: ProjectShowcaseComponent;
  let fixture: ComponentFixture<ProjectShowcaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectShowcaseComponent]
    });
    fixture = TestBed.createComponent(ProjectShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
