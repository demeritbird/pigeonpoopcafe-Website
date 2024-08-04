import { Component, Input } from '@angular/core';
import { LanguagesColorKey } from '../language-tag/language-tag.component';

@Component({
  selector: 'app-project-showcase',
  templateUrl: './project-showcase.component.html',
  styleUrls: ['./project-showcase.component.scss'],
})
export class ProjectShowcaseComponent {
  @Input() imagePathSmall: string = '';
  @Input() imagePathLarge: string = '';
  @Input() title: string = '';
  @Input() languageNameArr: LanguagesColorKey[] = [
    'typescript',
    'scss',
    'expressjs',
    'mongodb',
  ];
  @Input() link: string = '';
  @Input() isLightImage: boolean = false;
}
