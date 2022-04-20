import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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


import { EsegRoutingModule } from './eseg-routing.module';
import { CrudeGrauParentDetalheComponent } from './ui/crude/grau-parent/crude-grau-parent-detalhe/crude-grau-parent-detalhe.component';
import { CrudeGrauParentListagemComponent } from './ui/crude/grau-parent/crude-grau-parent-listagem/crude-grau-parent-listagem.component';
import { CrudeSituacaoVendaDetalheComponent } from './ui/crude/situacao-venda/crude-situacao-venda-detalhe/crude-situacao-venda-detalhe.component';
import { CrudeSituacaoVendaListagemComponent } from './ui/crude/situacao-venda/crude-situacao-venda-listagem/crude-situacao-venda-listagem.component';
import { CrudeTipoCapitalSegDetalheComponent } from './ui/crude/tipo-capital-seg/crude-tipo-capital-seg-detalhe/crude-tipo-capital-seg-detalhe.component';
import { CrudeTipoCapitalSegListagemComponent } from './ui/crude/tipo-capital-seg/crude-tipo-capital-seg-listagem/crude-tipo-capital-seg-listagem.component';
import { CrudeTipoCobrancaSegListagemComponent } from './ui/crude/tipo-cobranca-seg/crude-tipo-cobranca-seg-listagem/crude-tipo-cobranca-seg-listagem.component';
import { CrudeTipoCobrancaSegDetalheComponent } from './ui/crude/tipo-cobranca-seg/crude-tipo-cobranca-seg-detalhe/crude-tipo-cobranca-seg-detalhe.component';
import { CrudeTipoPerContribDetalheComponent } from './ui/crude/tipo-per-contrib/crude-tipo-per-contrib-detalhe/crude-tipo-per-contrib-detalhe.component';
import { CrudeTipoPerContribListagemComponent } from './ui/crude/tipo-per-contrib/crude-tipo-per-contrib-listagem/crude-tipo-per-contrib-listagem.component';
import { CrudeTipoSeguroListagemComponent } from './ui/crude/tipo-seguro/crude-tipo-seguro-listagem/crude-tipo-seguro-listagem.component';
import { CrudeTipoSeguroDetalheComponent } from './ui/crude/tipo-seguro/crude-tipo-seguro-detalhe/crude-tipo-seguro-detalhe.component';
import { CrudeTipoTaxaSegListagemComponent } from './ui/crude/tipo-taxa-seg/crude-tipo-taxa-seg-listagem/crude-tipo-taxa-seg-listagem.component';
import { CrudeTipoTaxaSegDetalheComponent } from './ui/crude/tipo-taxa-seg/crude-tipo-taxa-seg-detalhe/crude-tipo-taxa-seg-detalhe.component';
import { CrudeSeguradoFisicaComponent } from './ui/crude/segurado/crude-segurado-fisica/crude-segurado-fisica.component';
import { CrudeSeguradoJuridicaComponent } from './ui/crude/segurado/crude-segurado-juridica/crude-segurado-juridica.component';
import { CrudeSeguradoListagemComponent } from './ui/crude/segurado/crude-segurado-listagem/crude-segurado-listagem.component';
import { TabsSeguradoFisicaComponent } from './ui/crude/segurado/tabs-segurado-fisica/tabs-segurado-fisica.component';
import { TabsSeguradoJuridicaComponent } from './ui/crude/segurado/tabs-segurado-juridica/tabs-segurado-juridica.component';
import { TabsEstipulanteComponent } from './ui/crude/estipulante/tabs-estipulante/tabs-estipulante.component';
import { CrudeEstipulanteListagemComponent } from './ui/crude/estipulante/crude-estipulante-listagem/crude-estipulante-listagem.component';
import { CrudeEstipulanteDetalheComponent } from './ui/crude/estipulante/crude-estipulante-detalhe/crude-estipulante-detalhe.component';
import { CrudePagadorJuridicaComponent } from './ui/crude/pagador/crude-pagador-juridica/crude-pagador-juridica.component';
import { CrudePagadorFisicaComponent } from './ui/crude/pagador/crude-pagador-fisica/crude-pagador-fisica.component';
import { CrudePagadorListagemComponent } from './ui/crude/pagador/crude-pagador-listagem/crude-pagador-listagem.component';
import { TabsPagadorFisicaComponent } from './ui/crude/pagador/tabs-pagador-fisica/tabs-pagador-fisica.component';
import { TabsPagadorJuridicaComponent } from './ui/crude/pagador/tabs-pagador-juridica/tabs-pagador-juridica.component';
import { TabsGrupoSeguroComponent } from './ui/crude/grupo-seguro/tabs-grupo-seguro/tabs-grupo-seguro.component';
import { CrudeGrupoSeguroListagemComponent } from './ui/crude/grupo-seguro/crude-grupo-seguro-listagem/crude-grupo-seguro-listagem.component';
import { CrudeGrupoSeguroDetalheComponent } from './ui/crude/grupo-seguro/crude-grupo-seguro-detalhe/crude-grupo-seguro-detalhe.component';
import { CrudeRamoSeguroDetalheComponent } from './ui/crude/ramo-seguro/crude-ramo-seguro-detalhe/crude-ramo-seguro-detalhe.component';
import { CrudeRamoSeguroListagemComponent } from './ui/crude/ramo-seguro/crude-ramo-seguro-listagem/crude-ramo-seguro-listagem.component';
import { CrudeSeguradoraListagemComponent } from './ui/crude/seguradora/crude-seguradora-listagem/crude-seguradora-listagem.component';
import { CrudeSeguradoraDetalheComponent } from './ui/crude/seguradora/crude-seguradora-detalhe/crude-seguradora-detalhe.component';
import { TabsSeguradoraComponent } from './ui/crude/seguradora/tabs-seguradora/tabs-seguradora.component';
import { CrudeCoberturaSegListagemComponent } from './ui/crude/cobertura-seg/crude-cobertura-seg-listagem/crude-cobertura-seg-listagem.component';
import { CrudeCoberturaSegDetalheComponent } from './ui/crude/cobertura-seg/crude-cobertura-seg-detalhe/crude-cobertura-seg-detalhe.component';
import { CrudeAssistSegDetalheComponent } from './ui/crude/assist-seg/crude-assist-seg-detalhe/crude-assist-seg-detalhe.component';
import { CrudeAssistSegListagemComponent } from './ui/crude/assist-seg/crude-assist-seg-listagem/crude-assist-seg-listagem.component';
import { CorpModule } from '../corp/corp.module';
import { CrudeProdSegListagemComponent } from './ui/crude/prod-seg/crude-prod-seg-listagem/crude-prod-seg-listagem.component';
import { CrudeProdSegDetalheComponent } from './ui/crude/prod-seg/crude-prod-seg-detalhe/crude-prod-seg-detalhe.component';
import { TabsProdSegComponent } from './ui/crude/prod-seg/tabs-prod-seg/tabs-prod-seg.component';
import { CrudeProdSegCoberturaListagemComponent } from './ui/crude/prod-seg-cobertura/crude-prod-seg-cobertura-listagem/crude-prod-seg-cobertura-listagem.component';
import { CrudeProdSegCoberturaDetalheComponent } from './ui/crude/prod-seg-cobertura/crude-prod-seg-cobertura-detalhe/crude-prod-seg-cobertura-detalhe.component';
import { CrudeProdSegAssistDetalheComponent } from './ui/crude/prod-seg-assist/crude-prod-seg-assist-detalhe/crude-prod-seg-assist-detalhe.component';
import { CrudeProdSegAssistListagemComponent } from './ui/crude/prod-seg-assist/crude-prod-seg-assist-listagem/crude-prod-seg-assist-listagem.component';
import { CrudeProdSegCondPagtoListagemComponent } from './ui/crude/prod-seg-cond-pagto/crude-prod-seg-cond-pagto-listagem/crude-prod-seg-cond-pagto-listagem.component';
import { CrudeProdSegCondPagtoDetalheComponent } from './ui/crude/prod-seg-cond-pagto/crude-prod-seg-cond-pagto-detalhe/crude-prod-seg-cond-pagto-detalhe.component';
import { CrudeProdSegValorDetalheComponent } from './ui/crude/prod-seg-valor/crude-prod-seg-valor-detalhe/crude-prod-seg-valor-detalhe.component';
import { CrudeProdSegValorListagemComponent } from './ui/crude/prod-seg-valor/crude-prod-seg-valor-listagem/crude-prod-seg-valor-listagem.component';
import { CrudeProdSegFormaCobListagemComponent } from './ui/crude/prod-seg-forma-cob/crude-prod-seg-forma-cob-listagem/crude-prod-seg-forma-cob-listagem.component';
import { CrudeProdSegFormaCobDetalheComponent } from './ui/crude/prod-seg-forma-cob/crude-prod-seg-forma-cob-detalhe/crude-prod-seg-forma-cob-detalhe.component';
import { CrudeSorteioSegDetalheComponent } from './ui/crude/sorteio-seg/crude-sorteio-seg-detalhe/crude-sorteio-seg-detalhe.component';
import { CrudeSorteioSegListagemComponent } from './ui/crude/sorteio-seg/crude-sorteio-seg-listagem/crude-sorteio-seg-listagem.component';
import { CrudeCtoCorSegListagemComponent } from './ui/crude/cto-cor-seg/crude-cto-cor-seg-listagem/crude-cto-cor-seg-listagem.component';
import { CrudeCtoCorSegDetalheComponent } from './ui/crude/cto-cor-seg/crude-cto-cor-seg-detalhe/crude-cto-cor-seg-detalhe.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    EsegRoutingModule,
    CorpModule,

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
    CrudeGrauParentDetalheComponent,
    CrudeGrauParentListagemComponent,
    CrudeSituacaoVendaDetalheComponent,
    CrudeSituacaoVendaListagemComponent,
    CrudeTipoCapitalSegDetalheComponent,
    CrudeTipoCapitalSegListagemComponent,
    CrudeTipoCobrancaSegListagemComponent,
    CrudeTipoCobrancaSegDetalheComponent,
    CrudeTipoPerContribDetalheComponent,
    CrudeTipoPerContribListagemComponent,
    CrudeTipoSeguroListagemComponent,
    CrudeTipoSeguroDetalheComponent,
    CrudeTipoTaxaSegListagemComponent,
    CrudeTipoTaxaSegDetalheComponent, CrudeSeguradoFisicaComponent, CrudeSeguradoJuridicaComponent, CrudeSeguradoListagemComponent, TabsSeguradoFisicaComponent, TabsSeguradoJuridicaComponent, TabsEstipulanteComponent, CrudeEstipulanteListagemComponent, CrudeEstipulanteDetalheComponent, CrudePagadorJuridicaComponent, CrudePagadorFisicaComponent, CrudePagadorListagemComponent, TabsPagadorFisicaComponent, TabsPagadorJuridicaComponent, TabsGrupoSeguroComponent, CrudeGrupoSeguroListagemComponent, CrudeGrupoSeguroDetalheComponent, CrudeRamoSeguroDetalheComponent, CrudeRamoSeguroListagemComponent, CrudeSeguradoraListagemComponent, CrudeSeguradoraDetalheComponent, TabsSeguradoraComponent, CrudeCoberturaSegListagemComponent, CrudeCoberturaSegDetalheComponent, CrudeAssistSegDetalheComponent, CrudeAssistSegListagemComponent, CrudeProdSegListagemComponent, CrudeProdSegDetalheComponent, TabsProdSegComponent, CrudeProdSegCoberturaListagemComponent, CrudeProdSegCoberturaDetalheComponent, CrudeProdSegAssistDetalheComponent, CrudeProdSegAssistListagemComponent, CrudeProdSegCondPagtoListagemComponent, CrudeProdSegCondPagtoDetalheComponent, CrudeProdSegValorDetalheComponent, CrudeProdSegValorListagemComponent, CrudeProdSegFormaCobListagemComponent, CrudeProdSegFormaCobDetalheComponent, 
    CrudeSorteioSegDetalheComponent, CrudeSorteioSegListagemComponent, CrudeCtoCorSegListagemComponent, CrudeCtoCorSegDetalheComponent    
  ]
})
export class EsegModule { }
