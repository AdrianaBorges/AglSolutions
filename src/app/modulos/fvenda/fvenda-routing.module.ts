import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudeCondPagtoVendaListagemComponent } from './ui/crude/cond-pagto-venda/crude-cond-pagto-venda-listagem/crude-cond-pagto-venda-listagem.component';
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';
import { CrudeCondPagtoVendaDetalheComponent } from './ui/crude/cond-pagto-venda/crude-cond-pagto-venda-detalhe/crude-cond-pagto-venda-detalhe.component';
import { CrudeMotivoRejeitaListagemComponent } from './ui/crude/motivo-rejeita/crude-motivo-rejeita-listagem/crude-motivo-rejeita-listagem.component';
import { CrudeMotivoRejeitaDetalheComponent } from './ui/crude/motivo-rejeita/crude-motivo-rejeita-detalhe/crude-motivo-rejeita-detalhe.component';
import { CrudeSituacaoSolicCredListagemComponent } from './ui/crude/situacao-solic-cred/crude-situacao-solic-cred-listagem/crude-situacao-solic-cred-listagem.component';
import { CrudeSituacaoSolicCredDetalheComponent } from './ui/crude/situacao-solic-cred/crude-situacao-solic-cred-detalhe/crude-situacao-solic-cred-detalhe.component';
import { CrudeRepresVendaListagemComponent } from './ui/crude/repres-venda/crude-repres-venda-listagem/crude-repres-venda-listagem.component';
import { TabsRepresVendaFisicaComponent } from './ui/crude/repres-venda/tabs-repres-venda-fisica/tabs-repres-venda-fisica.component';
import { TabsRepresVendaJuridicaComponent } from './ui/crude/repres-venda/tabs-repres-venda-juridica/tabs-repres-venda-juridica.component';
import { CrudeClienteVendaListagemComponent } from './ui/crude/cliente-venda/crude-cliente-venda-listagem/crude-cliente-venda-listagem.component';
import { TabsClienteVendaFisicaComponent } from './ui/crude/cliente-venda/tabs-cliente-venda-fisica/tabs-cliente-venda-fisica.component';
import { TabsClienteVendaJuridicaComponent } from './ui/crude/cliente-venda/tabs-cliente-venda-juridica/tabs-cliente-venda-juridica.component';
import { CrudeSolicitaCreditoListagemComponent } from './ui/crude/solicita-credito/crude-solicita-credito-listagem/crude-solicita-credito-listagem.component';
import { CrudeAprovaCreditoListagemComponent } from './ui/crude/aprova-credito/crude-aprova-credito-listagem/crude-aprova-credito-listagem.component';
import { CrudeAprovaCreditoRejeitaDetalheComponent } from './ui/crude/aprova-credito/crude-aprova-credito-rejeita-detalhe/crude-aprova-credito-rejeita-detalhe.component';
import { CrudeAprovaCreditoAprovaDetalheComponent } from './ui/crude/aprova-credito/crude-aprova-credito-aprova-detalhe/crude-aprova-credito-aprova-detalhe.component';
import { CrudeSolicitaCreditoReajusteDetalheComponent } from './ui/crude/solicita-credito/crude-solicita-credito-reajuste-detalhe/crude-solicita-credito-reajuste-detalhe.component';
import { CrudeSolicitaCreditoNovoDetalheComponent } from './ui/crude/solicita-credito/crude-solicita-credito-novo-detalhe/crude-solicita-credito-novo-detalhe.component';
import { CrudeTipoDefeitoListagemComponent } from './ui/crude/tipo-defeito/crude-tipo-defeito-listagem/crude-tipo-defeito-listagem.component';
import { CrudeTipoDefeitoDetalheComponent } from './ui/crude/tipo-defeito/crude-tipo-defeito-detalhe/crude-tipo-defeito-detalhe.component';
import { CrudeDefeitoListagemComponent } from './ui/crude/defeito/crude-defeito-listagem/crude-defeito-listagem.component';
import { CrudeDefeitoDetalheComponent } from './ui/crude/defeito/crude-defeito-detalhe/crude-defeito-detalhe.component';
import { CrudeTipoAssTecListagemComponent } from './ui/crude/tipo-ass-tec/crude-tipo-ass-tec-listagem/crude-tipo-ass-tec-listagem.component';
import { CrudeTipoAssTecDetalheComponent } from './ui/crude/tipo-ass-tec/crude-tipo-ass-tec-detalhe/crude-tipo-ass-tec-detalhe.component';
import { CrudeFamComListagemComponent } from './ui/crude/fam-com/crude-fam-com-listagem/crude-fam-com-listagem.component';
import { CrudeFamComDetalheComponent } from './ui/crude/fam-com/crude-fam-com-detalhe/crude-fam-com-detalhe.component';
import { CrudeFamMatDetalheComponent } from './ui/crude/fam-mat/crude-fam-mat-detalhe/crude-fam-mat-detalhe.component';
import { CrudeFamMatListagemComponent } from './ui/crude/fam-mat/crude-fam-mat-listagem/crude-fam-mat-listagem.component';
import { CrudeGrpEstListagemComponent } from './ui/crude/grp-est/crude-grp-est-listagem/crude-grp-est-listagem.component';
import { CrudeGrpEstDetalheComponent } from './ui/crude/grp-est/crude-grp-est-detalhe/crude-grp-est-detalhe.component';
import { CrudeSolucAssTecListagemComponent } from './ui/crude/soluc-ass-tec/crude-soluc-ass-tec-listagem/crude-soluc-ass-tec-listagem.component';
import { CrudeSolucAssTecDetalheComponent } from './ui/crude/soluc-ass-tec/crude-soluc-ass-tec-detalhe/crude-soluc-ass-tec-detalhe.component';
import { CrudeEspecieItemDetalheComponent } from './ui/crude/especie-item/crude-especie-item-detalhe/crude-especie-item-detalhe.component';
import { CrudeEspecieItemListagemComponent } from './ui/crude/especie-item/crude-especie-item-listagem/crude-especie-item-listagem.component';
import { CrudeCategoriaListagemComponent } from './ui/crude/categoria/crude-categoria-listagem/crude-categoria-listagem.component';
import { CrudeCategoriaDetalheComponent } from './ui/crude/categoria/crude-categoria-detalhe/crude-categoria-detalhe.component';
import { CrudeItemDetalheComponent } from './ui/crude/item/crude-item-detalhe/crude-item-detalhe.component';
import { CrudeItemListagemComponent } from './ui/crude/item/crude-item-listagem/crude-item-listagem.component';

import { CrudeSituacaoAssTecListagemComponent } from './ui/crude/situacao-ass-tec/crude-situacao-ass-tec-listagem/crude-situacao-ass-tec-listagem.component';
import { CrudeSituacaoAssTecDetalheComponent } from './ui/crude/situacao-ass-tec/crude-situacao-ass-tec-detalhe/crude-situacao-ass-tec-detalhe.component';

import { CrudeOrigemAssTecListagemComponent } from './ui/crude/origem-ass-tec/crude-origem-ass-tec-listagem/crude-origem-ass-tec-listagem.component';
import { CrudeOrigemAssTecDetalheComponent } from './ui/crude/origem-ass-tec/crude-origem-ass-tec-detalhe/crude-origem-ass-tec-detalhe.component';

import { CrudeTipoTecnicoDetalheComponent } from './ui/crude/tipo-tecnico/crude-tipo-tecnico-detalhe/crude-tipo-tecnico-detalhe.component';
import { CrudeTipoTecnicoListagemComponent } from './ui/crude/tipo-tecnico/crude-tipo-tecnico-listagem/crude-tipo-tecnico-listagem.component';
import { CrudeItemLoteSerieListagemComponent } from './ui/crude/item-lote-serie/crude-item-lote-serie-listagem/crude-item-lote-serie-listagem.component';
import { CrudeItemLoteSerieDetalheComponent } from './ui/crude/item-lote-serie/crude-item-lote-serie-detalhe/crude-item-lote-serie-detalhe.component';
import { CrudeAssTecnicaListagemComponent } from './ui/crude/ass-tecnica/crude-ass-tecnica-listagem/crude-ass-tecnica-listagem.component';
import { CrudeAssTecnicaDetalheComponent } from './ui/crude/ass-tecnica/crude-ass-tecnica-detalhe/crude-ass-tecnica-detalhe.component';
import { CrudeAssTecItemListagemComponent } from './ui/crude/ass-tec-item/crude-ass-tec-item-listagem/crude-ass-tec-item-listagem.component';
import { TabsAssTecItemComponent } from './ui/crude/ass-tec-item/tabs-ass-tec-item/tabs-ass-tec-item.component';
import { CrudeTecnicoListagemComponent } from './ui/crude/tecnico/crude-tecnico-listagem/crude-tecnico-listagem.component';
import { CrudeTecnicoDetalheComponent } from './ui/crude/tecnico/crude-tecnico-detalhe/crude-tecnico-detalhe.component';
import { CrudeTipoIntegraCampListagemComponent } from './ui/crude/tipo-integra-camp/crude-tipo-integra-camp-listagem/crude-tipo-integra-camp-listagem.component';
import { CrudeTipoIntegraCampDetalheComponent } from './ui/crude/tipo-integra-camp/crude-tipo-integra-camp-detalhe/crude-tipo-integra-camp-detalhe.component';
import { CrudeTipoCampanhaListagemComponent } from './ui/crude/tipo-campanha/crude-tipo-campanha-listagem/crude-tipo-campanha-listagem.component';
import { CrudeTipoCampanhaDetalheComponent } from './ui/crude/tipo-campanha/crude-tipo-campanha-detalhe/crude-tipo-campanha-detalhe.component';
import { CrudeSituacaoCampListagemComponent } from './ui/crude/situacao-camp/crude-situacao-camp-listagem/crude-situacao-camp-listagem.component';
import { CrudeSituacaoCampDetalheComponent } from './ui/crude/situacao-camp/crude-situacao-camp-detalhe/crude-situacao-camp-detalhe.component';
import { CrudeCampanhaListagemComponent } from './ui/crude/campanha/crude-campanha-listagem/crude-campanha-listagem.component';
import { CrudeCampanhaDetalheComponent } from './ui/crude/campanha/crude-campanha-detalhe/crude-campanha-detalhe.component';
import { CrudeCampanhaParamListagemComponent } from './ui/crude/campanha-param/crude-campanha-param-listagem/crude-campanha-param-listagem.component';
import { CrudeCampanhaParamDetalheComponent } from './ui/crude/campanha-param/crude-campanha-param-detalhe/crude-campanha-param-detalhe.component';
import { CrudeCampanhaVendaListagemComponent } from './ui/crude/campanha-venda/crude-campanha-venda-listagem/crude-campanha-venda-listagem.component';
import { CrudeCampanhaVendaDetalheComponent } from './ui/crude/campanha-venda/crude-campanha-venda-detalhe/crude-campanha-venda-detalhe.component';

