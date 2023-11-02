import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksSectionComponent } from './artworks-section.component';

describe('ArtworksSectionComponent', () => {
  let component: ArtworksSectionComponent;
  let fixture: ComponentFixture<ArtworksSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtworksSectionComponent]
    });
    fixture = TestBed.createComponent(ArtworksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
