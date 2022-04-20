import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoSistemaComponent } from './cabecalho-sistema.component';

//Componentes
import { UsuAlterarSenhaModule } from './../usu-alterar-senha/usu-alterar-senha.module';

//Telerik Kendo.UI
import { PopupModule } from '@progress/kendo-angular-popup';
import { LayoutModule } from '@progress/kendo-angular-layout';
//import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';

@NgModule({
  imports: [
    CommonModule,
    PopupModule,
    LayoutModule,
    //DialogModule,
    ButtonModule,
    UsuAlterarSenhaModule
  ],
  declarations: [CabecalhoSistemaComponent],
  exports: [CabecalhoSistemaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CabecalhoSistemaModule { }
