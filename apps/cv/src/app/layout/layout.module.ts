import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { ComponentsModule } from '../components/components.module';
import { Routing } from '../modules/routing';
import { SharedModule } from '../shared/shared.module';
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { AsideComponent } from './components/aside/aside.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HelpDrawerComponent } from './drawers/help-drawer/help-drawer.component';
import { NotificationsInnerComponent } from './dropdown-inner/notifications-inner/notifications-inner.component';
import { QuickLinksInnerComponent } from './dropdown-inner/quick-links-inner/quick-links-inner.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    QuickLinksInnerComponent,
    HelpDrawerComponent,
    NotificationsInnerComponent,
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    ScriptsInitComponent
  ],
})
export class LayoutModule { }
