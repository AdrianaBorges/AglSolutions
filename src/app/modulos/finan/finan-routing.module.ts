
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Controle de rotas
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';

import { CrudeTipoCobrancaDetalheComponent } from './ui/crude/tipo-cobranca/crude-tipo-cobranca-detalhe/crude-tipo-cobranca-detalhe.component';
import { CrudeTipoCobrancaListagemComponent } from './ui/crude/tipo-cobranca/crude-tipo-cobranca-listagem/crude-tipo-cobranca-listagem.component';
import { CrudeBancoDetalheComponent } from './ui/crude/banco/crude-banco-detalhe/crude-banco-detalhe.component';
import { CrudeCondPagtoListagemComponent } from './ui/crude/cond-pagto/crude-cond-pagto-listagem/crude-cond-pagto-listagem.component';
import { CrudeBancoListagemComponent } from './ui/crude/banco/crude-banco-listagem/crude-banco-listagem.component';
import { CrudeTipoContaBancoDetalheComponent } from './ui/crude/tipo-conta-banco/crude-tipo-conta-banco-detalhe/crude-tipo-conta-banco-detalhe.component';
import { CrudeTipoContaBancoListagemComponent } from './ui/crude/tipo-conta-banco/crude-tipo-conta-banco-listagem/crude-tipo-conta-banco-listagem.component';
import { CrudeTipoMatriculaCobDetalheComponent } from './ui/crude/tipo-matricula-cob/crude-tipo-matricula-cob-detalhe/crude-tipo-matricula-cob-detalhe.component';
import { CrudeTipoMatriculaCobListagemComponent } from './ui/crude/tipo-matricula-cob/crude-tipo-matricula-cob-listagem/crude-tipo-matricula-cob-listagem.component';
import { CrudeCondPagtoDetalheComponent } from './ui/crude/cond-pagto/crude-cond-pagto-detalhe/crude-cond-pagto-detalhe.component';
import { CrudeFormaCobrancaDetalheComponent } from './ui/crude/forma-cobranca/crude-forma-cobranca-detalhe/crude-forma-cobranca-detalhe.component';
import { CrudeFormaCobrancaListagemComponent } from './ui/crude/forma-cobranca/crude-forma-cobranca-listagem/crude-forma-cobranca-listagem.component';
import { CrudePortadorListagemComponent } from './ui/crude/portador/crude-portador-listagem/crude-portador-listagem.component';
import { CrudePortadorDetalheComponent } from './ui/crude/portador/crude-portador-detalhe/crude-portador-detalhe.component';
import { CrudeTipoEspecieCrListagemComponent } from './ui/crude/tipo-especie-cr/crude-tipo-especie-cr-listagem/crude-tipo-especie-cr-listagem.component';
import { CrudeTipoEspecieCrDetalheComponent } from './ui/crude/tipo-especie-cr/crude-tipo-especie-cr-detalhe/crude-tipo-especie-cr-detalhe.component';
import { CrudeSituacaoDocCrListagemComponent } from './ui/crude/situacao-doc-cr/crude-situacao-doc-cr-listagem/crude-situacao-doc-cr-listagem.component';
import { CrudeSituacaoDocCrDetalheComponent } from './ui/crude/situacao-doc-cr/crude-situacao-doc-cr-detalhe/crude-situacao-doc-cr-detalhe.component';
import { CrudeOrigemCrListagemComponent } from './ui/crude/origem-cr/crude-origem-cr-listagem/crude-origem-cr-listagem.component';
import { CrudeOrigemCrDetalheComponent } from './ui/crude/origem-cr/crude-origem-cr-detalhe/crude-origem-cr-detalhe.component';
import { CrudeCarteiraCrListagemComponent } from './ui/crude/carteira-cr/crude-carteira-cr-listagem/crude-carteira-cr-listagem.component';
import { CrudeCarteiraCrDetalheComponent } from './ui/crude/carteira-cr/crude-carteira-cr-detalhe/crude-carteira-cr-detalhe.component';
import { CrudeTipoFaturaCRListagemComponent } from './ui/crude/tipo-fatura-cr/crude-tipo-fatura-cr-listagem/crude-tipo-fatura-cr-listagem.component';
import { CrudeTipoFaturaCRDetalheComponent } from './ui/crude/tipo-fatura-cr/crude-tipo-fatura-cr-detalhe/crude-tipo-fatura-cr-detalhe.component';
import { CrudeTipoMovtoCRListagemComponent } from './ui/crude/tipo-movto-cr/crude-tipo-movto-cr-listagem/crude-tipo-movto-cr-listagem.component';
import { CrudeTipoMovtoCRDetalheComponent } from './ui/crude/tipo-movto-cr/crude-tipo-movto-cr-detalhe/crude-tipo-movto-cr-detalhe.component';


const routes: Routes = [
  {
    path: 'tipo-cobranca',
    component: CrudeTipoCobrancaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cobranca/:id',
    component: CrudeTipoCobrancaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cobranca/:id/:operacao',
    component: CrudeTipoCobrancaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'banco',
    component: CrudeBancoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'banco/:id',
    component: CrudeBancoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'banco/:id/:operacao',
    component: CrudeBancoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'banco/:id/:operacao',
    component: CrudeBancoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cond-pagto',
    component: CrudeCondPagtoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cond-pagto/:id',
    component: CrudeCondPagtoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cond-pagto/:id/:operacao',
    component: CrudeCondPagtoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-conta-banco',
    component: CrudeTipoContaBancoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-conta-banco/:id',
    component: CrudeTipoContaBancoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-conta-banco/:id/:operacao',
    component: CrudeTipoContaBancoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-matricula-cob',
    component: CrudeTipoMatriculaCobListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-matricula-cob/:id',
    component: CrudeTipoMatriculaCobDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-matricula-cob/:id/:operacao',
    component: CrudeTipoMatriculaCobDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'forma-cobranca',
    component: CrudeFormaCobrancaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'forma-cobranca/:id',
    component: CrudeFormaCobrancaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'forma-cobranca/:id/:operacao',
    component: CrudeFormaCobrancaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'portador',
    component: CrudePortadorListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'portador/:id',
    component: CrudePortadorDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'portador/:id/:operacao',
    component: CrudePortadorDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-especie-cr',
    component: CrudeTipoEspecieCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-especie-cr/:id/:operacao',
    component: CrudeTipoEspecieCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-doc-cr',
    component: CrudeSituacaoDocCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-doc-cr/:id',
    component: CrudeSituacaoDocCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-doc-cr/:id/:operacao',
    component: CrudeSituacaoDocCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-cr',
    component: CrudeOrigemCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-cr/:id',
    component: CrudeOrigemCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'origem-cr/:id/:operacao',
    component: CrudeOrigemCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'carteira-cr',
    component: CrudeCarteiraCrListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'carteira-cr/:id',
    component: CrudeCarteiraCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'carteira-cr/:id/:operacao',
    component: CrudeCarteiraCrDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  { path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-fatura-cr',
    component: CrudeTipoFaturaCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-fatura-cr/:id/:operacao',
    component: CrudeTipoFaturaCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  { path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },{
    path: 'tipo-movto-cr',
    component: CrudeTipoMovtoCRListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-movto-cr/:id/:operacao',
    component: CrudeTipoMovtoCRDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanRoutingModule { }
