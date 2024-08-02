import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksSectionComponent } from './artworks-section.component';
import { ArtworkContainerComponent } from '../../components/artwork-container/artwork-container.component';
import { LazyLoadImageDirective } from 'src/app/modules/shared/directives/lazy-load-image.directive';

describe('ArtworksSectionComponent', () => {
  let component: ArtworksSectionComponent;
  let fixture: ComponentFixture<ArtworksSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArtworksSectionComponent,
        ArtworkContainerComponent,
        LazyLoadImageDirective,
      ],
    });
    fixture = TestBed.createComponent(ArtworksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
