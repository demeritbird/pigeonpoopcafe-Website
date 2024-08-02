import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { logger } from 'src/app/utils/logger';

@Directive({
  selector: '[appImageLoaded]',
})
export class ImageLoadedDirective {
  TAG: string = '** ImageLoadedDirective';

  @Output() loaded = new EventEmitter<void>();

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.elRef.nativeElement;
    const style = getComputedStyle(element);
    const backgroundImage = style.backgroundImage;

    if (backgroundImage && backgroundImage !== 'none') {
      const urlMatch = backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = new Image();
        img.src = urlMatch[1];

        img.onload = () => {
          this.loaded.emit();
        };

        img.onerror = () => {
          logger({
            tag: this.TAG,
            type: 'error',
            message: 'Image did not load correctly!',
          });
        };
      }
    }
  }
}
