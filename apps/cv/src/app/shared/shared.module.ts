import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@cv-components/components.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageCountryInnerComponent } from './components/language/language-country-inner/language-country-inner.component';
import { TopbarComponent } from './components/language/topbar/topbar.component';
import { UserInnerComponent } from './components/language/user-inner/user-inner.component';
import { SearchComponent } from './components/search/search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AutocompletePipeMekanssWith } from './pipe/mekanswith.pipe';

@NgModule({
  declarations: [
    ToolbarComponent,
    SearchComponent,
    AutocompletePipeMekanssWith,
    LanguageCountryInnerComponent,
    UserInnerComponent,
    TopbarComponent
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    ToolbarComponent,
    SearchComponent,
    AutocompletePipeMekanssWith,
    UserInnerComponent,
    TopbarComponent
  ],
  providers: [
    SearchComponent,
    NgbActiveModal
  ]
})
export class SharedModule { }
