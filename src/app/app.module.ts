import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

//componentes externos
//import { StorageServiceModule } from 'angular-webstorage-service';

//Telerik Kenu.UI
import { WindowModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Controle de rotas
import { ValidarPermissaoRotaService } from './validar-permissao-rota.service';

//API-Data-Access
import { ApiGatewayService} from './api-data-access/api-gateway.service';
import { ApiTokenService } from './api-data-access/api-token.service';

//MODULO: Config
import { ConfigEmpresaService } from './modulos/config/api/config-empresa.service';

//MODULO: Segur
import { ApiAutenticacaoService } from './modulos/segur/api/api-autenticacao.service';
import { AutenticacaoUsuarioComponent } from './modulos/segur/ui/autenticacao-usuario/autenticacao-usuario.component';
import { AppRoutingModule } from './app-routing.module';
import { EsqueciSenhaComponent } from './modulos/segur/ui/esqueci-senha/esqueci-senha.component';
import { AlterarSenhaComponent } from './modulos/segur/ui/alterar-senha/alterar-senha.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

//COMPONENTES: internos
import { AguardeCarregandoModule } from './componentes/aguarde-carregando/aguarde-carregando.module';
import { CaixaDialogoModule } from './componentes/caixa-dialogo/caixa-dialogo.module';

//Serviços
import { TelaPrincipalService } from './modulos/principal/tela-principal/tela-principal.service';

import { ModulosModule } from './modulos/modulos.module';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

registerLocaleData(localePt, 'pt', localePtExtra);

@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoUsuarioComponent,
    EsqueciSenhaComponent,
    AlterarSenhaComponent,
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //StorageServiceModule,

    //Modulo tela principal
    ModulosModule,

    // Angular
    BrowserAnimationsModule,

    // Kendo UI
    ButtonsModule,
    AppRoutingModule,
    WindowModule,
    InputsModule,
    DateInputsModule,

    //Compoenntes internos
    AguardeCarregandoModule,
    CaixaDialogoModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    ApiGatewayService,
    ApiTokenService,
    ConfigEmpresaService,
    ApiAutenticacaoService,
    ValidarPermissaoRotaService,
    TelaPrincipalService,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
