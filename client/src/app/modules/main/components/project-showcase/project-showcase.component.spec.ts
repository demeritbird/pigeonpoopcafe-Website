import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectShowcaseComponent } from './project-showcase.component';
import { LanguageTagComponent } from '../language-tag/language-tag.component';
import { DebugElement } from '@angular/core';
import { MainModule } from '../../main.module';

describe('ProjectShowcaseComponent', () => {
  let component: ProjectShowcaseComponent;
  let fixture: ComponentFixture<ProjectShowcaseComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProjectShowcaseComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
