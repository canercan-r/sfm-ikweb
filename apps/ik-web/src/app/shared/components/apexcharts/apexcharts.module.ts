import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexArea5Component } from './area5/area5.component';
import { ApexArea6Component } from './area6/area6.component';
import { ApexArea7Component } from './area7/area7.component';
import { ApexColumn1Component } from './column1/column1.component';
import { ApexColumn4Component } from './column4/column4.component';
import { ApexColumn7Component } from './column7/column7.component';
import { ApexBar1Component } from './bar1/bar1.component';
import { ApexBar2Component } from './bar2/bar2.component';
import { ApexBar6Component } from './bar6/bar6.component';
import { ApexMixed1Component } from './mixed1/mixed1.component';
import { ApexMixed2Component } from './mixed2/mixed2.component';
import { ApexMixed3Component } from './mixed3/mixed3.component';
import { ApexMixed4Component } from './mixed4/mixed4.component';
import { ApexMixed5Component } from './mixed5/mixed5.component';
import { ApexPie1Component } from './pie1/pie1.component';
import { ApexPie2Component } from './pie2/pie2.component';
import { ApexPie5Component } from './pie5/pie5.component';

const Components = [
  ApexArea5Component,
  ApexArea6Component,
  ApexArea7Component,
  ApexColumn1Component,
  ApexColumn4Component,
  ApexColumn7Component,
  ApexBar1Component,
  ApexBar2Component,
  ApexBar6Component,
  ApexMixed1Component,
  ApexMixed2Component,
  ApexMixed3Component,
  ApexMixed4Component,
  ApexMixed5Component,
  ApexPie1Component,
  ApexPie2Component,
  ApexPie5Component,
];

@NgModule({
  declarations: [Components],
  imports: [NgApexchartsModule],
  exports: [Components],
})
export class ApexChartsModule {}
