import { TestBed } from '@angular/core/testing';
import { ImageLoadedDirective } from './image-loaded.directive';
import { ElementRef } from '@angular/core';

describe('ImageLoadedDirective', () => {
  let directive: ImageLoadedDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Create a mock ElementRef
    mockElementRef = new ElementRef(document.createElement('div'));

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
    });

    directive = new ImageLoadedDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
