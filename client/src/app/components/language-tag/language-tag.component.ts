import { Component, Input } from '@angular/core';

enum LanguagesColor {
  typescript = '#3178C6',
  react = '#61dbfb',
  angular = '#dd1b16',
  scss = '#CF649A',
  expressjs = '#68a063',
  mongodb = '#589636',
  golang = '#29beb0',
}

type LanguagesColorKey = keyof typeof LanguagesColor;

@Component({
  selector: 'app-language-tag',
  templateUrl: './language-tag.component.html',
  styleUrls: ['./language-tag.component.scss'],
})
export class LanguageTagComponent {
  @Input() languageName: LanguagesColorKey = 'typescript';
  languageValue: LanguagesColor = LanguagesColor['typescript'];
  containerElement: Element | null = null;

  isContainerDarkBackgroundColor: boolean | null = null;

  ngOnInit() {
    this.containerElement = document.querySelector('.language-container');
    (this.containerElement as HTMLElement).style.backgroundColor =
      this.languageValue;
    this.isContainerDarkBackgroundColor = this.hexToRgb(this.languageValue);

    if (this.isContainerDarkBackgroundColor) {
      (this.containerElement as HTMLElement).style.color = '#1a1a1a'; // $color-grey-dark-2
    } else {
      (this.containerElement as HTMLElement).style.color = '#f6f6f6'; // $color-grey-dark-1
    }
  }

  // Link: https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
  hexToRgb(hex: string): boolean | null {
    hex = hex.replace(/^#/, '');

    // Parse the hex code to RGB values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return r * 0.2126 + g * 0.7152 + b * 0.0722 > 40; // luma value
  }
}
