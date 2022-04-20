import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Telerik Kendo.UI
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';

//Componentes
import { CaixaDialogoComponent } from './caixa-dialogo.component';

@NgModule({
  declarations: [
    //Componentes
    CaixaDialogoComponent
  ],
  exports: [
    //Componentes
    CaixaDialogoComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    DialogModule,
  ]
})
export class CaixaDialogoModule { }
