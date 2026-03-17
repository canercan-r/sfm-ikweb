import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ISearchResult } from '@cv-models/shared';
import { ApiConfiguration } from '@cv-shared/utils/api-config';
import { CINSIYET_TURLERI, ESearchType } from '@lib-common';
import { DataService, IUser, UserInfoService } from '@lib-core';
import { User } from '@mock-api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, filter, map } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'cv-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchButton') _searchButton: MatButton;
  @ViewChild('searchPanel') _searchPanel: TemplateRef<any>;
  @ViewChild('searchContacts') _searchContacts: TemplateRef<any>;

  @Input() toolbarButtonHeightClass: string
  @Input() toolbarButtonIconSizeClass: string
  @Input() searchType: ESearchType;
  @Input() adayDonustur = false;
  @Input() gecisVer = false;
  @Input() showAdayEkleButton = true;
  @Input() showActions = true;

  debounce = 1000;
  minLength = 3;

  results: ISearchResult[];
  searchControl = new FormControl();
  loading = false;

  user: IUser | User;

  private _selected: ISearchResult;

  SearchType = ESearchType;
  Cinsiyet = CINSIYET_TURLERI;

  mode: 'view' | 'edit' = 'view';

  private _overlayRef: OverlayRef;

  constructor(
    public _modal: NgbActiveModal,
    public _user: UserInfoService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _cdr: ChangeDetectorRef,
    private _data: DataService,
  ) {
    this.user = _user.CurrentUser;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounce),
        untilDestroyed(this),
        map((value) => {
          if (!value || value.length === 0 || value.length < this.minLength) {
            this.results = null;
          }
          return value;
        }),
        filter((value) => value && value.length >= this.minLength)
      )
      .subscribe((value) => {
        this.loading = true;
        this._cdr.detectChanges();
        this.search(value)
          .subscribe(
            {
              next: (results: any) => {
                this.results = results;
                this.loading = false;
                this._cdr.detectChanges();
              },
              error: (err) => {
                this.loading = false;
                this._cdr.detectChanges();
              }
            }
          );
      });
  }

  ngOnDestroy(): void {
    this.overlayClose();
  }

  open(): void {
    if (!this._searchPanel || !this._searchButton) {
      return;
    }

    this.mode = 'view';

    if (!this._overlayRef) {
      this._createOverlay();
    }

    this._overlayRef.attach(new TemplatePortal(this._searchPanel, this._viewContainerRef));
  }

  search(searchText: string): Observable<ISearchResult[]> {
    const params = {
      filtre: searchText,
    };
    return this._data.get<ISearchResult[]>(ApiConfiguration.SharedURL + 'GetMusteriler', params);
  }

  select(customer: ISearchResult): void {
    this._selected = customer;
    if (this.adayDonustur) {
      this.searchTypeCloseReturn();
      return;
    }
  }

  clear() {
    this.searchControl.value == ''
  }

  closeModalAndReturn() {
    this._modal.close(this._selected);
  }

  searchTypeCloseReturn(): void {
    this.searchType == this.SearchType.MODAL ? this.closeModalAndReturn() : this.overlayClose();
    return
  }

  private _createOverlay(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'st-backdrop-on-mobile',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._searchButton._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom'
          }
        ])
    });

    // Detach the overlay from the cv on backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }

  modalClose(): void {
    this._modal.dismiss('closed');
  }

  overlayClose() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }
}
