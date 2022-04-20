import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Controle de rotas
import { ValidarPermissaoRotaService } from './validar-permissao-rota.service';

import { AutenticacaoUsuarioComponent } from './modulos/segur/ui/autenticacao-usuario/autenticacao-usuario.component';
import { EsqueciSenhaComponent } from './modulos/segur/ui/esqueci-senha/esqueci-senha.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RedirectAcessoComponent } from './modulos/principal/redirect-acesso/redirect-acesso.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AutenticacaoUsuarioComponent, canActivate: [ValidarPermissaoRotaService] },
  { path: 'esqueciasenha', component: EsqueciSenhaComponent },
  { path: 'redirectacesso/:token/:url_redirect', component: RedirectAcessoComponent},
  { path: '**', component: PaginaNaoEncontradaComponent, canActivate: [ValidarPermissaoRotaService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
