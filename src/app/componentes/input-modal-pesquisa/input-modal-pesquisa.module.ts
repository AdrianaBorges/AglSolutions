import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

//Telerik Kendo.UI
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { InputsModule } from '@progress/kendo-angular-inputs';

//COMPONENTES MODULES
import { ModalPesquisaModule } from '../modal-pesquisa/modal-pesquisa.module';

import { InputModalPesquisaComponent } from './input-modal-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalPesquisaModule,

    //Kendo UI
    TooltipModule,
    InputsModule,
  ],
  declarations: [InputModalPesquisaComponent],
  exports: [InputModalPesquisaComponent]
})
export class InputModalPesquisaModule { }
