import { Component } from '@angular/core';
import { LanguageService } from '@lib-common';

@Component({
  selector: 'ikweb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(
    private _languageService: LanguageService
  ) { }

  setLanguage(language: string) {
    this._languageService.language = language;
  }

  get currentLanguage(): string {
    return this._languageService.language;
  }

  get languages(): string[] {
    return this._languageService.supportedLanguages;
  }
}

