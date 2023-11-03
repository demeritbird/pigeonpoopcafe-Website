import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSectionComponent } from './projects-section.component';
import { ProjectShowcaseComponent } from '../../../components/project-showcase/project-showcase.component';
import { LanguageTagComponent } from '../../../components/language-tag/language-tag.component';

describe('ProjectsSectionComponent', () => {
  let component: ProjectsSectionComponent;
  let fixture: ComponentFixture<ProjectsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsSectionComponent,
        ProjectShowcaseComponent,
        LanguageTagComponent,
      ],
    });
    fixture = TestBed.createComponent(ProjectsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
