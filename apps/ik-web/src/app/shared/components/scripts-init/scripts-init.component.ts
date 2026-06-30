import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { LayoutService, LayoutType } from '@ikweb-layout/core/layout.service';
import { PageInfoService } from '@ikweb-layout/core/page-info.service';
import {
  DrawerComponent,
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  SearchComponent,
  StickyComponent,
  SwapperComponent,
  ToggleComponent,
} from '@ikweb-scripts/components';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ikweb-scripts-init',
  templateUrl: './scripts-init.component.html',
})
export class ScriptsInitComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  private layoutConfig$: Observable<LayoutType>;
  constructor(
    private layout: LayoutService,
    private pageInfo: PageInfoService,
    private router: Router
  ) {
    const initPageInfo = () => {
      setTimeout(() => {
        this.pageInfo.calculateTitle();
        this.pageInfo.calculateBreadcrumbs();
      }, 10);
    };

    initPageInfo();
    this.router.events.pipe(filter((event) => event instanceof ResolveEnd)).subscribe(initPageInfo);
  }

  ngOnInit(): void {
    this.layoutConfig$ = this.layout.layoutConfigSubject.asObservable();
    const layoutUpdateSubscription = this.layoutConfig$.subscribe(() => {
      this.pluginsInitialization();
    });
    this.unsubscribe.push(layoutUpdateSubscription);
  }

  pluginsInitialization() {
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
      SwapperComponent.bootstrap();
      SearchComponent.bootstrap();
    }, 200);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
function initPageInfo(): any {
  throw new Error('Function not implemented.');
}
