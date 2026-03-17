import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { DefaultLayoutConfig } from '@ikweb-layout/core/default-layout.config';
import {
  AbsoluteScrollStrategy,
  AutoPositionStrategy,
  HorizontalAlignment,
  IgxInputGroupType,
  IgxSelectComponent,
  ISelectionEventArgs,
  OverlaySettings,
  PositionSettings,
  VerticalAlignment,
} from '@infragistics/igniteui-angular';
import { growVerIn, growVerOut, RequiredInput, SelectLabelDirective } from '@lib-common';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'ikweb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T extends object>
  implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('select', { static: true }) public select: IgxSelectComponent;
  @ContentChild(SelectLabelDirective) labelDirective: SelectLabelDirective;

  @Output() readonly changed = new EventEmitter<any>();
  @Output() readonly dynamicChanged = new EventEmitter<{
    event: ISelectionEventArgs;
    inputName: string;
  }>();

  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() label: string;
  @Input() valueKey?: keyof T;
  @Input() displayKey?: string;
  @Input() overlaySettings: OverlaySettings;
  @Input() required: boolean;
  @Input() selected: any;
  @Input() name?: string;
  @Input() objectValue: boolean;
  @Input() formButton: boolean;
  @Input() controlRequired = true;
  @Input() isDynamic: boolean;
  @Input() dynamicItem: RequiredInput;
  @Input() inputGroupType?: IgxInputGroupType = DefaultLayoutConfig.main.inputGroupType;
  @Input() defaultItem: T;

  #data: T[] = [];
  displayKeys = []
  @Input() displayKeySeparator = ' / ';

  get data() {
    return this.#data;
  }

  @Input() set data(value: T[]) {
    this.#data = value;
  }

  #value: any;
  #onChange = (val: any) => { };
  #onTouch = (val: any) => { };

  control: FormControl;
  protected readonly destroy = new Subject<void>();
  displayValue$ = new BehaviorSubject('');

  get value() {
    return this.#value;
  }

  set value(val: any) {
    this.#value = val;
    this.#onChange(val);
    this.#onTouch(val);
  }

  constructor(@Inject(Injector) private injector: Injector) { }

  ngAfterViewInit(): void {
    this.control.markAsPristine();
    this.control.markAsUntouched();
  }

  change(event: ISelectionEventArgs) {
    this.changed.emit(event);
  }

  dynamicChange(event: ISelectionEventArgs, inputName: string) {
    this.dynamicChanged.emit({ event, inputName });
  }

  ngOnInit(): void {
    this.displayKeys = this.displayKey?.split(',')
    this.setComponentControl();

    const positionSettings: PositionSettings = {
      closeAnimation: growVerOut,
      horizontalDirection: HorizontalAlignment.Right,
      horizontalStartPoint: HorizontalAlignment.Left,
      openAnimation: growVerIn,
      verticalDirection: VerticalAlignment.Bottom,
      verticalStartPoint: VerticalAlignment.Bottom,
    };

    const positionStrategyAuto = new AutoPositionStrategy({
      verticalDirection: VerticalAlignment.Bottom,
    });

    this.overlaySettings = this.overlaySettings || {
      target: this.select?.inputGroup?.element?.nativeElement,
      positionStrategy: positionStrategyAuto,
      scrollStrategy: new AbsoluteScrollStrategy(),
      modal: false,
      closeOnEscape: false,
    };
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.#onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private setComponentControl(): void {
    try {
      const formControl = this.injector.get(NgControl);
      switch (formControl.constructor) {
        case NgModel: {
          const { control, update } = formControl as NgModel;

          this.control = control;

          this.control.valueChanges
            .pipe(
              tap((value: T) => update.emit(value)),
              takeUntil(this.destroy)
            )
            .subscribe();

          this.control.setErrors([]);
          this.control.markAsPristine();
          this.control.markAsUntouched();
          break;
        }
        case FormControlName: {
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        }
        default: {
          this.control = (formControl as FormControlDirective).form as FormControl;
          break;
        }
      }
    } catch (error) {
      this.control = new FormControl();
    }
  }

  displayFormat(item) {
    return this.displayKeys.map(key => item[key]).join(this.displayKeySeparator);
  }
}
