import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingSectionComponent } from './coding-section.component';
import { ExperiencesSectionComponent } from './experiences-section/experiences-section.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
import { ProjectShowcaseComponent } from '../../components/project-showcase/project-showcase.component';
import { LanguageTagComponent } from '../../components/language-tag/language-tag.component';

describe('CodingSectionComponent', () => {
  let component: CodingSectionComponent;
  let fixture: ComponentFixture<CodingSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CodingSectionComponent,
        ExperiencesSectionComponent,
        ProjectsSectionComponent,
        ProjectShowcaseComponent,
        LanguageTagComponent,
      ],
    });
    fixture = TestBed.createComponent(CodingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
