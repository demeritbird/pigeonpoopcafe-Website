import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksSectionComponent } from './artworks-section.component';
import { ArtworkContainerComponent } from '../../components/artwork-container/artwork-container.component';

describe('ArtworksSectionComponent', () => {
  let component: ArtworksSectionComponent;
  let fixture: ComponentFixture<ArtworksSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworksSectionComponent, ArtworkContainerComponent],
    });
    fixture = TestBed.createComponent(ArtworksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
