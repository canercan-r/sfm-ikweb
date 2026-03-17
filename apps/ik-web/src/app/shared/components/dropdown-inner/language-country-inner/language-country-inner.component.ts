import { Component, Input } from '@angular/core';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { LanguageService } from '@lib-common';

@Component({
  selector: 'ikweb-language-country-inner',
  templateUrl: './language-country-inner.component.html',
  styleUrls: ['./language-country-inner.component.scss'],
})
export class LanguageCountryInnerComponent {
  @Input() innerId: string;
  @Input() triggerId: string;

  constructor(
    private readonly _lang: LanguageService,
    readonly _sharedHelper: SharedHelperService
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
