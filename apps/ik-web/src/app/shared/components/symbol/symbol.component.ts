import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AlertService,
  ColorType,
  ContextualColorType,
  CustomSizeType,
  FontSizeType,
  FontWeightType,
  ObjectFitType,
  OpacityValuesType,
  RadiusType,
  RatiosType,
  SymbolSizeType,
  TextTransformType,
} from '@lib-common';
import { UserInfoService } from '@lib-core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ikweb-symbol',
  template: `
    <span
      class="symbol position-relative
      {{ symbolclass }}
      {{ imginputclass }}
      {{ overlay ? 'overlay overflow-hidden' : '' }}
      {{ pulse ? 'pulse' : '' }}
      {{ radius ? 'symbol-' + radius : '' }}
      {{ size ? 'symbol-' + size : '' }}
      {{ ratios ? 'symbol-' + ratios : '' }}
      {{ sizemd ? 'symbol-md-' + sizemd : '' }}
      {{ pulseColor ? 'symbol-' + pulseColor : '' }}
    "
    >
      <span *ngIf="pulse" class="pulse-ring border-3"></span>
      <ng-container [ngSwitch]="type">
        <ng-container *ngSwitchCase="'img'">
          <ng-container *ngIf="img; else elseTemplate">
            <img class="{{ objectFit }}" [src]="img" [alt]="imgalt" />
          </ng-container>
          <ng-template #elseTemplate>
            <span
              class="symbol-label
            {{ fw ? 'fw-' + fw : '' }}
            {{ fs ? 'fs-' + fs : '' }}
            {{ bgcolor ? 'bg-' + bgcolor : '' }}
            {{ bglightcolor ? 'bg-light-' + bglightcolor : '' }}
            {{ bgcolor ? 'text-inverse-' + bgcolor : '' }}
            {{ transform ? 'text-' + transform : '' }}
            "
            >
              {{ label1?.charAt(0) | localeTitleCase }}{{ label2?.charAt(0) | localeTitleCase }}
            </span>
          </ng-template>
        </ng-container>

        <span
          *ngSwitchCase="'bgimg'"
          class="symbol-label bg-{{ bgcolor }} {{ bgclass }}"
          [style.background-image]="'url(' + bgimg + ')'"
        ></span>

        <span
          *ngSwitchCase="'label'"
          class="symbol-label fw-{{ fw }} bg-{{ bgcolor }} text-inverse-{{ bgcolor }} text-{{
            color
          }} text-{{ transform }}"
        >
          {{ label1?.charAt(0) | localeTitleCase }}{{ label2?.charAt(0) | localeTitleCase }}
        </span>

        <span
          *ngSwitchCase="'icon'"
          class="symbol-label bg-light-{{ bglightcolor }} bg-{{ bgcolor }} {{ labelclass }}"
        >
          <i class="{{ icon }} fs-{{ iconsize }} text-{{ color }} lh-1"></i>
        </span>

        <span *ngSwitchCase="'svg'" class="symbol-label bg-transparent">
          <span
            class="svg-icon-{{ fs }} svg-icon-{{ color }}"
            [inlineSVG]="svg"
            [cacheSVG]="true"
          ></span>
        </span>
      </ng-container>

      <span
        *ngIf="badge"
        (click)="badgeClick()"
        class="badge badge-circle bg-{{ badgebgcolor }} bg-hover-{{ badgebghover }} bg-opacity-{{
          badgebgopacity
        }} fw-{{ fw }} fs-{{ badgesize }} symbol-badge translate-middle bottom-{{ bottom }} top-{{
          top
        }} start-{{ start }} position-absolute cursor-pointer"
      >
        {{ badgeValue }}
        <ng-container *ngIf="badgeIcon">
          <i class="{{ badgeIcon }}"></i>
        </ng-container>
      </span>
    </span>
  `,
  styles: [``],
})
export class SymbolComponent {
  @Input() type: 'img' | 'bgimg' | 'label' | 'icon' | 'svg' | 'imginput';
  @Input() img: string;
  @Input() bgimg: string;
  @Input() icon: string;
  @Input() svg: string;
  @Input() ratios: RatiosType;
  @Input() bgclass: string;
  @Input() objectFit: ObjectFitType;
  @Input() symbolclass: string;
  @Input() imginputclass: string;
  @Input() labelclass: string;
  @Input() imgalt: string;
  @Input() pulse: boolean;

  @Input() label1: string;
  @Input() label2: string;

  @Input() overlay = false;

  @Input() badge = false;
  @Input() badgeValue: number;
  @Input() badgeIcon: string;

  @Input() radius: RadiusType;
  @Input() fs: FontSizeType = '6';
  @Input() badgesize: FontSizeType = '2';
  @Input() iconsize: FontSizeType = '2';
  @Input() fw: FontWeightType = 'semibold';
  @Input() transform: TextTransformType = 'uppercase';
  @Input() size: SymbolSizeType;
  @Input() sizemd: SymbolSizeType;
  @Input() pulseColor: ColorType = 'primary';
  @Input() bgcolor: ColorType | ContextualColorType;
  @Input() bglightcolor: ColorType;
  @Input() badgebgcolor: ColorType;
  @Input() badgebghover: ColorType;
  @Input() badgebgopacity: OpacityValuesType;
  @Input() color: ColorType = 'dark';

  @Input() start: CustomSizeType = '50';
  @Input() top: CustomSizeType = '100';
  @Input() bottom: CustomSizeType = '0';

  @Output() badgeClicked = new EventEmitter<void>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _translate: TranslateService,
    private readonly _alert: AlertService,
    private readonly _modal: NgbModal,
    private readonly _user: UserInfoService
  ) { }

  badgeClick() {
    this.badgeClicked.emit();
  }
}
