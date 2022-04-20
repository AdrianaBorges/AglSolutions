import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudeFinalidadeNfeDetalheComponent } from './ui/crude/finalidade-Nfe/crude-finalidade-nfe-detalhe/crude-finalidade-nfe-detalhe.component';
import { CrudeFinalidadeNfeListagemComponent } from './ui/crude/finalidade-Nfe/crude-finalidade-nfe-listagem/crude-finalidade-nfe-listagem.component';
import { CrudeModeloDfeListagemComponent } from './ui/crude/modelo-dfe/crude-modelo-dfe-listagem/crude-modelo-dfe-listagem.component';
import { CrudeModeloDfeDetalheComponent } from './ui/crude/modelo-dfe/crude-modelo-dfe-detalhe/crude-modelo-dfe-detalhe.component';
import { CrudeSituacaoCteDetalheComponent } from './ui/crude/situacao-cte/crude-situacao-cte-detalhe/crude-situacao-cte-detalhe.component';
import { CrudeSituacaoCteListagemComponent } from './ui/crude/situacao-cte/crude-situacao-cte-listagem/crude-situacao-cte-listagem.component';
import { CrudeSituacaoNfeListagemComponent } from './ui/crude/situacao-nfe/crude-situacao-nfe-listagem/crude-situacao-nfe-listagem.component';
import { CrudeSituacaoNfeDetalheComponent } from './ui/crude/situacao-nfe/crude-situacao-nfe-detalhe/crude-situacao-nfe-detalhe.component';
import { CrudeStatusConfNfeDetalheComponent } from './ui/crude/status-conf-nfe/crude-status-conf-nfe-detalhe/crude-status-conf-nfe-detalhe.component';
import { CrudeStatusConfNfeListagemComponent } from './ui/crude/status-conf-nfe/crude-status-conf-nfe-listagem/crude-status-conf-nfe-listagem.component';
import { CrudeStatusDfeEventoListagemComponent } from './ui/crude/status-dfe-evento/crude-status-dfe-evento-listagem/crude-status-dfe-evento-listagem.component';
import { CrudeStatusDfeEventoDetalheComponent } from './ui/crude/status-dfe-evento/crude-status-dfe-evento-detalhe/crude-status-dfe-evento-detalhe.component';
import { CrudeTipoCteDetalheComponent } from './ui/crude/tipo-cte/crude-tipo-cte-detalhe/crude-tipo-cte-detalhe.component';
import { CrudeTipoCteListagemComponent } from './ui/crude/tipo-cte/crude-tipo-cte-listagem/crude-tipo-cte-listagem.component';
import { CrudeTipoEmissaoDfeListagemComponent } from './ui/crude/tipo-emissao-dfe/crude-tipo-emissao-dfe-listagem/crude-tipo-emissao-dfe-listagem.component';
import { CrudeTipoEmissaoDfeDetalheComponent } from './ui/crude/tipo-emissao-dfe/crude-tipo-emissao-dfe-detalhe/crude-tipo-emissao-dfe-detalhe.component';
import { CrudeTipoEventoDfeDetalheComponent } from './ui/crude/tipo-evento-dfe/crude-tipo-evento-dfe-detalhe/crude-tipo-evento-dfe-detalhe.component';
import { CrudeTipoEventoDfeListagemComponent } from './ui/crude/tipo-evento-dfe/crude-tipo-evento-dfe-listagem/crude-tipo-evento-dfe-listagem.component';
import { CrudeTipoTomadorCteListagemComponent } from './ui/crude/tipo-tomador-cte/crude-tipo-tomador-cte-listagem/crude-tipo-tomador-cte-listagem.component';
import { CrudeTipoTomadorCteDetalheComponent } from './ui/crude/tipo-tomador-cte/crude-tipo-tomador-cte-detalhe/crude-tipo-tomador-cte-detalhe.component';
import { CrudeNfeListagemComponent } from './ui/crude/nfe/crude-nfe-listagem/crude-nfe-listagem.component';
import { CrudeNfeDetalheComponent } from './ui/crude/nfe/crude-nfe-detalhe/crude-nfe-detalhe.component';

// Controle de rotas
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';

const routes: Routes = [
  {
    path: 'finalidade-nfe',
    component: CrudeFinalidadeNfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'finalidade-nfe/:id',
    component: CrudeFinalidadeNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'finalidade-nfe/:id/:operacao',
    component: CrudeFinalidadeNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'modelo-dfe',
    component: CrudeModeloDfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'modelo-dfe/:id',
    component: CrudeModeloDfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'modelo-dfe/:id/:operacao',
    component: CrudeModeloDfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cte',
    component: CrudeSituacaoCteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cte/:id',
    component: CrudeSituacaoCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cte/:id/:operacao',
    component: CrudeSituacaoCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-nfe',
    component: CrudeSituacaoNfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-nfe/:id',
    component: CrudeSituacaoNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-nfe/:id/:operacao',
    component: CrudeSituacaoNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'situacao-cte/:id/:operacao',
    component: CrudeSituacaoCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'status-conf-nfe',
    component: CrudeStatusConfNfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'status-conf-nfe/:id',
    component: CrudeStatusConfNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'status-conf-nfe/:id/:operacao',
    component: CrudeStatusConfNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'status-dfe-evento',
    component: CrudeStatusDfeEventoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'status-dfe-evento/:id',
    component: CrudeStatusDfeEventoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'status-dfe-evento/:id/:operacao',
    component: CrudeStatusDfeEventoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cte',
    component: CrudeTipoCteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cte/:id',
    component: CrudeTipoCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-cte/:id/:operacao',
    component: CrudeTipoCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-emissao-dfe',
    component: CrudeTipoEmissaoDfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-emissao-dfe/:id',
    component: CrudeTipoEmissaoDfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-emissao-dfe/:id/:operacao',
    component: CrudeTipoEmissaoDfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-evento-dfe',
    component: CrudeTipoEventoDfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-evento-dfe/:id',
    component: CrudeTipoEventoDfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-evento-dfe/:id/:operacao',
    component: CrudeTipoEventoDfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-tomador-cte',
    component: CrudeTipoTomadorCteListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-tomador-cte/:id',
    component: CrudeTipoTomadorCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'tipo-tomador-cte/:id/:operacao',
    component: CrudeTipoTomadorCteDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'nfe',
    component: CrudeNfeListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'nfe/:id',
    component: CrudeNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'nfe/:id/:operacao',
    component: CrudeNfeDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdfeRoutingModule { }
