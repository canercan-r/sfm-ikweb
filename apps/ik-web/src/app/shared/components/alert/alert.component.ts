import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorType, ContextualColorType, FontSizeType, SymbolSizeType } from '@lib-common';

@Component({
  selector: 'ikweb-alert',
  template: `
    <div class="alert {{solid ? '' : 'alert-' + color}} bg-{{mix}}-{{solid ? color : ''}}-{{percentage}} d-flex align-items-center border-0">
      <div *ngIf="symbol != null" class="symbol symbol-35px symbol-circle me-4">
        <div class="symbol-label bg-dark fs-2 fw-semibold text-white">{{symbol}}</div>
      </div>
      <div *ngIf="icon" class="symbol {{ size ? 'symbol-' + size : '' }}">
        <span class="symbol-label {{ bglightcolor ? 'bg-light-' + bglightcolor : '' }} {{ bgcolor ? 'text-inverse-' + bgcolor : '' }} {{ bgcolor ? 'bg-' + bgcolor : '' }} {{labelclass}}">
          <i class="{{ icon }} fs-{{iconsize}} text-{{color}} lh-1"></i>
        </span>
      </div>
      <div class="d-flex flex-column" [ngClass]="{ 'ms-3': icon || symbol }">
        <h4 *ngIf="title" class="mb-1 fs-2 fw-bolder {{symbol ? 'text-dark' : 'text' + color}}">{{title | translate}}</h4>
        <span [innerHTML]="message | translate: {
          alertParam1: param1, alertParam2: param2, alertParam3: param3}"></span>

        <div *ngIf="btnText" class="d-flex align-items-center w-100 mt-1">
          <ion-button fill="clear" mode="ios" class="btn btn-link fw-bold h-20px" [ngClass]="color == 'warning' ? '' : 'text-white'" (click)="click()">
            <span class="svg-icon svg-icon-2 me-2" [ngClass]="color == 'warning' ? 'svg-icon-primary' : 'svg-icon-white'" [inlineSVG]="btnIcon"
              [cacheSVG]="true"></span>
            <span [translate]="btnText"></span>
          </ion-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      display: block;
    }
  `],
})
export class AlertComponent implements OnInit {
  @Output() clicked = new EventEmitter<void>();

  @Input() color: ColorType = 'primary';
  @Input() bgcolor: ColorType | ContextualColorType;
  @Input() bglightcolor: ColorType | ContextualColorType;
  @Input() icon: string;
  @Input() labelclass: string;
  @Input() iconsize: FontSizeType = '2';
  @Input() size: SymbolSizeType;
  @Input() symbol: string | number;
  @Input() title: string;
  @Input() message: string;
  @Input() solid: boolean = false;
  @Input() percentage: string;
  @Input() mix: string;
  @Input() param1: any;
  @Input() param2: any;
  @Input() param3: any;
  @Input() btnIcon: string;
  @Input() btnText: string;

  @Output() badgeClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  click() {
    this.clicked.emit();
  }
}
