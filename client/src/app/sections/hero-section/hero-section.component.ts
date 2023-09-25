import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
  @ViewChild('hero_ref', { static: true }) heroView!: ElementRef;
  STICKY_THRESHOLD: number = 0.2;

  ngOnInit() {
    this.initStickyObserver();
  }

  initStickyObserver() {
    const obsCallback: IntersectionObserverCallback = function (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      // TODO: Add sticky navigation callback
    };
    const options: IntersectionObserverInit = {
      root: null,
      threshold: this.STICKY_THRESHOLD,
    };

    const observer = new IntersectionObserver(obsCallback, options);
    observer.observe(this.heroView.nativeElement);
  }
}
