import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirm } from '@lib-common';

@Component({
  selector: 'lib-confirmation-dialog',
  template: `
  <div class="position-relative d-flex flex-column w-100 h-100">
    <!-- Dismiss button -->
    <ng-container *ngIf="data.dismissible">
      <div class="position-absolute top-0 end-0 pt-4 pe-4">
        <button class="btn btn-icon btn-sm btn-color-gray-700 btn-active-light-primary rounded" mat-icon-button [matDialogClose]="undefined">
          <i class="fa-solid fa-xmark fs-3"></i>
        </button>
      </div>
    </ng-container>

    <!-- Content -->
    <div class="d-flex flex-column flex-md-row flex-auto align-items-center align-items-md-start p-8 pb-6 pb--md-8">
      <!-- Icon -->
      <ng-container *ngIf="data.icon.show">
        <div class="d-flex flex-0 align-items-center justify-content-center w-50px h-50px me-md-6 rounded-circle"
        [ngClass]="{
          'text-primary bg-primary-100': data.icon.color === 'primary',
          'text-accent bg-accent-100': data.icon.color === 'accent',
          'text-warn bg-warn-100': data.icon.color === 'warn',
          'text-gray bg-gray-100': data.icon.color === 'basic',
          'text-blue bg-blue-100': data.icon.color === 'info',
          'text-green bg-green-100': data.icon.color === 'success',
          'text-yellow bg-yellow-100': data.icon.color === 'warning',
          'text-red bg-red-100': data.icon.color === 'danger'
          }">
          <i class="{{data.icon.name}} text-current fs-1 animate__animated" [ngClass]="data.icon.color === 'success' ? 'animate__heartBeat' : 'animate__shakeX'"></i>
        </div>
      </ng-container>

      <ng-container *ngIf="data.title || data.message">
        <div
          class="d-flex flex-column align-items-center align-items-md-start mt-4 mt-md-0 pe-md-8 text-center text-md-start"
        >
          <!-- Title -->
          <ng-container *ngIf="data.title">
            <div class="fs-2 fw-bold" [innerHTML]="data.title | translate"></div>
          </ng-container>

          <!-- Message -->
          <ng-container *ngIf="data.message">
            <div class="text-gray-700 fs-4 mt-2" [innerHTML]="data.message | translate"></div>
          </ng-container>
        </div>
      </ng-container>
    </div>

    <!-- Actions -->
    <ng-container *ngIf="data.buttons.confirm.show || data.buttons.cancel.show">
      <div class="d-flex align-items-center justify-content-center justify-content-md-end px-6 py-4 bg-gray-100">
        <!-- Cancel -->
        <ng-container *ngIf="data.buttons.cancel.show">
          <button class="btn me-3" mat-button [matDialogClose]="false">
            {{ data.buttons.cancel.label | translate }}
          </button>
        </ng-container>

        <!-- Confirm -->
        <ng-container *ngIf="data.buttons.confirm.show">
          <button class="btn btn-{{data.buttons.confirm.color}}" mat-flat-button [matDialogClose]="true">
            {{ data.buttons.confirm.label | translate }}
          </button>
        </ng-container>
      </div>
    </ng-container>
  </div>
  `,
  styles: [`
    /* language=SCSS */
    .confirmation-dialog-panel {
      .mat-dialog-container {
        padding: 0 !important;
        border-radius: var(--st-border-radius)
      }
    }
    @media (min-width: 960px) {
      .confirmation-dialog-panel {
        width: 32rem;
      }
    }
`],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirm,
    public _dialogRef: MatDialogRef<ConfirmComponent>
  ) { }

  ngOnInit(): void {
  }
}
