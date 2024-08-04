import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Adds blur filter on top of image and only loads in higher res image
 * when view threshold is met.
 *
 * @example
 *    <img
 *      class="u-lazy-img"
 *      appLazyLoad
 *      [lazyImageSrcSet]="..."
 *      ...
 *    />
 */
@Directive({
  selector: '[appLazyLoad]',
})
export class LazyLoadImageDirective implements OnInit {
  @Input({ required: true }) lazyImageSrcSet: string = '';

  observer!: IntersectionObserver;
  ROOT_MARGIN: number = 200;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createObserver();
  }

  private createObserver() {
    const options = {
      root: null,
      threshold: 0,
      rootMargin: `${this.ROOT_MARGIN}px`,
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const img = entry.target as HTMLImageElement;
        this.renderer.setAttribute(img, 'srcset', this.lazyImageSrcSet);

        img.addEventListener('load', () => {
          this.renderer.removeClass(img, 'u-lazy-img');
        });

        observer.unobserve(entry.target);
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }
}
