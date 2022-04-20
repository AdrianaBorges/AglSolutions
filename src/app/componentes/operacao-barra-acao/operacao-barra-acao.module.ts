import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";

//Angular
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Kendo UI
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
//Rota
//import { CadastroBarraAcaoRoutingRoutingModule } from './cadastro-barra-acao-routing.module';

//COMPONENTE
import { OperacaoBarraAcaoComponent } from "./operacao-barra-acao.component";

//COMPONENTES MODULES
import { AguardeCarregandoModule } from "../aguarde-carregando/aguarde-carregando.module";

@NgModule({
  imports: [
    CommonModule,

    //Rota
    //CadastroBarraAcaoRoutingRoutingModule,

    //Angular
    FormsModule,
    ReactiveFormsModule,

    //kendoUI
    ButtonsModule,
    DialogModule,
    DropDownsModule,

    //Componentes modules
    AguardeCarregandoModule,
  ],
  declarations: [OperacaoBarraAcaoComponent],
  exports: [OperacaoBarraAcaoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class OperacaoBarraAcaoModule {}
