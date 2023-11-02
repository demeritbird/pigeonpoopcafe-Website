import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  animations: [
    trigger('navFade', [
      state('void', style({ opacity: 0, visibility: 'hidden' })),
      transition('void <=> *', [animate('300ms')]),
    ]),
  ],
})
export class BaseLayoutComponent implements AfterViewInit {
  sectionRefObj: Record<string, ElementRef> = {};

  @ViewChild('about_section_ref', { read: ElementRef })
  aboutSectionRef!: ElementRef;
  @ViewChild('artworks_section_ref', { read: ElementRef })
  artworksSectionRef!: ElementRef;

  ngAfterViewInit() {
    this.sectionRefObj['about'] = this.aboutSectionRef;
    this.sectionRefObj['artworks'] = this.artworksSectionRef;
  }
  @HostListener('experienceSectionRefEvent', ['$event'])
  onCustomEventCaptured(event: CustomEvent) {
    this.sectionRefObj['experience'] = event.detail.data;
  }
  @HostListener('projectsSectionRefEvent', ['$event'])
  projectsSectionRefEvent(event: CustomEvent) {
    this.sectionRefObj['projects'] = event.detail.data;
  }

  isStickyNav: boolean = false;
  changeStickyNavDisplay(newBool: boolean) {
    this.isStickyNav = newBool;
  }
}
