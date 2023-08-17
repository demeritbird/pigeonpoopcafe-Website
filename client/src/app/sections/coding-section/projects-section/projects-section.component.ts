import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent {
  slides: NodeListOf<Element> | null = null;
  btnLeft: Element | null = null;
  btnRight: Element | null = null;
  dotContainer: Element | null = null;

  curSlide: number = 0;
  maxSlide: number = 0;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.slides = document.querySelectorAll('.slide');
    this.btnLeft = document.querySelector('.slider__btn--left');
    this.btnRight = document.querySelector('.slider__btn--right');
    this.dotContainer = document.querySelector('.dots');

    if (!this.slides || !this.dotContainer) return;

    this.maxSlide = this.slides.length ?? 0;

    this.slides.forEach((_, i) => {
      const dot: Element = this.renderer.createElement('button');
      this.renderer.addClass(dot, 'dots__dot');
      this.renderer.setAttribute(dot, 'data-slide', i.toString());
      this.renderer.listen(dot, 'click', (event) => this.dotClick(event));

      this.renderer.appendChild(this.dotContainer, dot);
    });

    this.goToSlide(0);
    this.activateDot(0);
  }

  activateDot = (slide: number) => {
    const dotElements =
      this.elementRef.nativeElement.querySelectorAll('.dots__dot');

    dotElements.forEach((dot: Element, index: number) => {
      if (index === slide) {
        this.renderer.addClass(dot, 'dots__dot--active');
      } else {
        this.renderer.removeClass(dot, 'dots__dot--active');
      }
    });
  };

  goToSlide = (slide: number) => {
    if (!this.slides) return;

    switch (slide) {
      case 0:
        this.isFirstPage = true;
        this.isLastPage = false;
        break;

      case this.maxSlide - 1:
        this.isFirstPage = false;
        this.isLastPage = true;
        break;

      default:
        this.isFirstPage = false;
        this.isLastPage = false;
        break;
    }

    this.slides.forEach(
      (s, i) =>
        ((s as HTMLElement).style.transform = `translateX(${
          100 * (i - slide)
        }%)`)
    );
  };

  nextSlide = () => {
    if (this.curSlide === this.maxSlide - 1) {
      this.curSlide = 0;
    } else {
      this.curSlide++;
    }

    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  };

  prevSlide = () => {
    if (this.curSlide === 0) {
      this.curSlide = this.maxSlide - 1;
    } else {
      this.curSlide--;
    }
    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  };

  dotClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLElement;

    if (target.classList.contains('dots__dot')) {
      const { slide } = target.dataset;
      if (!slide) return;

      this.curSlide = +slide;
      this.goToSlide(+slide);
      this.activateDot(+slide);
    }
  }
}
