import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FvendaRoutingModule } from './fvenda-routing.module';

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
import { OperacaoBarraAcaoModule } from '../../componentes/operacao-barra-acao/operacao-barra-acao.module';

//UI
import { CrudeCondPagtoVendaDetalheComponent } from './ui/crude/cond-pagto-venda/crude-cond-pagto-venda-detalhe/crude-cond-pagto-venda-detalhe.component';
import { CrudeCondPagtoVendaListagemComponent } from './ui/crude/cond-pagto-venda/crude-cond-pagto-venda-listagem/crude-cond-pagto-venda-listagem.component';
import { CrudeMotivoRejeitaDetalheComponent } from './ui/crude/motivo-rejeita/crude-motivo-rejeita-detalhe/crude-motivo-rejeita-detalhe.component';
import { CrudeMotivoRejeitaListagemComponent } from './ui/crude/motivo-rejeita/crude-motivo-rejeita-listagem/crude-motivo-rejeita-listagem.component';
import { CrudeSituacaoSolicCredListagemComponent } from './ui/crude/situacao-solic-cred/crude-situacao-solic-cred-listagem/crude-situacao-solic-cred-listagem.component';
import { CrudeSituacaoSolicCredDetalheComponent } from './ui/crude/situacao-solic-cred/crude-situacao-solic-cred-detalhe/crude-situacao-solic-cred-detalhe.component';
import { CorpModule } from '../corp/corp.module';
import { CrudeRepresVendaJuridicaDetalheComponent } from './ui/crude/repres-venda/crude-repres-venda-juridica-detalhe/crude-repres-venda-juridica-detalhe.component';
import { CrudeRepresVendaFisicaDetalheComponent } from './ui/crude/repres-venda/crude-repres-venda-fisica-detalhe/crude-repres-venda-fisica-detalhe.component';
import { CrudeRepresVendaListagemComponent } from './ui/crude/repres-venda/crude-repres-venda-listagem/crude-repres-venda-listagem.component';
import { TabsRepresVendaFisicaComponent } from './ui/crude/repres-venda/tabs-repres-venda-fisica/tabs-repres-venda-fisica.component';
import { TabsRepresVendaJuridicaComponent } from './ui/crude/repres-venda/tabs-repres-venda-juridica/tabs-repres-venda-juridica.component';
import { CrudeClienteVendaListagemComponent } from './ui/crude/cliente-venda/crude-cliente-venda-listagem/crude-cliente-venda-listagem.component';
import { CrudeClienteVendaFisicaDetalheComponent } from './ui/crude/cliente-venda/crude-cliente-venda-fisica-detalhe/crude-cliente-venda-fisica-detalhe.component';
import { CrudeClienteVendaJuridicaDetalheComponent } from './ui/crude/cliente-venda/crude-cliente-venda-juridica-detalhe/crude-cliente-venda-juridica-detalhe.component';
import { TabsClienteVendaJuridicaComponent } from './ui/crude/cliente-venda/tabs-cliente-venda-juridica/tabs-cliente-venda-juridica.component';
import { TabsClienteVendaFisicaComponent } from './ui/crude/cliente-venda/tabs-cliente-venda-fisica/tabs-cliente-venda-fisica.component';
import { CrudeAprovaCreditoListagemComponent } from './ui/crude/aprova-credito/crude-aprova-credito-listagem/crude-aprova-credito-listagem.component';
import { CrudeAprovaCreditoAprovaDetalheComponent } from './ui/crude/aprova-credito/crude-aprova-credito-aprova-detalhe/crude-aprova-credito-aprova-detalhe.component';
import { CrudeAprovaCreditoRejeitaDetalheComponent } from './ui/crude/aprova-credito/crude-aprova-credito-rejeita-detalhe/crude-aprova-credito-rejeita-detalhe.component';
import { CrudeSolicitaCreditoReajusteDetalheComponent } from './ui/crude/solicita-credito/crude-solicita-credito-reajuste-detalhe/crude-solicita-credito-reajuste-detalhe.component';
import { CrudeSolicitaCreditoNovoDetalheComponent } from './ui/crude/solicita-credito/crude-solicita-credito-novo-detalhe/crude-solicita-credito-novo-detalhe.component';
import { CrudeSolicitaCreditoListagemComponent } from './ui/crude/solicita-credito/crude-solicita-credito-listagem/crude-solicita-credito-listagem.component';
import { CrudeSituacaoAssTecDetalheComponent } from './ui/crude/situacao-ass-tec/crude-situacao-ass-tec-detalhe/crude-situacao-ass-tec-detalhe.component';
import { CrudeSituacaoAssTecListagemComponent } from './ui/crude/situacao-ass-tec/crude-situacao-ass-tec-listagem/crude-situacao-ass-tec-listagem.component';
import { CrudeOrigemAssTecListagemComponent } from './ui/crude/origem-ass-tec/crude-origem-ass-tec-listagem/crude-origem-ass-tec-listagem.component';
import { CrudeOrigemAssTecDetalheComponent } from './ui/crude/origem-ass-tec/crude-origem-ass-tec-detalhe/crude-origem-ass-tec-detalhe.component';
import { CrudeTipoTecnicoDetalheComponent } from './ui/crude/tipo-tecnico/crude-tipo-tecnico-detalhe/crude-tipo-tecnico-detalhe.component';
import { CrudeTipoTecnicoListagemComponent } from './ui/crude/tipo-tecnico/crude-tipo-tecnico-listagem/crude-tipo-tecnico-listagem.component';
import { CrudeTipoDefeitoDetalheComponent } from './ui/crude/tipo-defeito/crude-tipo-defeito-detalhe/crude-tipo-defeito-detalhe.component';
import { CrudeTipoDefeitoListagemComponent } from './ui/crude/tipo-defeito/crude-tipo-defeito-listagem/crude-tipo-defeito-listagem.component';
import { CrudeDefeitoListagemComponent } from './ui/crude/defeito/crude-defeito-listagem/crude-defeito-listagem.component';
import { CrudeDefeitoDetalheComponent } from './ui/crude/defeito/crude-defeito-detalhe/crude-defeito-detalhe.component';
import { CrudeTipoAssTecDetalheComponent } from './ui/crude/tipo-ass-tec/crude-tipo-ass-tec-detalhe/crude-tipo-ass-tec-detalhe.component';
import { CrudeTipoAssTecListagemComponent } from './ui/crude/tipo-ass-tec/crude-tipo-ass-tec-listagem/crude-tipo-ass-tec-listagem.component';
import { CrudeFamComListagemComponent } from './ui/crude/fam-com/crude-fam-com-listagem/crude-fam-com-listagem.component';
import { CrudeFamComDetalheComponent } from './ui/crude/fam-com/crude-fam-com-detalhe/crude-fam-com-detalhe.component';
import { CrudeFamMatDetalheComponent } from './ui/crude/fam-mat/crude-fam-mat-detalhe/crude-fam-mat-detalhe.component';
import { CrudeFamMatListagemComponent } from './ui/crude/fam-mat/crude-fam-mat-listagem/crude-fam-mat-listagem.component';
import { CrudeGrpEstListagemComponent } from './ui/crude/grp-est/crude-grp-est-listagem/crude-grp-est-listagem.component';
import { CrudeGrpEstDetalheComponent } from './ui/crude/grp-est/crude-grp-est-detalhe/crude-grp-est-detalhe.component';
import { CrudeSolucAssTecListagemComponent } from './ui/crude/soluc-ass-tec/crude-soluc-ass-tec-listagem/crude-soluc-ass-tec-listagem.component';
import { CrudeSolucAssTecDetalheComponent } from './ui/crude/soluc-ass-tec/crude-soluc-ass-tec-detalhe/crude-soluc-ass-tec-detalhe.component';
import { CrudeEspecieItemListagemComponent } from './ui/crude/especie-item/crude-especie-item-listagem/crude-especie-item-listagem.component';
import { CrudeEspecieItemDetalheComponent } from './ui/crude/especie-item/crude-especie-item-detalhe/crude-especie-item-detalhe.component';
import { CrudeCategoriaListagemComponent } from './ui/crude/categoria/crude-categoria-listagem/crude-categoria-listagem.component';
import { CrudeCategoriaDetalheComponent } from './ui/crude/categoria/crude-categoria-detalhe/crude-categoria-detalhe.component';
import { CrudeItemListagemComponent } from './ui/crude/item/crude-item-listagem/crude-item-listagem.component';
import { CrudeItemDetalheComponent } from './ui/crude/item/crude-item-detalhe/crude-item-detalhe.component';
import { CrudeItemLoteSerieListagemComponent } from './ui/crude/item-lote-serie/crude-item-lote-serie-listagem/crude-item-lote-serie-listagem.component';
import { CrudeItemLoteSerieDetalheComponent } from './ui/crude/item-lote-serie/crude-item-lote-serie-detalhe/crude-item-lote-serie-detalhe.component';
import { CrudeAssTecnicaListagemComponent } from './ui/crude/ass-tecnica/crude-ass-tecnica-listagem/crude-ass-tecnica-listagem.component';
import { CrudeAssTecnicaDetalheComponent } from './ui/crude/ass-tecnica/crude-ass-tecnica-detalhe/crude-ass-tecnica-detalhe.component';
import { CrudeAssTecItemListagemComponent } from './ui/crude/ass-tec-item/crude-ass-tec-item-listagem/crude-ass-tec-item-listagem.component';
import { CrudeAssTecItemDetalheComponent } from './ui/crude/ass-tec-item/crude-ass-tec-item-detalhe/crude-ass-tec-item-detalhe.component';
import { TabsAssTecItemComponent } from './ui/crude/ass-tec-item/tabs-ass-tec-item/tabs-ass-tec-item.component';
import { CrudeAssTecItemDefAlegListagemComponent } from './ui/crude/ass-tec-item-def-aleg/crude-ass-tec-item-def-aleg-listagem/crude-ass-tec-item-def-aleg-listagem.component';
import { CrudeAssTecItemDefAlegDetalheComponent } from './ui/crude/ass-tec-item-def-aleg/crude-ass-tec-item-def-aleg-detalhe/crude-ass-tec-item-def-aleg-detalhe.component';
import { CrudeAssTecItemDefConstDetalheComponent } from './ui/crude/ass-tec-item-def-const/crude-ass-tec-item-def-const-detalhe/crude-ass-tec-item-def-const-detalhe.component';
import { CrudeAssTecItemDefConstListagemComponent } from './ui/crude/ass-tec-item-def-const/crude-ass-tec-item-def-const-listagem/crude-ass-tec-item-def-const-listagem.component';
import { CrudeAssTecItemSubsListagemComponent } from './ui/crude/ass-tec-item-subs/crude-ass-tec-item-subs-listagem/crude-ass-tec-item-subs-listagem.component';
import { CrudeAssTecItemSubsDetalheComponent } from './ui/crude/ass-tec-item-subs/crude-ass-tec-item-subs-detalhe/crude-ass-tec-item-subs-detalhe.component';
import { CrudeAssTecItemServDetalheComponent } from './ui/crude/ass-tec-item-serv/crude-ass-tec-item-serv-detalhe/crude-ass-tec-item-serv-detalhe.component';
import { CrudeAssTecItemServListagemComponent } from './ui/crude/ass-tec-item-serv/crude-ass-tec-item-serv-listagem/crude-ass-tec-item-serv-listagem.component';
import { CrudeTecnicoListagemComponent } from './ui/crude/tecnico/crude-tecnico-listagem/crude-tecnico-listagem.component';
import { CrudeTecnicoDetalheComponent } from './ui/crude/tecnico/crude-tecnico-detalhe/crude-tecnico-detalhe.component';
import { CrudeSituacaoCampListagemComponent } from './ui/crude/situacao-camp/crude-situacao-camp-listagem/crude-situacao-camp-listagem.component';
import { CrudeSituacaoCampDetalheComponent } from './ui/crude/situacao-camp/crude-situacao-camp-detalhe/crude-situacao-camp-detalhe.component';
import { CrudeTipoCampanhaListagemComponent } from './ui/crude/tipo-campanha/crude-tipo-campanha-listagem/crude-tipo-campanha-listagem.component';
import { CrudeTipoCampanhaDetalheComponent } from './ui/crude/tipo-campanha/crude-tipo-campanha-detalhe/crude-tipo-campanha-detalhe.component';
import { CrudeTipoIntegraCampListagemComponent } from './ui/crude/tipo-integra-camp/crude-tipo-integra-camp-listagem/crude-tipo-integra-camp-listagem.component';
import { CrudeTipoIntegraCampDetalheComponent } from './ui/crude/tipo-integra-camp/crude-tipo-integra-camp-detalhe/crude-tipo-integra-camp-detalhe.component';
import { CrudeCampanhaDetalheComponent } from './ui/crude/campanha/crude-campanha-detalhe/crude-campanha-detalhe.component';
import { CrudeCampanhaListagemComponent } from './ui/crude/campanha/crude-campanha-listagem/crude-campanha-listagem.component';
import { CrudeCampanhaParamListagemComponent } from './ui/crude/campanha-param/crude-campanha-param-listagem/crude-campanha-param-listagem.component';
import { CrudeCampanhaParamDetalheComponent } from './ui/crude/campanha-param/crude-campanha-param-detalhe/crude-campanha-param-detalhe.component';
import { CrudeCampanhaVendaListagemComponent } from './ui/crude/campanha-venda/crude-campanha-venda-listagem/crude-campanha-venda-listagem.component';
import { CrudeCampanhaVendaDetalheComponent } from './ui/crude/campanha-venda/crude-campanha-venda-detalhe/crude-campanha-venda-detalhe.component';
import { CrudeOrigemPedVenListagemComponent } from './ui/crude/origem-ped-ven/crude-origem-ped-ven-listagem/crude-origem-ped-ven-listagem.component';
import { CrudeOrigemPedVenDetalheComponent } from './ui/crude/origem-ped-ven/crude-origem-ped-ven-detalhe/crude-origem-ped-ven-detalhe.component';
import { CrudeSituacaoPedVenDetalheComponent } from './ui/crude/situacao-ped-ven/crude-situacao-ped-ven-detalhe/crude-situacao-ped-ven-detalhe.component';
import { CrudeSituacaoPedVenListagemComponent } from './ui/crude/situacao-ped-ven/crude-situacao-ped-ven-listagem/crude-situacao-ped-ven-listagem.component';
import { CrudeSituacaoAtenPedListagemComponent } from './ui/crude/situacao-aten-ped/crude-situacao-aten-ped-listagem/crude-situacao-aten-ped-listagem.component';
import { CrudeSituacaoAtenPedDetalheComponent } from './ui/crude/situacao-aten-ped/crude-situacao-aten-ped-detalhe/crude-situacao-aten-ped-detalhe.component';
import { CrudeTipoFreteDetalheComponent } from './ui/crude/tipo-frete/crude-tipo-frete-detalhe/crude-tipo-frete-detalhe.component';
import { CrudeTipoFreteListagemComponent } from './ui/crude/tipo-frete/crude-tipo-frete-listagem/crude-tipo-frete-listagem.component';
import { CrudeTabPrecoListagemComponent } from './ui/crude/tab-preco/crude-tab-preco-listagem/crude-tab-preco-listagem.component';
import { CrudeTabPrecoDetalheComponent } from './ui/crude/tab-preco/crude-tab-preco-detalhe/crude-tab-preco-detalhe.component';
import { TabsTabPrecoComponent } from './ui/crude/tab-preco/tabs-tab-preco/tabs-tab-preco.component';
import { CrudeTabPrecoItemListagemComponent } from './ui/crude/tab-preco-item/crude-tab-preco-item-listagem/crude-tab-preco-item-listagem.component';
import { CrudeTabPrecoItemDetalheComponent } from './ui/crude/tab-preco-item/crude-tab-preco-item-detalhe/crude-tab-preco-item-detalhe.component';
import { CrudeTabPrecoRegraListagemComponent } from './ui/crude/tab-preco-regra/crude-tab-preco-regra-listagem/crude-tab-preco-regra-listagem.component';
import { CrudeTabPrecoRegraDetalheComponent } from './ui/crude/tab-preco-regra/crude-tab-preco-regra-detalhe/crude-tab-preco-regra-detalhe.component';
import { CrudeTipoPedidoListagemComponent } from './ui/crude/tipo-pedido/crude-tipo-pedido-listagem/crude-tipo-pedido-listagem.component';
import { CrudeTipoPedidoDetalheComponent } from './ui/crude/tipo-pedido/crude-tipo-pedido-detalhe/crude-tipo-pedido-detalhe.component';
import { CrudeTranspDetalheComponent } from './ui/crude/transp/crude-transp-detalhe/crude-transp-detalhe.component';
import { CrudeTranspListagemComponent } from './ui/crude/transp/crude-transp-listagem/crude-transp-listagem.component';
import { CrudeMotRejAprovaPvDetalheComponent } from './ui/crude/mot-rej-aprova-pv/crude-mot-rej-aprova-pv-detalhe/crude-mot-rej-aprova-pv-detalhe.component';
import { CrudeMotRejAprovaPvListagemComponent } from './ui/crude/mot-rej-aprova-pv/crude-mot-rej-aprova-pv-listagem/crude-mot-rej-aprova-pv-listagem.component';
import { CrudeSituacaoAprovaPvDetalheComponent } from './ui/crude/situacao-aprova-pv/crude-situacao-aprova-pv-detalhe/crude-situacao-aprova-pv-detalhe.component';
import { CrudeSituacaoAprovaPvListagemComponent } from './ui/crude/situacao-aprova-pv/crude-situacao-aprova-pv-listagem/crude-situacao-aprova-pv-listagem.component';
import { CrudeSituacaoPedCompDetalheComponent } from './ui/crude/situacao-ped-comp/crude-situacao-ped-comp-detalhe/crude-situacao-ped-comp-detalhe.component';
import { CrudeSituacaoPedCompListagemComponent } from './ui/crude/situacao-ped-comp/crude-situacao-ped-comp-listagem/crude-situacao-ped-comp-listagem.component';
import { CrudeSitAtenPedCompDetalheComponent } from './ui/crude/sit-aten-ped-comp/crude-sit-aten-ped-comp-detalhe/crude-sit-aten-ped-comp-detalhe.component';
import { CrudeSitAtenPedCompListagemComponent } from './ui/crude/sit-aten-ped-comp/crude-sit-aten-ped-comp-listagem/crude-sit-aten-ped-comp-listagem.component';
import { CrudeMotRejPedCompDetalheComponent } from './ui/crude/mot-rej-ped-comp/crude-mot-rej-ped-comp-detalhe/crude-mot-rej-ped-comp-detalhe.component';
import { CrudeMotRejPedCompListagemComponent } from './ui/crude/mot-rej-ped-comp/crude-mot-rej-ped-comp-listagem/crude-mot-rej-ped-comp-listagem.component';
import { CrudePedCompraListagemComponent } from './ui/crude/ped-compra/crude-ped-compra-listagem/crude-ped-compra-listagem.component';
import { CrudePedCompraDetalheComponent } from './ui/crude/ped-compra/crude-ped-compra-detalhe/crude-ped-compra-detalhe.component';
import { TabsPedCompraComponent } from './ui/crude/ped-compra/tabs-ped-compra/tabs-ped-compra.component';
import { CrudePedCompraItemDetalheComponent } from './ui/crude/ped-compra-item/crude-ped-compra-item-detalhe/crude-ped-compra-item-detalhe.component';
import { CrudePedCompraItemListagemComponent } from './ui/crude/ped-compra-item/crude-ped-compra-item-listagem/crude-ped-compra-item-listagem.component';
import { CrudeAprovaPedBonifListagemComponent } from './ui/crude/aprova-ped-bonif/crude-aprova-ped-bonif-listagem/crude-aprova-ped-bonif-listagem.component';
import { CrudeAprovaPedBonifAprovaDetalheComponent } from './ui/crude/aprova-ped-bonif/crude-aprova-ped-bonif-aprova-detalhe/crude-aprova-ped-bonif-aprova-detalhe.component';
import { CrudeAprovaPedBonifRejeitaDetalheComponent } from './ui/crude/aprova-ped-bonif/crude-aprova-ped-bonif-rejeita-detalhe/crude-aprova-ped-bonif-rejeita-detalhe.component';
import { CrudeSolicAproPedBonifListagemComponent } from './ui/crude/solic-apro-ped-bonif/crude-solic-apro-ped-bonif-listagem/crude-solic-apro-ped-bonif-listagem.component';
import { CrudeSolicAproPedBonifDetalheComponent } from './ui/crude/solic-apro-ped-bonif/crude-solic-apro-ped-bonif-detalhe/crude-solic-apro-ped-bonif-detalhe.component';
import { CrudeSolicAproPedBonifItemListagemComponent } from './ui/crude/solic-apro-ped-bonif-item/crude-solic-apro-ped-bonif-item-listagem/crude-solic-apro-ped-bonif-item-listagem.component';
import { CrudeSolicAproPedBonifItemDetalheComponent } from './ui/crude/solic-apro-ped-bonif-item/crude-solic-apro-ped-bonif-item-detalhe/crude-solic-apro-ped-bonif-item-detalhe.component';
import { CrudePedVendaListagemComponent } from './ui/crude/ped-venda/crude-ped-venda-listagem/crude-ped-venda-listagem.component';
import { CrudePedVendaDetalheComponent } from './ui/crude/ped-venda/crude-ped-venda-detalhe/crude-ped-venda-detalhe.component';
import { CrudePedVendaItemListagemComponent } from './ui/crude/ped-venda-item/crude-ped-venda-item-listagem/crude-ped-venda-item-listagem.component';
import { CrudePedVendaItemDetalheComponent } from './ui/crude/ped-venda-item/crude-ped-venda-item-detalhe/crude-ped-venda-item-detalhe.component';
import { TabsPedVendaComponent } from './ui/crude/ped-venda/tabs-ped-venda/tabs-ped-venda.component';


