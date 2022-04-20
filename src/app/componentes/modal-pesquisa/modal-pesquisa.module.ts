import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Telerik Kendo.UI
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { WindowModule } from '@progress/kendo-angular-dialog';

import { ModalPesquisaComponent } from './modal-pesquisa.component';
import { GridPesquisaModule } from './../grid-pesquisa/grid-pesquisa.module';

@NgModule({
  imports: [
    CommonModule,

    //Telerik Kendo.UI
    ButtonsModule,
    GridModule, PDFModule, ExcelModule,
    WindowModule,
    GridPesquisaModule,
  ],
  declarations: [ModalPesquisaComponent],
  exports: [ModalPesquisaComponent]
})
export class ModalPesquisaModule { }
