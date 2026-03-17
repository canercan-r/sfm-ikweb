import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import type { Locale } from 'date-fns';
import { enUS, ru, tr } from 'date-fns/locale';
import {
  ComboResourceStringsTR,
  IgxResourceStringsTR,
  TimePickerResourceStringsTR
} from 'igniteui-angular-i18n';
import { Subscription } from 'rxjs';

import localeEN from '@angular/common/locales/en';
import localeTR from '@angular/common/locales/tr';
import { ComboResourceStringsEN, GridResourceStringsEN, TimePickerResourceStringsEN } from '@infragistics/igniteui-angular';

const languageKey = 'language';

export function extract(s: string) {
  return s;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public localePrefix: string;
  public resourceStrings: object;
  public locales: { type: string, resource: object }[];

  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;

  constructor(private _translateService: TranslateService) {
    registerLocaleData(localeEN);
    registerLocaleData(localeTR);

    this.locales = [
      {
        type: 'en', resource: {
          ...GridResourceStringsEN, ...TimePickerResourceStringsEN, ...ComboResourceStringsEN, igx_grid_excel_text_filter: 'Search',
          igx_grid_excel_number_filter: 'Search',
          igx_grid_excel_date_filter: 'Search',
          igx_grid_excel_boolean_filter: 'Search',
          igx_grid_excel_currency_filter: 'Search'
        }
      },
      {
        type: 'tr', resource: {
          ...IgxResourceStringsTR, ...TimePickerResourceStringsTR, ...ComboResourceStringsTR, igx_grid_excel_text_filter: 'Ara',
          igx_grid_excel_number_filter: 'Ara',
          igx_grid_excel_date_filter: 'Ara',
          igx_grid_excel_boolean_filter: 'Ara',
          igx_grid_excel_currency_filter: 'Ara'
        }
      }
    ];
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   */
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    this.localePrefix = this._translateService.currentLang?.substring(0, 2).toUpperCase() ?? this.localePrefix; // 'TR', 'EN', ...
    this.resourceStrings = this.locales.find(x => x.type.toLowerCase() === this.localePrefix.toLowerCase())?.resource ?? this.resourceStrings;

    const persisted = localStorage.getItem(languageKey);
    const browser = this._translateService.getBrowserCultureLang();
    this.language = persisted || browser || this.defaultLanguage;

    this.langChangeSubscription = this._translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        localStorage.setItem(languageKey, event.lang);

        this.localePrefix = event.lang?.substring(0, 2).toUpperCase() ?? this.localePrefix; // 'trTR', 'enUS', ... -> 'TR', 'EN', ...
        this.resourceStrings = this.locales.find(x => x.type.toLowerCase() === this.localePrefix.toLowerCase())?.resource ?? this.resourceStrings;
      }
    );
  }

  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  /**
   * Sets the current language.
   * If no exact match is found, tries finding by base language (e.g., "ru" -> "ruRU").
   */
  set language(language: string) {
    language = language || localStorage.getItem(languageKey) || this._translateService.getBrowserCultureLang() || '';
    let isSupportedLanguage = this.supportedLanguages.includes(language);

    // If no exact match is found, search without the region
    if (language && !isSupportedLanguage) {
      language = language.split('-')[0];
      language = this.supportedLanguages.find((supportedLanguage) => supportedLanguage.startsWith(language)) || '';
      isSupportedLanguage = Boolean(language);
    }

    // Fallback if language is not supported
    if (!isSupportedLanguage) {
      language = this.defaultLanguage;
    }

    // log.debug(`Language set to ${language}`);
    this._translateService.use(language);
  }

  get language(): string {
    return this._translateService.currentLang;
  }

  get localeCode(): string {
    switch (this._translateService.currentLang) {
      case 'trTR': return 'tr';
      case 'ruRU': return 'ru';
      default: return 'en-US';
    }
  }

  get locale(): Locale {
    switch (this._translateService.currentLang) {
      case 'trTR':
        return tr;
      case 'ruRU':
        return ru;
      default:
        return enUS;
    }
  }
}
