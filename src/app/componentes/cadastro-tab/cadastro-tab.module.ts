import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { CadastroTabDirective } from './cadastro-tab.directive';
import { CadastroBarraAcaoModule } from '../cadastro-barra-acao/cadastro-barra-acao.module';

@NgModule({
  // imports: [
  //   CommonModule
  // ],
  imports: [
    CadastroBarraAcaoModule
  ],
  declarations: [CadastroTabDirective],
  exports: [CadastroTabDirective]
})
export class CadastroTabModule { }
