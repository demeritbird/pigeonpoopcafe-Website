import { TestBed } from '@angular/core/testing';
import { LazyLoadImageDirective } from './lazy-load-image.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('LazyLoadImageDirective', () => {
  let directive: LazyLoadImageDirective;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('div'));

    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useValue: mockElementRef }],
    });

    directive = new LazyLoadImageDirective(mockElementRef, mockRenderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
