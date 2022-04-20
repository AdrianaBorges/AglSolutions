import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Controle de rotas
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';

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
import { CrudeGrupoSeguroListagemComponent } from './ui/crude/grupo-seguro/crude-grupo-seguro-listagem/crude-grupo-seguro-listagem.component';
import { TabsGrupoSeguroComponent } from './ui/crude/grupo-seguro/tabs-grupo-seguro/tabs-grupo-seguro.component';
import { TabsSeguradoraComponent } from './ui/crude/seguradora/tabs-seguradora/tabs-seguradora.component';
import { CrudeSeguradoraListagemComponent } from './ui/crude/seguradora/crude-seguradora-listagem/crude-seguradora-listagem.component';
import { CrudePagadorListagemComponent } from './ui/crude/pagador/crude-pagador-listagem/crude-pagador-listagem.component';
import { TabsSeguradoFisicaComponent } from './ui/crude/segurado/tabs-segurado-fisica/tabs-segurado-fisica.component';
import { TabsPagadorFisicaComponent } from './ui/crude/pagador/tabs-pagador-fisica/tabs-pagador-fisica.component';
import { TabsPagadorJuridicaComponent } from './ui/crude/pagador/tabs-pagador-juridica/tabs-pagador-juridica.component';
import { CrudeSeguradoListagemComponent } from './ui/crude/segurado/crude-segurado-listagem/crude-segurado-listagem.component';
import { TabsSeguradoJuridicaComponent } from './ui/crude/segurado/tabs-segurado-juridica/tabs-segurado-juridica.component';
import { CrudeEstipulanteListagemComponent } from './ui/crude/estipulante/crude-estipulante-listagem/crude-estipulante-listagem.component';
import { TabsEstipulanteComponent } from './ui/crude/estipulante/tabs-estipulante/tabs-estipulante.component';
import { CrudeProdSegListagemComponent } from './ui/crude/prod-seg/crude-prod-seg-listagem/crude-prod-seg-listagem.component';
import { TabsProdSegComponent } from './ui/crude/prod-seg/tabs-prod-seg/tabs-prod-seg.component';
import { CrudeCtoCorSegListagemComponent } from './ui/crude/cto-cor-seg/crude-cto-cor-seg-listagem/crude-cto-cor-seg-listagem.component';
import { CrudeCtoCorSegDetalheComponent } from './ui/crude/cto-cor-seg/crude-cto-cor-seg-detalhe/crude-cto-cor-seg-detalhe.component';


const routes: Routes = [
  {
    path: 'tipo-seguro',
    component: CrudeTipoSeguroListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-seguro/:id',
    component: CrudeTipoSeguroDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-seguro/:id/:operacao',
    component: CrudeTipoSeguroDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-venda',
    component: CrudeSituacaoVendaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-venda/:id',
    component: CrudeSituacaoVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-venda/:id/:operacao',
    component: CrudeSituacaoVendaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grau-parent',
    component: CrudeGrauParentListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grau-parent/:id',
    component: CrudeGrauParentDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grau-parent/:id/:operacao',
    component: CrudeGrauParentDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cobranca-seg',
    component: CrudeTipoCobrancaSegListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cobranca-seg/:id',
    component: CrudeTipoCobrancaSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cobranca-seg/:id/:operacao',
    component: CrudeTipoCobrancaSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-capital-seg',
    component: CrudeTipoCapitalSegListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-capital-seg/:id',
    component: CrudeTipoCapitalSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-capital-seg/:id/:operacao',
    component: CrudeTipoCapitalSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-taxa-seg',
    component: CrudeTipoTaxaSegListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-taxa-seg/:id',
    component: CrudeTipoTaxaSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-taxa-seg/:id/:operacao',
    component: CrudeTipoTaxaSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-per-contrib',
    component: CrudeTipoPerContribListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-per-contrib/:id',
    component: CrudeTipoPerContribDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-per-contrib/:id/:operacao',
    component: CrudeTipoPerContribDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-seguro',
    component: CrudeGrupoSeguroListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-seguro/:id',
    component: TabsGrupoSeguroComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'grupo-seguro/:id/:operacao',
    component: TabsGrupoSeguroComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'seguradora',
    component: CrudeSeguradoraListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'seguradora/:id',
    component: TabsSeguradoraComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'seguradora/:id/:operacao',
    component: TabsSeguradoraComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pagador',
    component: CrudePagadorListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pagador/fisica/:id',
    component: TabsPagadorFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pagador/fisica/:id/:operacao',
    component: TabsPagadorFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pagador/juridica/:id',
    component: TabsPagadorJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'pagador/juridica/:id/:operacao',
    component: TabsPagadorJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'segurado',
    component: CrudeSeguradoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'segurado/fisica/:id',
    component: TabsSeguradoFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'segurado/fisica/:id/:operacao',
    component: TabsSeguradoFisicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'segurado/juridica/:id',
    component: TabsSeguradoJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'segurado/juridica/:id/:operacao',
    component: TabsSeguradoJuridicaComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'estipulante',
    component: CrudeEstipulanteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'estipulante/:id',
    component: TabsEstipulanteComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'estipulante/:id/:operacao',
    component: TabsEstipulanteComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'prod-seg',
    component: CrudeProdSegListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'prod-seg/:id',
    component: TabsProdSegComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'prod-seg/:id/:operacao',
    component: TabsProdSegComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cto-cor-seg',
    component: CrudeCtoCorSegListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cto-cor-seg/:id',
    component: CrudeCtoCorSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'cto-cor-seg/:id/:operacao',
    component: CrudeCtoCorSegDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsegRoutingModule { }
