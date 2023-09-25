import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-experiences-section',
  templateUrl: './experiences-section.component.html',
  styleUrls: ['./experiences-section.component.scss'],
})
export class ExperiencesSectionComponent implements AfterViewInit {
  @ViewChild('experiences_section_ref') experiencesSectionRef!: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const refEvent: CustomEvent = new CustomEvent('experienceSectionRefEvent', {
      bubbles: true,
      detail: { data: this.experiencesSectionRef },
    });
    this.elementRef.nativeElement.dispatchEvent(refEvent);
  }
}
