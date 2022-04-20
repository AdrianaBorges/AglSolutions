import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SegurRoutingModule } from './segur-routing.module';

//Telerik Kendo.UI
import { WindowModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogModule } from '@progress/kendo-angular-dialog';
import '@progress/kendo-angular-intl/locales/pt/all';

//COMPONENTES MODULES
import { AguardeCarregandoModule } from '../../componentes/aguarde-carregando/aguarde-carregando.module';
import { CadastroBarraAcaoModule } from '../../componentes/cadastro-barra-acao/cadastro-barra-acao.module';
import { CadastroTabModule } from '../../componentes/cadastro-tab/cadastro-tab.module';
import { ApiSelectModule } from '../../componentes/api-select/api-select.module';
import { CabecalhoBreadcrumbModule } from '../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.module'
import { CabecalhoSistemaModule } from '../../componentes/cabecalho-sistema/cabecalho-sistema.module';
import { FiltroMultiselectModule } from '../../componentes/filtro-multiselect/filtro-multiselect.module';
import { FormControlAlertaErroApiModule } from '../../componentes/form-control-alerta-erro-api/form-control-alerta-erro-api.module';
import { GridPesquisaModule } from '../../componentes/grid-pesquisa/grid-pesquisa.module';
import { InputModalPesquisaModule } from '../../componentes/input-modal-pesquisa/input-modal-pesquisa.module';
import { ModalPesquisaModule } from '../../componentes/modal-pesquisa/modal-pesquisa.module';
import { MenuSistemaModule } from '../../componentes/menu-sistema/menu-sistema.module';
import { CaixaDialogoModule } from '../../componentes/caixa-dialogo/caixa-dialogo.module';

//Cadastros: usuarios
import { CrudeUsuariosListagemComponent } from './ui/crude/usuario/crude-usuario-listagem/crude-usuario-listagem.component';
import { CrudeTipoUsuarioDetalheComponent } from './ui/crude/tipo-usuario/crude-tipo-usuario-detalhe/crude-tipo-usuario-detalhe.component';
import { CrudeTipoUsuarioListagemComponent } from './ui/crude/tipo-usuario/crude-tipo-usuario-listagem/crude-tipo-usuario-listagem.component';
import { CrudeTipoMenuOpcaoDetalheComponent } from './ui/crude/tipo-menu-opcao/crude-tipo-menu-opcao-detalhe/crude-tipo-menu-opcao-detalhe.component';
import { CrudeTipoMenuOpcaoListagemComponent } from './ui/crude/tipo-menu-opcao/crude-tipo-menu-opcao-listagem/crude-tipo-menu-opcao-listagem.component';
import { TabsUsuarioComponent } from './ui/crude/usuario/tabs-usuario/tabs-usuario.component';
import { CrudeUsuariosDoGrupoListagemComponent } from './ui/crude/usuarios-do-grupo/crude-usuarios-do-grupo-listagem/crude-usuarios-do-grupo-listagem.component';
import { CrudeUsuarioDetalheComponent } from './ui/crude/usuario/crude-usuario-detalhe/crude-usuario-detalhe.component';
import { CrudeProgramaListagemComponent } from './ui/crude/programa/crude-programa-listagem/crude-programa-listagem.component';
import { CrudeProgramaDetalheComponent } from './ui/crude/programa/crude-programa-detalhe/crude-programa-detalhe.component';
import { CrudeProgramaNivelDetalheComponent } from './ui/crude/programa-nivel/crude-programa-nivel-detalhe/crude-programa-nivel-detalhe.component';
import { CrudeProgramaNivelListagemComponent } from './ui/crude/programa-nivel/crude-programa-nivel-listagem/crude-programa-nivel-listagem.component';
import { CrudeSegurancaProgramaListagemComponent } from './ui/crude/seguranca-programa/crude-seguranca-programa-listagem/crude-seguranca-programa-listagem.component';
import { CrudeSegurancaProgramaDetalheComponent } from './ui/crude/seguranca-programa/crude-seguranca-programa-detalhe/crude-seguranca-programa-detalhe.component';
import { CrudeUsuariosDoGrupoDetalheComponent } from './ui/crude/usuarios-do-grupo/crude-usuarios-do-grupo-detalhe/crude-usuarios-do-grupo-detalhe.component';
import { TabsGrupoDeUsuarioComponent } from './ui/crude/grupo-de-usuario/tabs-grupo-de-usuario/tabs-grupo-de-usuario.component';
import { CrudeGrupoDeUsuarioListagemComponent } from './ui/crude/grupo-de-usuario/crude-grupo-de-usuario-listagem/crude-grupo-de-usuario-listagem.component';
import { CrudeGrupoDeUsuarioDetalheComponent } from './ui/crude/grupo-de-usuario/crude-grupo-de-usuario-detalhe/crude-grupo-de-usuario-detalhe.component';
import { CrudeGruposDoUsuarioListagemComponent } from './ui/crude/grupos-do-usuario/crude-grupos-do-usuario-listagem/crude-grupos-do-usuario-listagem.component';
import { CrudeGruposDoUsuarioDetalheComponent } from './ui/crude/grupos-do-usuario/crude-grupos-do-usuario-detalhe/crude-grupos-do-usuario-detalhe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    SegurRoutingModule,

    //Telerik Kendo.UI
    LayoutModule,
    WindowModule,
    PopupModule,
    ButtonsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    InputsModule,
    IntlModule,
    DateInputsModule,
    TooltipModule,
    DropDownsModule,
    DialogModule,

    //COMPONENTES MODULES
    AguardeCarregandoModule,
    CadastroBarraAcaoModule,
    CadastroTabModule,
    ApiSelectModule,
    CabecalhoBreadcrumbModule,
    CabecalhoSistemaModule,
    FiltroMultiselectModule,
    FormControlAlertaErroApiModule,
    GridPesquisaModule,
    InputModalPesquisaModule,
    ModalPesquisaModule,
    MenuSistemaModule,
    CaixaDialogoModule,
  ],
  declarations: [
    CrudeUsuariosListagemComponent,
    CrudeTipoUsuarioDetalheComponent,
    CrudeTipoUsuarioListagemComponent,
    CrudeTipoMenuOpcaoDetalheComponent,
    CrudeTipoMenuOpcaoListagemComponent,
    TabsUsuarioComponent,
    TabsGrupoDeUsuarioComponent,
    CrudeGrupoDeUsuarioListagemComponent,
    CrudeGrupoDeUsuarioDetalheComponent,
    CrudeUsuariosDoGrupoListagemComponent,
    CrudeUsuariosDoGrupoDetalheComponent,
    CrudeGruposDoUsuarioListagemComponent,
    CrudeGruposDoUsuarioDetalheComponent,
    CrudeUsuarioDetalheComponent,
    CrudeProgramaListagemComponent,
    CrudeProgramaDetalheComponent,
    CrudeProgramaNivelDetalheComponent,
    CrudeProgramaNivelListagemComponent,
    CrudeSegurancaProgramaListagemComponent,
    CrudeSegurancaProgramaDetalheComponent
  ]
})
export class SegurModule { }
