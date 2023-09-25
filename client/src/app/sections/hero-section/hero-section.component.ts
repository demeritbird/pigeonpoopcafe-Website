import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {
  @ViewChild('hero_ref', { static: true }) heroView!: ElementRef;
  STICKY_THRESHOLD: number = 0.2;
  @Output() emitIsStickyNav: EventEmitter<boolean> = new EventEmitter(false);

  ngOnInit() {
    this.initStickyObserver();
  }

  initStickyObserver() {
    const obsCallback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      _
    ) => {
      this.emitIsStickyNav.emit(!entries[0].isIntersecting);
    };
    const options: IntersectionObserverInit = {
      root: null,
      threshold: this.STICKY_THRESHOLD,
    };

    const observer = new IntersectionObserver(obsCallback, options);
    observer.observe(this.heroView.nativeElement);
  }
}
