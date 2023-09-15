import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

enum LanguagesColor {
  typescript = '#3178C6',
  react = '#61dbfb',
  angular = '#dd1b16',
  scss = '#CF649A',
  expressjs = '#68a063',
  mongodb = '#589636',
  golang = '#29beb0',
}

export type LanguagesColorKey = keyof typeof LanguagesColor;

@Component({
  selector: 'app-language-tag',
  templateUrl: './language-tag.component.html',
  styleUrls: ['./language-tag.component.scss'],
})
export class LanguageTagComponent implements OnInit {
  @Input() languageName: LanguagesColorKey = 'typescript';
  languageValue: LanguagesColor = LanguagesColor['typescript'];

  isContainerDarkBackgroundColor: boolean | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.languageValue = LanguagesColor[this.languageName];
    const containerElement = this.el.nativeElement.querySelector(
      '.language-container'
    );
    this.renderer.setStyle(
      containerElement,
      'backgroundColor',
      this.languageValue
    );

    this.isContainerDarkBackgroundColor = this.hexToRgb(this.languageValue);
    if (this.isContainerDarkBackgroundColor) {
      (containerElement as HTMLElement).style.color = '#1a1a1a'; // $color-grey-dark-2
    } else {
      (containerElement as HTMLElement).style.color = '#f6f6f6'; // $color-grey-dark-1
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
