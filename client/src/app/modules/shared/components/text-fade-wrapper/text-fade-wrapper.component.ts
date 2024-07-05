import { Component, Input } from '@angular/core';
import { size } from 'src/app/utils/types';

@Component({
  selector: 'app-text-fade-wrapper',
  templateUrl: './text-fade-wrapper.component.html',
  styleUrls: ['./text-fade-wrapper.component.scss'],
})
export class TextFadeWrapperComponent {
  @Input() fadeHeight: size = 'small';
  @Input() showScrollbar: boolean = true;

  configWrapper(size: size, showScrollbar: boolean): string[] {
    const classes = [];

    classes.push(`fade-wrapper--${size}`);
    if (!showScrollbar) {
      classes.push('mask-scrollbar');
    }

    return classes;
  }
}
