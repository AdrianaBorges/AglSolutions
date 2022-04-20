import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Telerik Kendo.UI
import { LayoutModule } from '@progress/kendo-angular-layout';

import { MenuSistemaComponent } from './menu-sistema.component';
import { PanelBarRecursivoComponent } from './panel-bar-recursivo/panel-bar-recursivo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule
  ],
  declarations: [
    MenuSistemaComponent,
    PanelBarRecursivoComponent
  ],
  exports: [
    MenuSistemaComponent,
  ]
})
export class MenuSistemaModule { }
