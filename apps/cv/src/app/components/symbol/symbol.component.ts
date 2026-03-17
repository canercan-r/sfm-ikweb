import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cv-symbol',
  template: `
    <span class="symbol symbol-{{radius}} symbol-{{size}} symbol-{{ratios}} symbol-md-{{sizemd}} {{symbolclass}}">
      <ng-container [ngSwitch]="type">
        <img *ngSwitchCase="'img'" [src]="img" class="{{imgclass}}" [alt]="imgalt" />

        <span *ngSwitchCase="'bgimg'" class="symbol-label bg-{{bgcolor}} {{bgclass}}" [style.background-image]="'url(' + bgimg + ')'"></span>

        <span *ngSwitchCase="'label'" class="symbol-label fw-{{fw}} bg-{{bgcolor}} text-inverse-{{bgcolor}} text-{{transform}}">
          {{ label1.charAt(0) }}{{ label2.charAt(0) }}
        </span>

        <span *ngSwitchCase="'icon'" class="symbol-label bg-{{bgcolor}}">
          <span class="svg-icon svg-icon-{{fs}} svg-icon-{{color}}">
            <i class="{{ icon }}"></i>
          </span>
        </span>

        <span *ngSwitchCase="'svgicon'" class="symbol-label">
          <span class="svg-icon-{{fs}} svg-icon-{{color}}" [inlineSVG]="'assets/icons/' + icon + '.svg'" [cacheSVG]="true"></span>
        </span>

        <span *ngSwitchCase="'svg'" class="symbol-label">
          <span class="svg-icon-{{fs}} svg-icon-{{color}}" [inlineSVG]="svg" [cacheSVG]="true"></span>
        </span>
      </ng-container>
      <span
        *ngIf="badge"
        (click)="badgeClick()"
        class="symbol-badge badge badge-circle bg-{{color}} top-100 start-100 border border-color-white border-2 m-n2">
          <span
            class="svg-icon svg-icon-white"
            [inlineSVG]="'assets/icons/camera-2-outline.svg'"
            [cacheSVG]="true"
          ></span>
      </span>
    </span>
  `,
  styles: [``],
})
export class SymbolComponent implements OnInit {
  @Input() type: 'img' | 'bgimg' | 'label' | 'icon' | 'svgicon' | 'svg';
  @Input() img: string;
  @Input() bgimg: string;
  @Input() icon: string;
  @Input() svg: string;
  @Input() ratios: '2by3' | '2by4' | '4by2' | '1by3';
  @Input() bgclass: string;
  @Input() imgclass: 'object-fit-contain' | 'object-fit-fill' | 'object-fit-cover' | 'object-fit-scale-down';
  @Input() symbolclass: string;
  @Input() imgalt: string;

  @Input() label1: string;
  @Input() label2: string;

  @Input() badge = false;
  @Input() radius: 'unknown' | 'circle' | 'square' = 'unknown';
  @Input() fs: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '2x' | '3x' | '4x' | '5x' = '2';
  @Input() fw: 'lighter' | 'light' | 'normal' | 'semibold' | 'bold' | 'bolder' | 'boldest' = 'semibold';
  @Input() transform: 'none' | 'capitalize' | 'lowercase' | 'uppercase' = 'uppercase';
  @Input() size: 'unknown' | '20px' | '25px' | '30px' | '35px' | '40px' | '45px' | '50px' | '55px' | '60px' | '65px' | '70px' | '75px' | '100px' | '125px' | '150px' | '160px' | '175px' | '200px' | '225px' | '250px' | '275px' | '300px' | '325px' | '350px' | '375px' | '400px';
  @Input() sizemd: 'unknown' | '20px' | '25px' | '30px' | '35px' | '40px' | '45px' | '50px' | '55px' | '60px' | '65px' | '70px' | '75px' | '100px' | '125px' | '150px' | '160px' | '175px' | '200px' | '225px' | '250px' | '275px' | '300px' | '325px' | '350px' | '375px' | '400px';
  @Input() bgcolor: 'primary' | "secondary" | "light" | 'success' | 'info' | 'warning' | 'danger' | "dark" | 'blue' | 'red' | 'yellow' | 'orange' | 'green' | 'white' | 'transparent' = 'transparent';
  @Input() color: 'primary' | "secondary" | "light" | 'success' | 'info' | 'warning' | 'danger' | "dark" | 'blue' | 'red' | 'yellow' | 'orange' | 'green' | 'current' = 'dark';

  @Output() badgeClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  badgeClick() {
    this.badgeClicked.emit();
  }
}
