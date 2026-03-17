import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-loading',
  template: `
    <div class="page-loading" [class.is-loading]="isLoading">
      <span class="svg-icon svg-icon-20x  " [inlineSVG]="'assets/misc/loading.svg'" [cacheSVG]="true"></span>
      <!--
        <mat-progress-spinner mode="indeterminate" [strokeWidth]="2" [diameter]="64 * size"></mat-progress-spinner>
      -->
    </div>
  `,
  styles: [`
    :host ::ng-deep { }
  `],
})
export class LoadingComponent implements OnInit {
  @Input() isLoading = false;
  @Input() size = 1

  constructor() { }

  ngOnInit(): void { }
}
