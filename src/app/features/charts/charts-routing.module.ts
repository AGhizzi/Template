import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { BarChartsComponent } from './bar-charts/bar-charts/bar-charts.component';
import { PieChartsComponent } from './pie-charts/pie-charts/pie-charts.component';
import { LineChartsComponent } from './line-charts/line-charts/line-charts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent
  },
  {
    path: 'bar-charts',
    component: BarChartsComponent
  },
  {
    path: 'pie-charts',
    component: PieChartsComponent
  },
  {
    path: 'line-charts',
    component: LineChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