import { CrudeSituacaoPedVenListagemComponent } from './ui/crude/situacao-ped-ven/crude-situacao-ped-ven-listagem/crude-situacao-ped-ven-listagem.component';
import { CrudeSituacaoPedVenDetalheComponent } from './ui/crude/situacao-ped-ven/crude-situacao-ped-ven-detalhe/crude-situacao-ped-ven-detalhe.component';
import { CrudeOrigemPedVenListagemComponent } from './ui/crude/origem-ped-ven/crude-origem-ped-ven-listagem/crude-origem-ped-ven-listagem.component';
import { CrudeOrigemPedVenDetalheComponent } from './ui/crude/origem-ped-ven/crude-origem-ped-ven-detalhe/crude-origem-ped-ven-detalhe.component';
import { CrudeSituacaoAtenPedListagemComponent } from './ui/crude/situacao-aten-ped/crude-situacao-aten-ped-listagem/crude-situacao-aten-ped-listagem.component';
import { CrudeSituacaoAtenPedDetalheComponent } from './ui/crude/situacao-aten-ped/crude-situacao-aten-ped-detalhe/crude-situacao-aten-ped-detalhe.component';
import { CrudeTipoFreteListagemComponent } from './ui/crude/tipo-frete/crude-tipo-frete-listagem/crude-tipo-frete-listagem.component';
import { CrudeTipoFreteDetalheComponent } from './ui/crude/tipo-frete/crude-tipo-frete-detalhe/crude-tipo-frete-detalhe.component';
import { CrudeTabPrecoListagemComponent } from './ui/crude/tab-preco/crude-tab-preco-listagem/crude-tab-preco-listagem.component';
import { TabsTabPrecoComponent } from './ui/crude/tab-preco/tabs-tab-preco/tabs-tab-preco.component';
import { CrudeTabPrecoRegraListagemComponent } from './ui/crude/tab-preco-regra/crude-tab-preco-regra-listagem/crude-tab-preco-regra-listagem.component';
import { CrudeTabPrecoRegraDetalheComponent } from './ui/crude/tab-preco-regra/crude-tab-preco-regra-detalhe/crude-tab-preco-regra-detalhe.component';
import { CrudeTipoPedidoListagemComponent } from './ui/crude/tipo-pedido/crude-tipo-pedido-listagem/crude-tipo-pedido-listagem.component';
import { CrudeTipoPedidoDetalheComponent } from './ui/crude/tipo-pedido/crude-tipo-pedido-detalhe/crude-tipo-pedido-detalhe.component';
import { CrudeTranspListagemComponent } from './ui/crude/transp/crude-transp-listagem/crude-transp-listagem.component';
import { CrudeTranspDetalheComponent } from './ui/crude/transp/crude-transp-detalhe/crude-transp-detalhe.component';
import { CrudeMotRejAprovaPvListagemComponent } from './ui/crude/mot-rej-aprova-pv/crude-mot-rej-aprova-pv-listagem/crude-mot-rej-aprova-pv-listagem.component';
import { CrudeMotRejAprovaPvDetalheComponent } from './ui/crude/mot-rej-aprova-pv/crude-mot-rej-aprova-pv-detalhe/crude-mot-rej-aprova-pv-detalhe.component';
import { CrudeSituacaoAprovaPvListagemComponent } from './ui/crude/situacao-aprova-pv/crude-situacao-aprova-pv-listagem/crude-situacao-aprova-pv-listagem.component';
import { CrudeSituacaoAprovaPvDetalheComponent } from './ui/crude/situacao-aprova-pv/crude-situacao-aprova-pv-detalhe/crude-situacao-aprova-pv-detalhe.component';
import { CrudeSituacaoPedCompListagemComponent } from './ui/crude/situacao-ped-comp/crude-situacao-ped-comp-listagem/crude-situacao-ped-comp-listagem.component';
import { CrudeSituacaoPedCompDetalheComponent } from './ui/crude/situacao-ped-comp/crude-situacao-ped-comp-detalhe/crude-situacao-ped-comp-detalhe.component';
import { CrudeSitAtenPedCompListagemComponent } from './ui/crude/sit-aten-ped-comp/crude-sit-aten-ped-comp-listagem/crude-sit-aten-ped-comp-listagem.component';
import { CrudeSitAtenPedCompDetalheComponent } from './ui/crude/sit-aten-ped-comp/crude-sit-aten-ped-comp-detalhe/crude-sit-aten-ped-comp-detalhe.component';
import { CrudeMotRejPedCompListagemComponent } from './ui/crude/mot-rej-ped-comp/crude-mot-rej-ped-comp-listagem/crude-mot-rej-ped-comp-listagem.component';
import { CrudeMotRejPedCompDetalheComponent } from './ui/crude/mot-rej-ped-comp/crude-mot-rej-ped-comp-detalhe/crude-mot-rej-ped-comp-detalhe.component';
import { CrudePedCompraListagemComponent } from './ui/crude/ped-compra/crude-ped-compra-listagem/crude-ped-compra-listagem.component';
import { TabsPedCompraComponent } from './ui/crude/ped-compra/tabs-ped-compra/tabs-ped-compra.component';
import { CrudeAprovaPedBonifListagemComponent } from './ui/crude/aprova-ped-bonif/crude-aprova-ped-bonif-listagem/crude-aprova-ped-bonif-listagem.component';
import { CrudeAprovaPedBonifAprovaDetalheComponent } from './ui/crude/aprova-ped-bonif/crude-aprova-ped-bonif-aprova-detalhe/crude-aprova-ped-bonif-aprova-detalhe.component';
import { CrudeAprovaPedBonifRejeitaDetalheComponent } from './ui/crude/aprova-ped-bonif/crude-aprova-ped-bonif-rejeita-detalhe/crude-aprova-ped-bonif-rejeita-detalhe.component';
import { CrudeSolicAproPedBonifListagemComponent } from './ui/crude/solic-apro-ped-bonif/crude-solic-apro-ped-bonif-listagem/crude-solic-apro-ped-bonif-listagem.component';
import { CrudeSolicAproPedBonifDetalheComponent } from './ui/crude/solic-apro-ped-bonif/crude-solic-apro-ped-bonif-detalhe/crude-solic-apro-ped-bonif-detalhe.component';
import { CrudeSolicAproPedBonifItemListagemComponent } from './ui/crude/solic-apro-ped-bonif-item/crude-solic-apro-ped-bonif-item-listagem/crude-solic-apro-ped-bonif-item-listagem.component';
import { CrudeSolicAproPedBonifItemDetalheComponent } from './ui/crude/solic-apro-ped-bonif-item/crude-solic-apro-ped-bonif-item-detalhe/crude-solic-apro-ped-bonif-item-detalhe.component';
import { CrudePedVendaListagemComponent } from './ui/crude/ped-venda/crude-ped-venda-listagem/crude-ped-venda-listagem.component';
import { CrudePedVendaDetalheComponent } from './ui/crude/ped-venda/crude-ped-venda-detalhe/crude-ped-venda-detalhe.component';
import { TabsPedVendaComponent } from './ui/crude/ped-venda/tabs-ped-venda/tabs-ped-venda.component';
import { CrudePedVendaItemDetalheComponent } from './ui/crude/ped-venda-item/crude-ped-venda-item-detalhe/crude-ped-venda-item-detalhe.component';


