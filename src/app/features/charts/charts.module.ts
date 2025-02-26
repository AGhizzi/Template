import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts/charts.component';
import { BarChartsComponent } from './bar-charts/bar-charts/bar-charts.component';
import { PieChartsComponent } from './pie-charts/pie-charts/pie-charts.component';
import { LineChartsComponent } from './line-charts/line-charts/line-charts.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartsComponent,
    BarChartsComponent,
    PieChartsComponent,
    LineChartsComponent
  ]
})
export class ChartsModule { }
