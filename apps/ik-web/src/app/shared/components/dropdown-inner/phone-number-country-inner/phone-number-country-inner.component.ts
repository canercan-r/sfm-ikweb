import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MenuComponent } from '@ikweb-scripts/components';
import { SharedAPIService } from '@ikweb-shared/services/apis/shared-api.service';
import { ICountry, LanguageService } from '@lib-common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ikweb-phone-number-country-inner',
  templateUrl: './phone-number-country-inner.component.html',
  styleUrls: ['./phone-number-country-inner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberCountryInnerComponent implements AfterViewInit {
  @ViewChild("countrySearchInput") private _countrySearchInput: ElementRef;

  @Output() countryChangeEmit = new EventEmitter<ICountry>();

  @Input() innerId: string;
  @Input() triggerId: string;

  countries: ICountry[];
  countryForm = new FormControl();
  selectedCountry: ICountry;

  constructor(

    private readonly _cdr: ChangeDetectorRef,
    private readonly _lang: LanguageService,
    private _sharedAPI: SharedAPIService
  ) { }

  ngAfterViewInit(): void {
    this._sharedAPI.getUlkeler().pipe(
      untilDestroyed(this)
    ).subscribe(data => {
      this.countries = data;
      this.countries.find((c) => c.langCode === this._lang.localeCode?.replace('-', '').substring(2, 4).toUpperCase())
      this.selectedCountry = this.countries.find((c) => c.langCode?.trim() === this._lang.localeCode?.replace('-', '').substring(2, 4).toUpperCase());
      this.countryChangeEmit.emit(this.selectedCountry);

      this._cdr.detectChanges();
    })
  }

  click(e?: Event) {
    let itemEl = document.querySelector(`#${this.innerId}`) as HTMLElement;
    let triggerEl = document.querySelector(`#${this.triggerId}`) as HTMLElement;
    // let buttonEl = document.querySelector("#st_header_user_inner_toggle") as HTMLElement;
    let menu = MenuComponent.getInstance(itemEl);
    // menu.show(itemEl);
    // menu.mouseover(itemEl, e);
    // menu.click(triggerEl, e)
    e ? menu.click(triggerEl, e) : menu.show(itemEl);
    // menu.show(itemEl);
  }

  countrySearchFocus(e?: Event) {
    setTimeout(() => {
      this._countrySearchInput.nativeElement.focus();
    }, 100);
  }

  countrySearchClick(e: Event) {
    e.stopPropagation();

    this.countrySearchFocus();
  }

  onCountryChange(country: ICountry) {
    this.selectedCountry = country;
    this.countryChangeEmit.emit(this.selectedCountry);
  }

  getCountryFlags(code: string) {
    const codeLowerCase = code?.toLowerCase()
    if (code) {
      if (codeLowerCase === 'an' || codeLowerCase === 'ac') {
        return `assets/flags/base.png`;
      } else {
        return `assets/flags/${codeLowerCase}.png`;
      }
    }
    else {
      return `assets/flags/base.png`;
    }
  }
}


