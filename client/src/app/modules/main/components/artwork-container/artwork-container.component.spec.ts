import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArtworkContainerComponent } from './artwork-container.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LazyLoadImageDirective } from 'src/app/modules/shared/directives/lazy-load-image.directive';

describe('ArtworkContainerComponent', () => {
  let component: ArtworkContainerComponent;
  let fixture: ComponentFixture<ArtworkContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworkContainerComponent, LazyLoadImageDirective],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ArtworkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
