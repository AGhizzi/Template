import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables/tables.component';


@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    TablesComponent
  ]
})
export class TablesModule { }
