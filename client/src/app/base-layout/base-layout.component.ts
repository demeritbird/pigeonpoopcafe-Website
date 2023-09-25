import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

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
export class BaseLayoutComponent {
  isStickyNav: boolean = false;
  changeStickyNavDisplay(newBool: boolean) {
    this.isStickyNav = newBool;
  }
}
