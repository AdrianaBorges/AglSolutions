import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//Angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Kendo UI
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
//Rota
//import { CadastroBarraAcaoRoutingRoutingModule } from './cadastro-barra-acao-routing.module';

//COMPONENTE
import { CadastroBarraAcaoComponent } from './cadastro-barra-acao.component';
import { CadastroBarraAcaoBotaoComponent } from './templates/cadastro-barra-acao-botao/cadastro-barra-acao-botao.component';
import { CadastroBarraAcaoContainerBotoesComponent } from './templates/cadastro-barra-acao-container-botoes/cadastro-barra-acao-container-botoes.component';

//COMPONENTES MODULES
import { AguardeCarregandoModule } from '../aguarde-carregando/aguarde-carregando.module';

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

    //Componentes modules
    AguardeCarregandoModule,
  ],
  declarations: [
    CadastroBarraAcaoComponent,
    CadastroBarraAcaoBotaoComponent,
    CadastroBarraAcaoContainerBotoesComponent,
  ],
  exports: [
    CadastroBarraAcaoComponent,
    CadastroBarraAcaoBotaoComponent,
    CadastroBarraAcaoContainerBotoesComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CadastroBarraAcaoModule { }
