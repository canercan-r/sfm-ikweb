import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { AlertComponent } from './alert/alert.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ComboComponent } from './combo/combo.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { SymbolComponent } from './symbol/symbol.component';
import { TextareaComponent } from './textarea/textarea.component';

const Components = [
  InputComponent,
  TextareaComponent,
  SelectComponent,
  ComboComponent,
  RadioComponent,
  SymbolComponent,
  DropdownMenuComponent,
  AlertComponent,
  DropdownComponent,
  CheckboxComponent,
  DatePickerComponent
];
@NgModule({
  declarations: [
    Components,
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    RouterModule
  ],
  exports: [
    Components
  ],
})
export class ComponentsModule { }