//RELATÓRIOS
import { Oper0006Component } from './ui/operacoes/oper0006/oper0006.component';
import { Oper0007Component } from './ui/operacoes/oper0007/oper0007.component';
import { Oper0008Component } from './ui/operacoes/oper0008/oper0008.component';
import { Oper0009Component } from './ui/operacoes/oper0009/oper0009.component';
import { Oper0010Component } from './ui/operacoes/oper0010/oper0010.component';
import { Oper0012Component } from './ui/operacoes/oper0012/oper0012.component';



const routes: Routes = [
  {
    path: 'cond-pagto-venda',
    component: CrudeCondPagtoVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cond-pagto-venda/:id',
    component: CrudeCondPagtoVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cond-pagto-venda/:id/:operacao',
    component: CrudeCondPagtoVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'motivo-rejeita',
    component: CrudeMotivoRejeitaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'motivo-rejeita/:id',
    component: CrudeMotivoRejeitaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'motivo-rejeita/:id/:operacao',
    component: CrudeMotivoRejeitaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-solic-cred',
    component: CrudeSituacaoSolicCredListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-solic-cred/:id',
    component: CrudeSituacaoSolicCredDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-solic-cred/:id/:operacao',
    component: CrudeSituacaoSolicCredDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'repres-venda',
    component: CrudeRepresVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'repres-venda/fisica/:id',
    component: TabsRepresVendaFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'repres-venda/fisica/:id/:operacao',
    component: TabsRepresVendaFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'repres-venda/juridica/:id',
    component: TabsRepresVendaJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'repres-venda/juridica/:id/:operacao',
    component: TabsRepresVendaJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente-venda',
    component: CrudeClienteVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente-venda/fisica/:id',
    component: TabsClienteVendaFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente-venda/fisica/:id/:operacao',
    component: TabsClienteVendaFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente-venda/juridica/:id',
    component: TabsClienteVendaJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cliente-venda/juridica/:id/:operacao',
    component: TabsClienteVendaJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solicita-credito',
    component: CrudeSolicitaCreditoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solicita-credito/novo/:id',
    component: CrudeSolicitaCreditoNovoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solicita-credito/novo/:id/:operacao',
    component: CrudeSolicitaCreditoNovoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solicita-credito/reajuste/:id',
    component: CrudeSolicitaCreditoReajusteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solicita-credito/reajuste/:id/:operacao',
    component: CrudeSolicitaCreditoReajusteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'aprova-credito',
    component: CrudeAprovaCreditoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'aprova-credito/aprova/:id',
    component: CrudeAprovaCreditoAprovaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'aprova-credito/rejeita/:id',
    component: CrudeAprovaCreditoRejeitaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-defeito',
    component: CrudeTipoDefeitoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-defeito/:id',
    component: CrudeTipoDefeitoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-defeito/:id/:operacao',
    component: CrudeTipoDefeitoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'defeito',
    component: CrudeDefeitoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'defeito/:id',
    component: CrudeDefeitoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'defeito/:id/:operacao',
    component: CrudeDefeitoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-ass-tec',
    component: CrudeTipoAssTecListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-ass-tec/:id',
    component: CrudeTipoAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-ass-tec/:id/:operacao',
    component: CrudeTipoAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'fam-com',
    component: CrudeFamComListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'fam-com/:id',
    component: CrudeFamComDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'fam-com/:id/:operacao',
    component: CrudeFamComDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'fam-mat',
    component: CrudeFamMatListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'fam-mat/:id',
    component: CrudeFamMatDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'fam-mat/:id/:operacao',
    component: CrudeFamMatDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grp-est',
    component: CrudeGrpEstListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grp-est/:id',
    component: CrudeGrpEstDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grp-est/:id/:operacao',
    component: CrudeGrpEstDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'soluc-ass-tec',
    component: CrudeSolucAssTecListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'soluc-ass-tec/:id',
    component: CrudeSolucAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'soluc-ass-tec/:id/:operacao',
    component: CrudeSolucAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'especie-item',
    component: CrudeEspecieItemListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'especie-item/:id',
    component: CrudeEspecieItemDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'especie-item/:id/:operacao',
    component: CrudeEspecieItemDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'categoria',
    component: CrudeCategoriaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'categoria/:id',
    component: CrudeCategoriaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'categoria/:id/:operacao',
    component: CrudeCategoriaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }
  ,
  {
    path: 'item',
    component: CrudeItemListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'item/:id',
    component: CrudeItemDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'item/:id/:operacao',
    component: CrudeItemDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ass-tec',
    component: CrudeSituacaoAssTecListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ass-tec/:id',
    component: CrudeSituacaoAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ass-tec/:id/:operacao',
    component: CrudeSituacaoAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-ass-tec',
    component: CrudeOrigemAssTecListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-ass-tec/:id',
    component: CrudeOrigemAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-ass-tec/:id/:operacao',
    component: CrudeOrigemAssTecDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-tecnico',
    component: CrudeTipoTecnicoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-tecnico/:id',
    component: CrudeTipoTecnicoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-tecnico/:id/:operacao',
    component: CrudeTipoTecnicoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'item-lote-serie',
    component: CrudeItemLoteSerieListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'item-lote-serie/:id',
    component: CrudeItemLoteSerieDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'item-lote-serie/:id/:operacao',
    component: CrudeItemLoteSerieDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ass-tecnica',
    component: CrudeAssTecnicaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ass-tecnica/:id',
    component: CrudeAssTecnicaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ass-tecnica/:id/:operacao',
    component: CrudeAssTecnicaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "ass-tecnica/:id/filho/ass-tec-item",
    component: CrudeAssTecItemListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "ass-tecnica/:id/filho/ass-tec-item/:IDAssTecItem",
    component: TabsAssTecItemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "ass-tecnica/:id/filho/ass-tec-item/:IDAssTecItem/:operacao",
    component: TabsAssTecItemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tecnico',
    component: CrudeTecnicoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tecnico/:id',
    component: CrudeTecnicoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tecnico/:id/:operacao',
    component: CrudeTecnicoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }, {
    path: 'tipo-integra-camp',
    component: CrudeTipoIntegraCampListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-integra-camp/:id',
    component: CrudeTipoIntegraCampDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-integra-camp/:id/:operacao',
    component: CrudeTipoIntegraCampDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-campanha',
    component: CrudeTipoCampanhaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-campanha/:id',
    component: CrudeTipoCampanhaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-campanha/:id/:operacao',
    component: CrudeTipoCampanhaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-camp',
    component: CrudeSituacaoCampListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-camp/:id',
    component: CrudeSituacaoCampDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-camp/:id/:operacao',
    component: CrudeSituacaoCampDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }, {
    path: 'campanha',
    component: CrudeCampanhaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'campanha/:id',
    component: CrudeCampanhaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'campanha/:id/:operacao',
    component: CrudeCampanhaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "campanha/:id/filho/campanha-param",
    component: CrudeCampanhaParamListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "campanha/:id/filho/campanha-param/:IDCampanhaParam",
    component: CrudeCampanhaParamDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "campanha/:id/filho/campanha-param/:IDCampanhaParam/:operacao",
    component: CrudeCampanhaParamDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "campanha/:id/filho/campanha-param/:IDCampanhaParam/filho/campanha-venda",
    component: CrudeCampanhaVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "campanha/:id/filho/campanha-param/:IDCampanhaParam/filho/campanha-venda/:IDCampanhaVenda",
    component: CrudeCampanhaVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "campanha/:id/filho/campanha-param/:IDCampanhaParam/filho/campanha-venda/:IDCampanhaVenda/:operacao",
    component: CrudeCampanhaVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ped-ven',
    component: CrudeSituacaoPedVenListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ped-ven/:id',
    component: CrudeSituacaoPedVenDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ped-ven/:id/:operacao',
    component: CrudeSituacaoPedVenDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-ped-ven',
    component: CrudeOrigemPedVenListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-ped-ven/:id',
    component: CrudeOrigemPedVenDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-ped-ven/:id/:operacao',
    component: CrudeOrigemPedVenDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-aten-ped',
    component: CrudeSituacaoAtenPedListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-aten-ped/:id',
    component: CrudeSituacaoAtenPedDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-aten-ped/:id/:operacao',
    component: CrudeSituacaoAtenPedDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-frete',
    component: CrudeTipoFreteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-frete/:id',
    component: CrudeTipoFreteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-frete/:id/:operacao',
    component: CrudeTipoFreteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tab-preco',
    component: CrudeTabPrecoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tab-preco/:id',
    component: TabsTabPrecoComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tab-preco/:id/:operacao',
    component: TabsTabPrecoComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tab-preco-regra',
    component: CrudeTabPrecoRegraListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tab-preco-regra/:id',
    component: CrudeTabPrecoRegraDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tab-preco-regra/:id/:operacao',
    component: CrudeTabPrecoRegraDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pedido',
    component: CrudeTipoPedidoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pedido/:id',
    component: CrudeTipoPedidoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-pedido/:id/:operacao',
    component: CrudeTipoPedidoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'transp',
    component: CrudeTranspListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'transp/:id',
    component: CrudeTranspDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'transp/:id/:operacao',
    component: CrudeTranspDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'mot-rej-aprova-pv',
    component: CrudeMotRejAprovaPvListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'mot-rej-aprova-pv/:id',
    component: CrudeMotRejAprovaPvDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'mot-rej-aprova-pv/:id/:operacao',
    component: CrudeMotRejAprovaPvDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-aprova-pv',
    component: CrudeSituacaoAprovaPvListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-aprova-pv/:id',
    component: CrudeSituacaoAprovaPvDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-aprova-pv/:id/:operacao',
    component: CrudeSituacaoAprovaPvDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ped-comp',
    component: CrudeSituacaoPedCompListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ped-comp/:id',
    component: CrudeSituacaoPedCompDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-ped-comp/:id/:operacao',
    component: CrudeSituacaoPedCompDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sit-aten-ped-comp',
    component: CrudeSitAtenPedCompListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sit-aten-ped-comp/:id',
    component: CrudeSitAtenPedCompDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'sit-aten-ped-comp/:id/:operacao',
    component: CrudeSitAtenPedCompDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'mot-rej-ped-comp',
    component: CrudeMotRejPedCompListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'mot-rej-ped-comp/:id',
    component: CrudeMotRejPedCompDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'mot-rej-ped-comp/:id/:operacao',
    component: CrudeMotRejPedCompDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ped-compra',
    component: CrudePedCompraListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ped-compra/:id',
    component: TabsPedCompraComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ped-compra/:id/:operacao',
    component: TabsPedCompraComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'aprova-ped-bonif',
    component: CrudeAprovaPedBonifListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'aprova-ped-bonif/aprova/:id',
    component: CrudeAprovaPedBonifAprovaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'aprova-ped-bonif/rejeita/:id',
    component: CrudeAprovaPedBonifRejeitaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solic-apro-ped-bonif',
    component: CrudeSolicAproPedBonifListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solic-apro-ped-bonif/:id',
    component: CrudeSolicAproPedBonifDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solic-apro-ped-bonif/:id/:operacao',
    component: CrudeSolicAproPedBonifDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item',
    component: CrudeSolicAproPedBonifItemListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:id',
    component: CrudeSolicAproPedBonifItemDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:id/:operacao',
    component: CrudeSolicAproPedBonifItemDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  // {
  //   path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:IDSolicAprovPVItem/filho/ped-venda',
  //   component: CrudePedVendaListagemComponent,
  //   canActivate: [ValidarPermissaoRotaService]
  // },
  // {
  //   path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:IDSolicAprovPVItem/filho/ped-venda/:id',
  //   component: TabsPedVendaComponent,
  //   canActivate: [ValidarPermissaoRotaService]
  // },
  // {
  //   path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:IDSolicAprovPVItem/filho/ped-venda/filho/ped-venda-item/:id',
  //   component: CrudePedVendaItemDetalheComponent,
  //   canActivate: [ValidarPermissaoRotaService]
  // },
  // {
  //   path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:IDSolicAprovPVItem/filho/ped-venda/filho/ped-venda-item/:id/:operacao',
  //   component: CrudePedVendaItemDetalheComponent,
  //   canActivate: [ValidarPermissaoRotaService]
  // },
  // {
  //   path: 'solic-apro-ped-bonif/:idPai/filho/solic-apro-ped-bonif-item/:IDSolicAprovPVItem/filho/ped-venda/:id/:operacao',
  //   component: TabsPedVendaComponent,
  //   canActivate: [ValidarPermissaoRotaService]
  // },



  {
    path: 'ped-venda',
    component: CrudePedVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ped-venda/:id',
    component: TabsPedVendaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'ped-venda/:id/:operacao',
    component: TabsPedVendaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },

  //RELATÓRIOS
  {
    path: 'operacoes/oper0006',
    component: Oper0006Component,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'operacoes/oper0007',
    component: Oper0007Component,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'operacoes/oper0008',
    component: Oper0008Component,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'operacoes/oper0009',
    component: Oper0009Component,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'operacoes/oper0010',
    component: Oper0010Component,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'operacoes/oper0012',
    component: Oper0012Component,
    canActivate: [ValidarPermissaoRotaService]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FvendaRoutingModule { }
