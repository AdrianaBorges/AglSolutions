import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FinanRoutingModule } from './finan-routing.module';

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

import { CrudeTipoCobrancaListagemComponent } from './ui/crude/tipo-cobranca/crude-tipo-cobranca-listagem/crude-tipo-cobranca-listagem.component';
import { CrudeTipoCobrancaDetalheComponent } from './ui/crude/tipo-cobranca/crude-tipo-cobranca-detalhe/crude-tipo-cobranca-detalhe.component';
import { CrudeBancoListagemComponent } from './ui/crude/banco/crude-banco-listagem/crude-banco-listagem.component';
import { CrudeBancoDetalheComponent } from './ui/crude/banco/crude-banco-detalhe/crude-banco-detalhe.component';
import { CrudeCondPagtoListagemComponent } from './ui/crude/cond-pagto/crude-cond-pagto-listagem/crude-cond-pagto-listagem.component';
import { CrudeCondPagtoDetalheComponent } from './ui/crude/cond-pagto/crude-cond-pagto-detalhe/crude-cond-pagto-detalhe.component';
import { CrudeTipoContaBancoListagemComponent } from './ui/crude/tipo-conta-banco/crude-tipo-conta-banco-listagem/crude-tipo-conta-banco-listagem.component';
import { CrudeTipoContaBancoDetalheComponent } from './ui/crude/tipo-conta-banco/crude-tipo-conta-banco-detalhe/crude-tipo-conta-banco-detalhe.component';
import { CrudeTipoMatriculaCobListagemComponent } from './ui/crude/tipo-matricula-cob/crude-tipo-matricula-cob-listagem/crude-tipo-matricula-cob-listagem.component';
import { CrudeTipoMatriculaCobDetalheComponent } from './ui/crude/tipo-matricula-cob/crude-tipo-matricula-cob-detalhe/crude-tipo-matricula-cob-detalhe.component';
import { CrudeFormaCobrancaDetalheComponent } from './ui/crude/forma-cobranca/crude-forma-cobranca-detalhe/crude-forma-cobranca-detalhe.component';
import { CrudeFormaCobrancaListagemComponent } from './ui/crude/forma-cobranca/crude-forma-cobranca-listagem/crude-forma-cobranca-listagem.component';
import { CrudePortadorListagemComponent } from './ui/crude/portador/crude-portador-listagem/crude-portador-listagem.component';
import { CrudePortadorDetalheComponent } from './ui/crude/portador/crude-portador-detalhe/crude-portador-detalhe.component';
import { CrudeTipoEspecieCrDetalheComponent } from './ui/crude/tipo-especie-cr/crude-tipo-especie-cr-detalhe/crude-tipo-especie-cr-detalhe.component';
import { CrudeTipoEspecieCrListagemComponent } from './ui/crude/tipo-especie-cr/crude-tipo-especie-cr-listagem/crude-tipo-especie-cr-listagem.component';
import { CrudeSituacaoDocCrDetalheComponent } from './ui/crude/situacao-doc-cr/crude-situacao-doc-cr-detalhe/crude-situacao-doc-cr-detalhe.component';
import { CrudeSituacaoDocCrListagemComponent } from './ui/crude/situacao-doc-cr/crude-situacao-doc-cr-listagem/crude-situacao-doc-cr-listagem.component';
import { CrudeOrigemCrDetalheComponent } from './ui/crude/origem-cr/crude-origem-cr-detalhe/crude-origem-cr-detalhe.component';
import { CrudeOrigemCrListagemComponent } from './ui/crude/origem-cr/crude-origem-cr-listagem/crude-origem-cr-listagem.component';
import { CrudeCarteiraCrDetalheComponent } from './ui/crude/carteira-cr/crude-carteira-cr-detalhe/crude-carteira-cr-detalhe.component';
import { CrudeCarteiraCrListagemComponent } from './ui/crude/carteira-cr/crude-carteira-cr-listagem/crude-carteira-cr-listagem.component';
import { CrudeTipoFaturaCRListagemComponent } from './ui/crude/tipo-fatura-cr/crude-tipo-fatura-cr-listagem/crude-tipo-fatura-cr-listagem.component';
import { CrudeTipoFaturaCRDetalheComponent } from './ui/crude/tipo-fatura-cr/crude-tipo-fatura-cr-detalhe/crude-tipo-fatura-cr-detalhe.component';
import { CrudeTipoMovtoCRListagemComponent } from './ui/crude/tipo-movto-cr/crude-tipo-movto-cr-listagem/crude-tipo-movto-cr-listagem.component';
import { CrudeTipoMovtoCRDetalheComponent } from './ui/crude/tipo-movto-cr/crude-tipo-movto-cr-detalhe/crude-tipo-movto-cr-detalhe.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    FinanRoutingModule,

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
    GridPesquisaModule,
    InputModalPesquisaModule,
    ModalPesquisaModule,
    MenuSistemaModule,
    FormControlAlertaErroApiModule,
  ],
  declarations: [
  CrudeTipoCobrancaListagemComponent,
  CrudeTipoCobrancaDetalheComponent,
  CrudeBancoListagemComponent,
  CrudeBancoDetalheComponent,
  CrudeCondPagtoListagemComponent,
  CrudeCondPagtoDetalheComponent,
  CrudeTipoContaBancoListagemComponent,
  CrudeTipoContaBancoDetalheComponent,
  CrudeTipoMatriculaCobDetalheComponent,
  CrudeTipoMatriculaCobListagemComponent,
  CrudeFormaCobrancaDetalheComponent,
  CrudeFormaCobrancaListagemComponent,
  CrudePortadorListagemComponent,
  CrudePortadorDetalheComponent,
  CrudeTipoEspecieCrDetalheComponent,
  CrudeTipoEspecieCrListagemComponent,
  CrudeSituacaoDocCrDetalheComponent,
  CrudeSituacaoDocCrListagemComponent,
  CrudeOrigemCrDetalheComponent,
  CrudeOrigemCrListagemComponent,
  CrudeCarteiraCrDetalheComponent,
  CrudeCarteiraCrListagemComponent,
  CrudeTipoFaturaCRDetalheComponent,
  CrudeTipoFaturaCRListagemComponent,
  CrudeTipoMovtoCRDetalheComponent,
  CrudeTipoMovtoCRListagemComponent]
})
export class FinanModule { }
