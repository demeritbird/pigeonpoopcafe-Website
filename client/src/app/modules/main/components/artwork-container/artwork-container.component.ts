import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artwork-container',
  templateUrl: './artwork-container.component.html',
  styleUrls: ['./artwork-container.component.scss'],
})
export class ArtworkContainerComponent {
  @Input() caption: string = '';
  @Input() imagePathSmall: string = '';
  @Input() imagePathLarge: string = '';
}
