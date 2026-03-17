import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LayoutService } from '@cv-layout/core/layout.service';
import { PageInfoService, PageLink } from '@cv-layout/core/page-info.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cv-layout-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('stPageTitle', { static: true }) stPageTitle: ElementRef;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';
  toolbarDisplay = true;

  private unsubscribe: Subscription[] = [];

  showTitle: boolean = true;
  showBC: boolean = true;
  title$: Observable<string>;
  description$: Observable<string>;
  bc$: Observable<Array<PageLink>>;
  pageTitleCssClass: string = '';
  pageTitleDirection: string = 'row';

  @Input() toolbarBg: boolean = this._layout.getProp('toolbar.toolbarBg') as boolean;
  @Input() customTitle: boolean = false;

  constructor(
    private readonly _layout: LayoutService,
    private readonly _page: PageInfoService,
    private readonly _device: DeviceDetectorService,
    private readonly _title: Title,
  ) { }

  ngOnInit(): void {
    // Toolbar
    this.toolbarContainerCssClasses =
      this._layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleAttributes = this._layout.getHTMLAttributes('pageTitle');
    this.toolbarDisplay = this._layout.getProp('toolbar.display') as boolean;
    // Page Title
    this.title$ = this._page.title.asObservable();
    this.description$ = this._page.description.asObservable();
    this.bc$ = this._page.breadcrumbs.asObservable();
    this.showTitle = this._layout.getProp('pageTitle.display') as boolean;
    this.showBC = this._layout.getProp('pageTitle.breadCrumbs') as boolean;
    this.pageTitleCssClass = this._layout.getStringCSSClasses('pageTitle');
    this.pageTitleDirection = this._layout.getProp(
      'pageTitle.direction'
    ) as string;
  }

  ngAfterViewInit() {
    if (this.stPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.stPageTitle.nativeElement
        ) {
          this.stPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  get title(): string {
    return this._title.getTitle();
  }

  get device(): string {
    return this._device.deviceType;
  }

  get orientation(): string {
    return this._device.orientation;
  }
}
