import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreUIModule } from '@lib-core';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { CameraComponent } from './components/camera/camera.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ComboComponent } from './components/combo/combo.component';
import { ConfirmComponent } from './components/confirm.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownDateRangeComponent } from './components/dropdown-date-range/dropdown-date-range.component';
import { FullscreenComponent } from './components/fullscreen.component';
import { MockapiGridComponent } from './components/grid-manager';
import { LibGridComponent } from './components/grid-manager/component/lib-grid.component';
import { MockGridComponent } from './components/grid-manager/component/mock-grid/mock-grid.component';
import { ImageComponent } from './components/image/image.component';
import { InputComponent } from './components/input/input.component';
import { LoadingComponent } from './components/loading.component';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';
import { SplashComponent } from './components/splash.component';
import { SwitchComponent } from './components/switch/switch.component';
import { SymbolComponent } from './components/symbol/symbol.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { TimeComponent } from './components/time.component';
import { AutoFocusDirective, NumberOnlyDirective, PhoneMaskDirective, SelectLabelDirective } from './directives';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { MultiLevelDropDownDirective } from './directives/multilevel-dropdown.directive';
import { NumbersOnly } from './directives/numbersOnly';
import {
  CallBackPipe,
  ConversionPipe,
  CurrencyFormatPipe,
  DateFormatPipe,
  DateTimeFormatPipe,
  FilterByPipe,
  GroupByPipe,
  LocaleTitleCasePipe,
  SafePipe,
  SearchByPipe,
  SplitShiftPipe,
  StringtoFormatDatePipe,
  StringtoFormatTimePipe,
  TimeFormatPipe
} from './pipes';
import { SumPipe } from './pipes/sum.pipe';

const Pipes = [
  CurrencyFormatPipe,
  SafePipe,
  SplitShiftPipe,
  StringtoFormatDatePipe,
  StringtoFormatTimePipe,
  TimeFormatPipe,
  DateFormatPipe,
  DateTimeFormatPipe,
  SearchByPipe,
  FilterByPipe,
  GroupByPipe,
  ConversionPipe,
  CallBackPipe,
  LocaleTitleCasePipe,
  SumPipe
];
const Directives = [
  AutoFocusDirective,
  PhoneMaskDirective,
  NumberOnlyDirective,
  SelectLabelDirective,
  CurrencyMaskDirective,
  NumbersOnly,
  MultiLevelDropDownDirective
];
const Components = [
  FullscreenComponent,
  TimeComponent,
  LoadingComponent,
  SplashComponent,
  LibGridComponent,
  MockGridComponent,
  MockapiGridComponent,
  ConfirmComponent,
  SelectComponent,
  RadioComponent,
  SwitchComponent,
  TextareaComponent,
  InputComponent,
  CheckboxComponent,
  DatePickerComponent,
  DropdownDateRangeComponent,
  ComboComponent,
  SymbolComponent,
  CameraComponent,
  ImageComponent,
];

@NgModule({
  declarations: [
    Pipes,
    Directives,
    Components,
    SumPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InlineSVGModule,
    ScrollingModule,
    CoreUIModule
  ],
  exports: [
    Pipes,
    Directives,
    Components,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InlineSVGModule,
    ScrollingModule,
  ],
  providers: [
    DatePipe
  ],
})
export class LibCommonModule { }