//Relatórios
import { Oper0006Component } from './ui/operacoes/oper0006/oper0006.component';
import { Oper0007Component } from './ui/operacoes/oper0007/oper0007.component';
import { Oper0008Component } from './ui/operacoes/oper0008/oper0008.component';
import { Oper0009Component } from './ui/operacoes/oper0009/oper0009.component';
import { Oper0010Component } from './ui/operacoes/oper0010/oper0010.component';
import { Oper0012Component } from './ui/operacoes/oper0012/oper0012.component';


//TELAS DO SISTEMA (LISTAGENS E DETALHES)

@NgModule({

  imports: [
    CommonModule,
    FvendaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    OperacaoBarraAcaoModule,
  ],
  declarations: [
    CrudeCondPagtoVendaDetalheComponent,
    CrudeCondPagtoVendaListagemComponent,
    CrudeMotivoRejeitaDetalheComponent,
    CrudeMotivoRejeitaListagemComponent,
    CrudeSituacaoSolicCredListagemComponent,
    CrudeSituacaoSolicCredDetalheComponent,
    CrudeRepresVendaJuridicaDetalheComponent,
    CrudeRepresVendaFisicaDetalheComponent,
    CrudeRepresVendaListagemComponent,
    TabsRepresVendaFisicaComponent,
    TabsRepresVendaJuridicaComponent,
    CrudeClienteVendaListagemComponent,
    CrudeClienteVendaFisicaDetalheComponent,
    CrudeClienteVendaJuridicaDetalheComponent,
    TabsClienteVendaJuridicaComponent,
    TabsClienteVendaFisicaComponent,
    CrudeSolicitaCreditoListagemComponent,
    CrudeAprovaCreditoListagemComponent,
    CrudeAprovaCreditoAprovaDetalheComponent,
    CrudeAprovaCreditoRejeitaDetalheComponent,
    CrudeSolicitaCreditoReajusteDetalheComponent,
    CrudeSolicitaCreditoNovoDetalheComponent,
    CrudeSituacaoAssTecDetalheComponent,
    CrudeSituacaoAssTecListagemComponent,
    CrudeOrigemAssTecListagemComponent,
    CrudeOrigemAssTecDetalheComponent,
    CrudeTipoTecnicoDetalheComponent,
    CrudeTipoTecnicoListagemComponent,
    CrudeTipoDefeitoDetalheComponent,
    CrudeTipoDefeitoListagemComponent,
    CrudeDefeitoListagemComponent,
    CrudeDefeitoDetalheComponent,
    CrudeTipoAssTecDetalheComponent,
    CrudeTipoAssTecListagemComponent,
    CrudeFamComListagemComponent,
    CrudeFamComDetalheComponent,
    CrudeFamMatDetalheComponent,
    CrudeFamMatListagemComponent,
    CrudeGrpEstListagemComponent,
    CrudeGrpEstDetalheComponent,
    CrudeSolucAssTecListagemComponent,
    CrudeSolucAssTecDetalheComponent,
    CrudeEspecieItemListagemComponent,
    CrudeEspecieItemDetalheComponent,
    CrudeCategoriaListagemComponent,
    CrudeCategoriaDetalheComponent,
    CrudeItemListagemComponent,
    CrudeItemDetalheComponent,
    CrudeItemLoteSerieListagemComponent,
    CrudeItemLoteSerieDetalheComponent,
    CrudeAssTecnicaListagemComponent,
    CrudeAssTecnicaDetalheComponent,
    CrudeAssTecItemListagemComponent,
    CrudeAssTecItemDetalheComponent,
    TabsAssTecItemComponent,
    CrudeAssTecItemDefAlegListagemComponent,
    CrudeAssTecItemDefAlegDetalheComponent,
    CrudeAssTecItemDefConstDetalheComponent,
    CrudeAssTecItemDefConstListagemComponent,
    CrudeAssTecItemSubsListagemComponent,
    CrudeAssTecItemSubsDetalheComponent,
    CrudeAssTecItemServDetalheComponent,
    CrudeAssTecItemServListagemComponent,
    CrudeTecnicoListagemComponent,
    CrudeTecnicoDetalheComponent,
    CrudeSituacaoCampListagemComponent,
    CrudeSituacaoCampDetalheComponent,
    CrudeTipoCampanhaListagemComponent,
    CrudeTipoCampanhaDetalheComponent,
    CrudeTipoIntegraCampListagemComponent,
    CrudeTipoIntegraCampDetalheComponent,
    CrudeCampanhaDetalheComponent,
    CrudeCampanhaListagemComponent,
    CrudeCampanhaParamListagemComponent,
    CrudeCampanhaParamDetalheComponent,
    CrudeCampanhaVendaListagemComponent,
    CrudeCampanhaVendaDetalheComponent,
    CrudeOrigemPedVenListagemComponent,
    CrudeOrigemPedVenDetalheComponent,
    CrudeSituacaoPedVenDetalheComponent,
    CrudeSituacaoPedVenListagemComponent,
    CrudeSituacaoAtenPedListagemComponent,
    CrudeSituacaoAtenPedDetalheComponent,
    CrudeTipoFreteDetalheComponent,
    CrudeTipoFreteListagemComponent,
    CrudeTabPrecoListagemComponent,
    CrudeTabPrecoDetalheComponent,
    TabsTabPrecoComponent,
    CrudeTabPrecoItemListagemComponent,
    CrudeTabPrecoItemDetalheComponent,
    CrudeTabPrecoRegraListagemComponent,
    CrudeTabPrecoRegraDetalheComponent,
    CrudeTipoPedidoListagemComponent,
    CrudeTipoPedidoDetalheComponent,
    CrudeTranspDetalheComponent,
    CrudeTranspListagemComponent,
    CrudeMotRejAprovaPvDetalheComponent,
    CrudeMotRejAprovaPvListagemComponent,
    CrudeSituacaoAprovaPvDetalheComponent,
    CrudeSituacaoAprovaPvListagemComponent,
    CrudeSituacaoPedCompDetalheComponent,
    CrudeSituacaoPedCompListagemComponent,
    CrudeSitAtenPedCompDetalheComponent,
    CrudeSitAtenPedCompListagemComponent,
    CrudeMotRejPedCompDetalheComponent,
    CrudeMotRejPedCompListagemComponent,
    CrudePedCompraListagemComponent,
    CrudePedCompraDetalheComponent,
    TabsPedCompraComponent,
    CrudePedCompraItemDetalheComponent,
    CrudePedCompraItemListagemComponent,
    CrudeAprovaPedBonifListagemComponent,
    CrudeAprovaPedBonifAprovaDetalheComponent,
    CrudeAprovaPedBonifRejeitaDetalheComponent,
    CrudeSolicAproPedBonifListagemComponent,
    CrudeSolicAproPedBonifDetalheComponent,
    CrudeSolicAproPedBonifItemListagemComponent,
    CrudeSolicAproPedBonifItemDetalheComponent,
    CrudePedVendaListagemComponent,
    CrudePedVendaDetalheComponent,
    CrudePedVendaItemListagemComponent,

    CrudePedVendaItemDetalheComponent,

    TabsPedVendaComponent,


    //Relatórios
    Oper0006Component,

    Oper0007Component,

    Oper0008Component,

    Oper0009Component,

    Oper0010Component,

    Oper0012Component,




  ]
})
export class FvendaModule { }
