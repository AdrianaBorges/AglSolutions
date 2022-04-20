import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroBarraAcaoComponent } from './cadastro-barra-acao.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroBarraAcaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroBarraAcaoRoutingRoutingModule { }
