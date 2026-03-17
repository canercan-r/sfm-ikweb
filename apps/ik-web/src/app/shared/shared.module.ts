import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './components/alert/alert.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { DateRangeSelectComponent } from './components/date-range-select/date-range-select.component';
import { LanguageCountryInnerComponent } from './components/dropdown-inner/language-country-inner/language-country-inner.component';
import { PhoneNumberCountryInnerComponent } from './components/dropdown-inner/phone-number-country-inner/phone-number-country-inner.component';
import { UserInnerComponent } from './components/dropdown-inner/user-inner/user-inner.component';
import { HintComponent } from './components/hint/hint.component';
import { InputComponent } from './components/input/input.component';
import { RadioComponent } from './components/radio/radio.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { SelectComponent } from './components/select/select.component';
import { SymbolComponent } from './components/symbol/symbol.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const Pipes = [];

const Components = [
  InputComponent,
  CheckboxComponent,
  RadioComponent,
  SelectComponent,
  ToolbarComponent,
  AlertComponent,
  HintComponent,
  SymbolComponent,
  DateRangeSelectComponent,
  DateRangePickerComponent,
  LanguageCountryInnerComponent,
  PhoneNumberCountryInnerComponent,
  ScriptsInitComponent,
  UserInnerComponent,
  DatePickerComponent
];

@NgModule({
  declarations: [Components, Pipes],
  imports: [CoreUIModule, LibCommonModule, RouterModule],
  exports: [Components, Pipes],
  providers: [NgbActiveModal, NgbModal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
