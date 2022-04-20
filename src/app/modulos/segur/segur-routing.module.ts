import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Controle de rotas
import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';

//PÁGINAS
import { CrudeUsuariosListagemComponent } from './ui/crude/usuario/crude-usuario-listagem/crude-usuario-listagem.component';
import { CrudeTipoUsuarioDetalheComponent } from './ui/crude/tipo-usuario/crude-tipo-usuario-detalhe/crude-tipo-usuario-detalhe.component';
import { CrudeTipoUsuarioListagemComponent } from './ui/crude/tipo-usuario/crude-tipo-usuario-listagem/crude-tipo-usuario-listagem.component';
import { CrudeTipoMenuOpcaoDetalheComponent } from './ui/crude/tipo-menu-opcao/crude-tipo-menu-opcao-detalhe/crude-tipo-menu-opcao-detalhe.component';
import { CrudeTipoMenuOpcaoListagemComponent } from './ui/crude/tipo-menu-opcao/crude-tipo-menu-opcao-listagem/crude-tipo-menu-opcao-listagem.component';
import { TabsUsuarioComponent } from './ui/crude/usuario/tabs-usuario/tabs-usuario.component';
import { CrudeProgramaListagemComponent } from './ui/crude/programa/crude-programa-listagem/crude-programa-listagem.component';

//PÁGINAS FILHAS
import { CrudeProgramaNivelListagemComponent } from './ui/crude/programa-nivel/crude-programa-nivel-listagem/crude-programa-nivel-listagem.component';
import { CrudeProgramaNivelDetalheComponent } from './ui/crude/programa-nivel/crude-programa-nivel-detalhe/crude-programa-nivel-detalhe.component';
import { CrudeSegurancaProgramaListagemComponent } from './ui/crude/seguranca-programa/crude-seguranca-programa-listagem/crude-seguranca-programa-listagem.component';
import { CrudeSegurancaProgramaDetalheComponent } from './ui/crude/seguranca-programa/crude-seguranca-programa-detalhe/crude-seguranca-programa-detalhe.component';
import { CrudeGrupoDeUsuarioListagemComponent } from './ui/crude/grupo-de-usuario/crude-grupo-de-usuario-listagem/crude-grupo-de-usuario-listagem.component';
import { TabsGrupoDeUsuarioComponent } from './ui/crude/grupo-de-usuario/tabs-grupo-de-usuario/tabs-grupo-de-usuario.component';
import { CrudeProgramaDetalheComponent } from './ui/crude/programa/crude-programa-detalhe/crude-programa-detalhe.component';

const routes: Routes = [
  {
    path: 'usuario',
    component: CrudeUsuariosListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'usuario/:id',
    component: TabsUsuarioComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: 'usuario/:id/:operacao',
    component: TabsUsuarioComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "tipo-menu-opcao",
    component: CrudeTipoMenuOpcaoListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "tipo-menu-opcao/:id",
    component: CrudeTipoMenuOpcaoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "tipo-menu-opcao/:id/:operacao",
    component: CrudeTipoMenuOpcaoDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "tipo-usuario",
    component: CrudeTipoUsuarioListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "tipo-usuario/:id",
    component: CrudeTipoUsuarioDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "tipo-usuario/:id/:operacao",
    component: CrudeTipoUsuarioDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "grupo-de-usuario",
    component: CrudeGrupoDeUsuarioListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "grupo-de-usuario/:id",
    component: TabsGrupoDeUsuarioComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "grupo-de-usuario/:id/:operacao",
    component: TabsGrupoDeUsuarioComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa",
    component: CrudeProgramaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id",
    component: CrudeProgramaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/:operacao",
    component: CrudeProgramaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/filho/programa-nivel",
    component: CrudeProgramaNivelListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/filho/programa-nivel/:IDProgramaNivel",
    component: CrudeProgramaNivelDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/filho/programa-nivel/:IDProgramaNivel/:operacao",
    component: CrudeProgramaNivelDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/filho/programa-nivel/:IDProgramaNivel/filho/seguranca-programa",
    component: CrudeSegurancaProgramaListagemComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/filho/programa-nivel/:IDProgramaNivel/filho/seguranca-programa/:IDSegurancaPrograma",
    component: CrudeSegurancaProgramaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  },
  {
    path: "programa/:id/filho/programa-nivel/:IDProgramaNivel/filho/seguranca-programa/:IDSegurancaPrograma/:operacao",
    component: CrudeSegurancaProgramaDetalheComponent,
    canActivate: [ValidarPermissaoRotaService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurRoutingModule { }
