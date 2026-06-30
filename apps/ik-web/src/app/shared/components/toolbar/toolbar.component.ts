import {
  AfterViewInit, Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '@ikweb-layout/core/layout.service';
import { PageInfoService, PageLink } from '@ikweb-layout/core/page-info.service';
import { PageStackService } from '@lib-common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ikweb-toolbar',
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
  pagebc$: Observable<Array<PageLink>>;
  pageTitleCssClass: string = '';
  pageTitleDirection: string = 'row';

  @Output() backClicked = new EventEmitter<void>();

  @Input() toolbarBg: boolean;
  @Input() bc$: Observable<Array<PageLink>>;
  @Input() pageheading: string;
  @Input() title: string;
  @Input() backClick: boolean;

  constructor(
    private readonly _router: Router,
    private _route: ActivatedRoute,
    private _pageStack: PageStackService,
    private readonly _layout: LayoutService,
    private readonly _page: PageInfoService,
    private readonly _device: DeviceDetectorService,
  ) { }

  ngOnInit(): void {
    this.toolbarContainerCssClasses =
      this._layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleAttributes = this._layout.getHTMLAttributes('pageTitle');
    this.toolbarDisplay = this._layout.getProp('toolbar.display') as boolean;
    this.toolbarBg = this._layout.getProp('toolbar.toolbarBg') as boolean;
    this.description$ = this._page.description.asObservable();
    this.pagebc$ = this._page.breadcrumbs.asObservable();
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

  routerLink(path: string) {
    this._router.navigate([`${path}`])
  }

  back() {
    const hasSubscribers = (this.backClicked as any).observers?.length > 0;

    if (hasSubscribers) {
      this.backClicked.emit();
    } else {
      this._pageStack.goBack();
    }
  }

  get getTitle(): string {
    return this._route.snapshot.data['title'];
  }

  get device(): string {
    return this._device.deviceType;
  }

  get orientation(): string {
    return this._device.orientation;
  }
}
