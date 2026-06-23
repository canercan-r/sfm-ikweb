import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl
} from '@angular/forms';
import { DefaultLayoutConfig } from '@ikweb-layout/core/default-layout.config';
import { IgxInputGroupType } from '@infragistics/igniteui-angular';

@Component({
  selector: 'ikweb-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrl: './date-time-picker.component.scss'
})
export class DateTimePickerComponent
  implements ControlValueAccessor, OnInit {

  @Input() inputGroupType?: IgxInputGroupType =
    DefaultLayoutConfig.main.inputGroupType;

  @Input() label!: string;
  @Input() name?: string;
  @Input() formButton?: boolean;
  @Input() required?: boolean;
  disabled = false;

  @Output() valueChange = new EventEmitter<Date>();

  @ViewChild('overlayTemplate')
  overlayTemplate!: TemplateRef<any>;

  overlayRef?: OverlayRef;

  control?: FormControl;

  private valueDate: Date | null = null;
  displayValue = '';

  draftDate: Date | null = null;
  draftHour = 0;
  draftMinute = 0;

  visibleHours: number[] = [];
  visibleMinutes: number[] = [];

  readonly MINUTE_STEP = 1;

  private touchStartY = 0;
  private lastTouchMoveY = 0;
  private TOUCH_STEP_PX = 20;

  private isMouseDown = false;
  private mouseStartY = 0;
  private lastMouseMoveY = 0;
  private MOUSE_STEP_PX = 15;

  trackOffsetHour = 0;
  trackOffsetMinute = 0;
  readonly ITEM_HEIGHT = 32;

  private onChange: (v: Date | null) => void = () => { };
  private onTouched: () => void = () => { };

  private lastTouchDirection: 1 | -1 | 0 = 0;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Self() private readonly ngCtrl: NgControl
  ) {
    if (!ngCtrl) {
      throw new Error(
        'lib-date-time-picker component formControlName veya ngModel olmadan kullanılamaz'
      );
    }

    ngCtrl.valueAccessor = this;
  }

  ngOnInit(): void {
    if (this.ngCtrl?.control) {
      this.control = this.ngCtrl.control as FormControl;
    }

    this.updateVisibleFromDraft();
  }

  writeValue(value: Date | null): void {
    if (!value) {
      this.valueDate = null;
      this.displayValue = '';
      return;
    }

    this.valueDate = new Date(value);
    this.updateDisplayFromValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get isEmptyRequired(): boolean {
    return !!(
      this.control &&
      this.control.hasError('required') &&
      (this.control.touched || this.control.dirty)
    );
  }

  open(origin: HTMLElement): void {
    if (this.overlayRef || this.disabled) return;

    const base = this.valueDate ?? new Date();

    this.draftDate = new Date(base);
    this.draftHour = base.getHours();
    this.draftMinute = base.getMinutes();
    this.updateVisibleFromDraft();

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 4
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -4
        }
      ])
      .withFlexibleDimensions(false)
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this.overlayRef.backdropClick()
      .subscribe(() => this.close());

    this.overlayRef.attach(
      new TemplatePortal(
        this.overlayTemplate,
        this.viewContainerRef
      )
    );
  }

  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  onDateSelected(event: Date | Date[]): void {
    const date = Array.isArray(event) ? event[0] : event;
    if (!(date instanceof Date)) return;

    this.draftDate = new Date(date);
  }

  onWheel(event: WheelEvent, type: 'hour' | 'minute'): void {
    event.preventDefault();

    this.trackOffsetHour = 0;
    this.trackOffsetMinute = 0;

    const delta = event.deltaY > 0 ? 1 : -1;

    if (type === 'hour') {
      this.draftHour = (this.draftHour + delta + 24) % 24;
    }

    if (type === 'minute') {
      this.draftMinute =
        (this.draftMinute + delta * this.MINUTE_STEP + 60) % 60;
    }

    this.updateVisibleFromDraft();
  }

  private updateVisibleFromDraft(): void {
    this.updateVisibleHours();
    this.updateVisibleMinutes();
  }

  private updateVisibleHours(): void {
    const h = this.draftHour;
    this.visibleHours = [
      (h + 22) % 24,
      (h + 23) % 24,
      h,
      (h + 1) % 24,
      (h + 2) % 24
    ];
  }

  private updateVisibleMinutes(): void {
    const m = this.draftMinute;
    const s = this.MINUTE_STEP;

    this.visibleMinutes = [
      (m - 2 * s + 60) % 60,
      (m - s + 60) % 60,
      m,
      (m + s) % 60,
      (m + 2 * s) % 60
    ];
  }

  apply(): void {
    if (!this.draftDate) return;

    const result = new Date(this.draftDate);
    result.setHours(this.draftHour, this.draftMinute, 0, 0);

    this.valueDate = result;
    this.updateDisplayFromValue();

    this.onChange(result);
    this.onTouched();
    this.valueChange.emit(result);

    this.close();
  }

  private updateDisplayFromValue(): void {
    if (!this.valueDate) return;

    this.displayValue =
      `${this.valueDate.toLocaleDateString()} ` +
      `${this.valueDate.getHours().toString().padStart(2, '0')}:` +
      `${this.valueDate.getMinutes().toString().padStart(2, '0')}`;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
    this.lastTouchMoveY = this.touchStartY;
    this.lastTouchDirection = 0;
  }

  onTouchMove(
    event: TouchEvent,
    type: 'hour' | 'minute'
  ): void {
    event.preventDefault();

    this.trackOffsetHour = 0;
    this.trackOffsetMinute = 0;

    const currentY = event.touches[0].clientY;
    const deltaY = this.lastTouchMoveY - currentY;

    const direction = deltaY > 0 ? 1 : -1;

    if (
      this.lastTouchDirection !== 0 &&
      direction !== this.lastTouchDirection
    ) {
      this.lastTouchMoveY = currentY;
      this.lastTouchDirection = direction;
      return;
    }

    if (Math.abs(deltaY) < this.TOUCH_STEP_PX) return;

    if (type === 'hour') {
      this.draftHour = (this.draftHour + direction + 24) % 24;
    } else {
      this.draftMinute =
        (this.draftMinute + direction * this.MINUTE_STEP + 60) % 60;
    }

    this.lastTouchMoveY = currentY;
    this.lastTouchDirection = direction;

    this.updateVisibleFromDraft();
  }


  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isMouseDown = true;
    this.mouseStartY = event.clientY;
    this.lastMouseMoveY = event.clientY;
  }

  onMouseMove(
    event: MouseEvent,
    type: 'hour' | 'minute'
  ): void {
    if (!this.isMouseDown) return;

    this.trackOffsetHour = 0;
    this.trackOffsetMinute = 0;

    const currentY = event.clientY;
    const deltaY = this.lastMouseMoveY - currentY;

    if (Math.abs(deltaY) < this.MOUSE_STEP_PX) return;

    const direction = deltaY > 0 ? 1 : -1;

    if (type === 'hour') {
      this.draftHour = (this.draftHour + direction + 24) % 24;
    }

    if (type === 'minute') {
      this.draftMinute =
        (this.draftMinute + direction * this.MINUTE_STEP + 60) % 60;
    }

    this.lastMouseMoveY = currentY;
    this.updateVisibleFromDraft();
  }

  onMouseUp(): void {
    this.isMouseDown = false;
  }

  selectValue(
    value: number,
    type: 'hour' | 'minute',
    index: number
  ): void {
    const CENTER_INDEX = 2;
    const steps = index - CENTER_INDEX;

    if (steps === 0) return;

    const stepDirection = steps > 0 ? 1 : -1;
    const stepCount = Math.abs(steps);

    let currentStep = 0;

    const interval = setInterval(() => {
      if (type === 'hour') {
        this.draftHour = (this.draftHour + stepDirection + 24) % 24;
      } else {
        this.draftMinute =
          (this.draftMinute + stepDirection * this.MINUTE_STEP + 60) % 60;
      }

      this.updateVisibleFromDraft();
      currentStep++;

      if (currentStep >= stepCount) {
        clearInterval(interval);
      }
    }, 90);
  }

  stepValue(
    type: 'hour' | 'minute',
    direction: 1 | -1
  ): void {
    this.trackOffsetHour = 0;
    this.trackOffsetMinute = 0;

    if (type === 'hour') {
      this.draftHour = (this.draftHour + direction + 24) % 24;
    } else {
      this.draftMinute =
        (this.draftMinute + direction * this.MINUTE_STEP + 60) % 60;
    }

    this.updateVisibleFromDraft();
  }

}
