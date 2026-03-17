// import {
//   Directive,
//   ElementRef,
//   HostListener,
//   Input,
//   OnChanges,
//   SimpleChanges
// } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

// const paraBirimiMap = new Map<number, string>([
//   [1, 'TRY'],
//   [2, 'USD'],
//   [3, 'EUR'],
//   [4, 'GBP'],
//   [5, 'JPY'],
//   [6, 'ALL'],
// ]);

// @Directive({
//   selector: '[libCurrencyMask]'
// })
// export class CurrencyMaskDirective implements OnChanges {
//   private el: HTMLInputElement;

//   @Input() paraBirimiID: number;

//   constructor(
//     private elementRef: ElementRef,
//     private _translateService: TranslateService
//   ) {
//     this.el = this.elementRef.nativeElement;
//   }

//   @HostListener('keydown', ['$event'])
//   onKeyDown(event: KeyboardEvent) {
//     const allowedKeys = [
//       'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'
//     ];

//     if (allowedKeys.includes(event.key)) {
//       return;
//     }

//     if (!/^\d$/.test(event.key)) {
//       event.preventDefault();
//     }
//   }

//   @HostListener('blur')
//   onBlur() {
//     const numericValue = this.el.value.replace(/[^\d]/g, '');
//     this.el.value = this.formatCurrency(numericValue);

//     console.log(`Input blurred, formatted value: ${this.el.value}`);
//   }

//   @HostListener('input', ['$event.target.value'])
//   onInput(value: string) {
//     const numericValue = value.replace(/[^\d]/g, '');

//     console.log(`Input value changed: ${value}, numericValue: ${numericValue}`);

//     if (!numericValue) {
//       this.el.value = '';
//       return;
//     }

//     const formattedValue = this.formatCurrency(numericValue);
//     this.el.value = formattedValue;

//     console.log(`Formatted value set: ${formattedValue}`);
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['paraBirimiID'] && this.el.value) {
//       const numericValue = this.el.value.replace(/[^\d]/g, '');
//       this.el.value = this.formatCurrency(numericValue);
//     }
//   }

//   private formatCurrency(value: string): string {
//     const number = Number(value) / 100;
//     const currencyCode = paraBirimiMap.get(this.paraBirimiID) || 'TRY';
//     const lang = this._translateService.currentLang?.substring(0, 2) || 'tr';

//     console.log(`Formatting value: ${value}, number: ${number}, currencyCode: ${currencyCode}, lang: ${lang}`);

//     return new Intl.NumberFormat(lang, {
//       style: 'currency',
//       currency: currencyCode,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(number);
//   }
// }


import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

const paraBirimiMap = new Map<number, string>([
  [1, 'TRY'],
  [2, 'USD'],
  [3, 'EUR'],
  [4, 'GBP'],
  [5, 'JPY'],
  [6, 'ALL'],
]);

@Directive({
  selector: '[libCurrencyMask]'
})
export class CurrencyMaskDirective {
  @Input() formatAlwaysTwoDecimals = false;

  private allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = this.el.nativeElement;
    const key = event.key;

    if ((key >= '0' && key <= '9') || this.allowedKeys.includes(key)) return;
    if (key === ',' && !input.value.includes(',')) return;

    event.preventDefault();
  }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = this.el.nativeElement;
    let value: string = input.value;

    value = value.replace(/[^0-9,]/g, '');
    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts[1];
    }

    let integerPart = parts[0].replace(/^0+(?!$)/, '');
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    let decimalPart = parts[1] || '';
    decimalPart = decimalPart.substring(0, 2);

    let formatted = '';

    if (this.formatAlwaysTwoDecimals) {
      formatted = integerPart + ',' + decimalPart.padEnd(2, '0');
    } else {
      formatted = integerPart;
      if (decimalPart && parseInt(decimalPart) !== 0) {
        formatted += ',' + decimalPart;
      }
    }

    this.renderer.setProperty(input, 'value', formatted);
  }

  // private formatCurrency(value: number): string {
  //   const hasFraction = value % 1 !== 0;
  //   const currencyCode = paraBirimiMap.get(this.paraBirimiID) || 'TRY';
  //   const lang = this._translateService.currentLang?.substring(0, 2) || 'tr';

  //   console.log(`Formatting value: ${value}, currencyCode: ${currencyCode}, lang: ${lang}`);

  //   return new Intl.NumberFormat(lang, {
  //     style: 'decimal',
  //     currency: currencyCode,
  //     minimumFractionDigits: hasFraction ? 2 : 0,
  //     maximumFractionDigits: hasFraction ? 2 : 0
  //   }).format(value);
  // }
}
