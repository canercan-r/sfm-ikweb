import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LanguageService } from '@lib-common';


@Component({
  selector: 'cv-language-country-inner',
  styleUrls: ['./language-country-inner.component.scss'],
  templateUrl: './language-country-inner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageCountryInnerComponent implements OnInit {

  constructor(
    private readonly _lang: LanguageService,
  ) { }

  ngOnInit(): void { }

  setLanguage(language: string) {
    this._lang.language = language;
  }

  get currentLanguage(): string {
    return this._lang.language;
  }

  get languages(): string[] {
    return this._lang.supportedLanguages;
  }
}
