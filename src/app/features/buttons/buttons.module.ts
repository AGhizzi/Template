import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonsRoutingModule } from './buttons-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';


@NgModule({
  imports: [
    CommonModule,
    ButtonsRoutingModule,
    ButtonsComponent
  ]
})
export class ButtonsModule { }
