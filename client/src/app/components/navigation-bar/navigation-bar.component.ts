import {
  Component,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('nav_ref', { static: true }) navView!: ElementRef;
  @Input() isStickyNav: boolean = false;
  @Input() sectionRefObj: Record<string, ElementRef> = {};

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    if (this.isStickyNav) {
      this.renderer.addClass(this.navView.nativeElement, 'navigation--sticky');
    } else {
      this.renderer.removeClass(
        this.navView.nativeElement,
        'navigation--sticky'
      );
    }
  }

  onClickAbout(event: MouseEvent) {
    event.preventDefault();
    this.smoothScroll(this.sectionRefObj['about']);
  }
  onClickExperience(event: MouseEvent) {
    event.preventDefault();
    this.smoothScroll(this.sectionRefObj['experience']);
  }
  onClickProjects(event: MouseEvent) {
    event.preventDefault();
    this.smoothScroll(this.sectionRefObj['projects']);
  }
  onClickArtworks(event: MouseEvent) {
    event.preventDefault();
    this.smoothScroll(this.sectionRefObj['artworks']);
  }
  smoothScroll(el: ElementRef) {
    el.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
