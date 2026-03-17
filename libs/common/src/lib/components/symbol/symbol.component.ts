import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  AlertService,
  CAMERA_MODE,
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CameraComponent } from '../camera/camera.component';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'lib-symbol',
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
            <img
              [ngClass]="{
                  'object-fit-contain': objectFit === 'contain',
                  'object-fit-fill': objectFit === 'fill',
                  'object-fit-cover': objectFit === 'cover',
                  'object-fit-scale-down': objectFit === 'scale-down',
                }"
              [src]="img"
              [alt]="imgalt" />
          </ng-container>
          <ng-template #elseTemplate>
            <span
              class="symbol-label
                {{ fw ? 'fw-' + fw : '' }}
                {{ fs ? 'fs-' + fs : '' }}
                {{ bgcolor ? 'bg-' + bgcolor : '' }}
                {{ bglightcolor ? 'bg-light-' + bglightcolor : '' }}
                {{ bgcolor ? 'text-inverse-' + bgcolor : '' }}
                {{ bglightcolor ? 'text-' + bglightcolor : '' }}
                {{ transform ? 'text-' + transform : '' }}
                "
            >
              {{ label1?.charAt(0) | localeTitleCase }}{{ label2?.charAt(0) | localeTitleCase }}
            </span>
          </ng-template>
        </ng-container>

        <ng-container *ngSwitchCase="'imginput'">
          <ng-container *ngIf="img || isCameraChanged || isInputChanged; else elseTemplate">
            <img
              [ngClass]="{
                'object-fit-contain': objectFit === 'contain',
                'object-fit-fill': objectFit === 'fill',
                'object-fit-cover': objectFit === 'cover',
                'object-fit-scale-down': objectFit === 'scale-down',
              }"
              [src]="img"
              [alt]="imgalt"
            />
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
          <div data-st-image-input-action="change">
            <label
              class="btn btn-icon btn-circle btn-color-dark btn-active-color-info bg-light bg-hover-light bg-opacity-50 w-25px h-25px shadow"
              (click)="imageInput.click()"
            >
              <i class="fa-solid fa-image fs-7"></i>
            </label>
            <input #imageInput (change)="imgInputChange($event)" type="file" name="avatar" accept=".png, .jpg, .jpeg" />
          </div>
          <span
            *ngIf="img"
            (click)="imgInputRemove()"
            class="btn btn-icon btn-circle btn-color-dark btn-active-color-danger bg-light bg-hover-light bg-opacity-50 w-25px h-25px shadow"
            data-st-image-input-action="remove"
          >
            <i class="fa-solid fa-xmark fs-7"></i>
          </span>
          <span
            (click)="setWebCam()"
            class="btn btn-icon btn-circle btn-color-dark btn-active-color-indigo bg-light bg-hover-light bg-opacity-50 w-25px h-25px shadow"
            data-st-image-input-action="camera"
          >
            <i class="fa-solid fa-camera fs-7"></i>
          </span>
        </ng-container>

        <span *ngSwitchCase="'bgimg'" class="symbol-label bg-{{ bgcolor }} {{ bgclass }}" [style.background-image]="'url(' + bgimg + ')'"></span>

        <span *ngSwitchCase="'label'" class="symbol-label fw-{{ fw }} bg-{{ bgcolor }} text-inverse-{{ bgcolor }} text-{{ color }} text-{{ transform }}">
          {{ label1?.charAt(0) | localeTitleCase }}{{ label2?.charAt(0) | localeTitleCase }}
        </span>

        <span *ngSwitchCase="'icon'" class="symbol-label bg-light-{{ bglightcolor }} bg-{{ bgcolor }} {{ labelclass }}">
          <i class="{{ iconName }} fs-{{ iconsize }} text-{{ color }} lh-1"></i>
        </span>

        <span *ngSwitchCase="'svg'" class="symbol-label bg-transparent">
          <span class="svg-icon-{{ fs }} svg-icon-{{ color }}" [inlineSVG]="svg" [cacheSVG]="true"></span>
        </span>
      </ng-container>
      <div *ngIf="overlay" class="overlay-layer bg-dark bg-opacity-50">
        <button (click)="imageModal()" class="btn btn-icon btn-icon-light">
          <i class="fa-solid fa-eye fs-1"></i>
        </button>
      </div>
      <span
        *ngIf="badge"
        (click)="badgeClick()"
        class="badge badge-circle bg-{{ badgebgcolor }} bg-hover-{{ badgebghover }} bg-opacity-{{ badgebgopacity }} fw-{{ fw }} fs-{{
          badgesize
        }} symbol-badge translate-middle bottom-{{ bottom }} top-{{ top }} start-{{ start }} position-absolute cursor-pointer"
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
  @Input() iconName: string;
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
  @Input() size: SymbolSizeType = 'fluid';
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
  @Output() imgInputChanged = new EventEmitter<Event>();
  @Output() imgInputRemoved = new EventEmitter<ElementRef>();
  @Output() cameraChanged = new EventEmitter<Event>();

  @ViewChild('imageInput') imageInput: ElementRef;

  camIsReady = false;
  webCamMode = CAMERA_MODE.CAMERA;
  private webCamMediaStream: MediaStream;

  isCameraChanged = false;
  isInputChanged = false;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _translate: TranslateService,
    private readonly _alert: AlertService,
    private readonly _modal: NgbModal
  ) { }

  imgInputChange(ev: Event) {
    this.imgInputChanged.emit(ev);
    this.isInputChanged = true;
  }

  imgInputRemove() {
    this.imgInputRemoved.emit(this.imageInput);
  }

  cameraChange(ev: Event) {
    this.cameraChanged.emit(ev);
    this.isCameraChanged = true;
  }

  badgeClick() {
    this.badgeClicked.emit();
  }

  setWebCam() {
    this.camIsReady = false;
    this.webCamMode == CAMERA_MODE.CAMERA;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const modalRef = this._modal.open(CameraComponent, {
            backdrop: 'static',
            keyboard: false,
          });

          const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
          this.webCamMediaStream = stream;
          video.srcObject = stream;
          this.camIsReady = true;
          video.play();
          this._cdr.detectChanges();

          modalRef.componentInstance.camIsReady = this.camIsReady;
          modalRef.componentInstance.webCamMode = this.webCamMode;
          modalRef.componentInstance.webCamMediaStream = this.webCamMediaStream;

          modalRef.result.then((result) => {
            if (this.webCamMediaStream && this.webCamMediaStream.getTracks().length > 0) {
              this.webCamMediaStream.getTracks()[0].stop();
            }
            this.cameraChange(result);
          });
        })
        .catch((err) => {
          if (err.name === 'NotAllowedError') {
            this._translate.get('Global.KameraIzinHatasi').subscribe((message) => {
              this._alert.show({ title: 'Global.Hata', text: message, type: 'error' });
            });
          } else {
            this._alert.show({
              title: 'Global.Hata',
              text: err.message || 'Global.Hata',
              type: 'error',
            });
          }
        });
    }
  }

  imageModal() {
    const imgModalRef = this._modal.open(ImageComponent, {
      keyboard: true,
      centered: true,
      size: 'lg',
    });
    imgModalRef.componentInstance.label1 = this.label1;
    imgModalRef.componentInstance.label2 = this.label2;
    imgModalRef.componentInstance.img = this.img;
  }
}
