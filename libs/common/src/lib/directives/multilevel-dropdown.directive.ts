import {
  AfterViewInit,
  Directive,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core';
import {
  ConnectedPositioningStrategy,
  HorizontalAlignment,
  IgxDropDownComponent,
  IgxDropDownItemComponent,
  OverlaySettings,
  VerticalAlignment
} from '@infragistics/igniteui-angular';
import { Subject, fromEvent } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[multiLevel]',
  exportAs: 'multiLevel'
})
export class MultiLevelDropDownDirective implements AfterViewInit, OnDestroy {
  @Input() innerDropdown!: IgxDropDownComponent;
  private _dropdowns: IgxDropDownComponent[] = [];
  private isMouseInside = false;
  private isMouseInsideSubmenu = false;
  private _destroy$ = new Subject<void>();

  private _overlaySettings: OverlaySettings = {
    closeOnOutsideClick: false,
    modal: false,
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalStartPoint: HorizontalAlignment.Right,
      horizontalDirection: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Top,
      openAnimation: undefined,
      closeAnimation: undefined
    })
  };

  constructor(private _host: IgxDropDownItemComponent) { }

  public ngAfterViewInit(): void {
    this.add(this.innerDropdown);

    this.innerDropdown.opening
      .pipe(
        take(1),
        map((args) => args.owner.toggleDirective.element)
      )
      .subscribe((element) => {
        fromEvent(element, 'mouseenter')
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
            this.isMouseInsideSubmenu = true;
          });

        fromEvent(element, 'mouseleave')
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
            this.isMouseInsideSubmenu = false;

            setTimeout(() => {
              if (!this.isMouseInside && !this.isMouseInsideSubmenu) {
                this.innerDropdown.close();
              }
            }, 0);
          });
      });

    this.innerDropdown.closed
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.isMouseInsideSubmenu = false;
        this.isMouseInside = false;
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  @HostListener('mouseenter')
  public mouseenter() {
    this.isMouseInside = true;

    if (this.innerDropdown.collapsed) {
      this.innerDropdown.open({
        ...this._overlaySettings,
        target: this._host.element.nativeElement
      });
    }
  }

  @HostListener('mouseleave')
  public mouseleave() {
    this.isMouseInside = false;

    setTimeout(() => {
      if (!this.isMouseInside && !this.isMouseInsideSubmenu) {
        this.innerDropdown.close();
      }
    }, 0);
  }

  @HostListener('click')
  public onClick(): void {
    if (this.innerDropdown && !this.innerDropdown.collapsed) {
      this.innerDropdown.close();
    }
  }

  public handleHoverOut(event: MouseEvent): void {
    const target = event.relatedTarget as HTMLElement;

    const overlayContents = Array.from(
      document.querySelectorAll('.igx-overlay__content')
    ) as HTMLElement[];

    const isInsideOverlay = overlayContents.some(content =>
      content.contains(target)
    );

    const isInsideHost = this._host.element.nativeElement.contains(target);

    const isBackToParent = isInsideHost;

    if (!this.innerDropdown.collapsed && !isInsideOverlay && !isBackToParent) {
      this.innerDropdown.close();
    }

    if (!this.innerDropdown.collapsed && isBackToParent) {
      this.innerDropdown.close();
    }
  }

  public add(dropdown: IgxDropDownComponent): void {
    this._dropdowns.push(dropdown);
  }

  public handleSelection(): void {
    this.closeAll();
  }

  public closeAll(): void {
    this._dropdowns.forEach(dropdown => {
      if (!dropdown.collapsed) {
        dropdown.close();
      }
    });
  }
}
