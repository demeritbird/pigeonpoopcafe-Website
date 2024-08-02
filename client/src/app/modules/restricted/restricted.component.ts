import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.scss'],
  animations: [
    trigger('slideFade', [
      state('hidden', style({ opacity: 0 })),
      transition('* => hidden', [animate('1s ease-in-out')]),
    ]),
  ],
})
export class RestrictedComponent {
  imageIsLoading: boolean = true;
  icons = Array(10);

  imageOnLoad() {
    // lazy loading
    this.imageIsLoading = false;
  }
}
