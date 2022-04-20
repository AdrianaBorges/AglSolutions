import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

//Telerik Kendo.UI
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogModule } from '@progress/kendo-angular-dialog';

import { GridPesquisaComponent } from './grid-pesquisa.component';
import { GridFiltroExternoDirective } from './grid-filtro-externo.directive';
import { GridPesquisaContainerBotoesAcaoLinhaComponent } from './templates/grid-pesquisa-container-botoes-acao-linha/grid-pesquisa-container-botoes-acao-linha.component';
import { GridPesquisaBotaoAcaoLinhaComponent } from './templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-botao-acao-linha.component';

//COMPONENTES MODULES
import { AguardeCarregandoModule } from '../aguarde-carregando/aguarde-carregando.module';
import { CaixaDialogoModule } from '../caixa-dialogo/caixa-dialogo.module';

import { GridPesquisaDetalheTemplateDirective } from './directives/grid-pesquisa-detalhe-template.directive'

@NgModule({
  providers: [
    DatePipe,
    CurrencyPipe,
  ],
  imports: [
    CommonModule,
    GridModule, PDFModule, ExcelModule,
    IntlModule,
    ButtonsModule,
    InputsModule,
    DialogModule,

    //Componentes modules
    AguardeCarregandoModule,
    CaixaDialogoModule,
  ],
  declarations: [
    GridPesquisaComponent,
    GridFiltroExternoDirective,
    GridPesquisaContainerBotoesAcaoLinhaComponent,
    GridPesquisaBotaoAcaoLinhaComponent,
    GridPesquisaDetalheTemplateDirective,
  ],
  exports: [
    GridPesquisaComponent,
    GridFiltroExternoDirective,
    GridPesquisaContainerBotoesAcaoLinhaComponent,
    GridPesquisaBotaoAcaoLinhaComponent,
    GridPesquisaDetalheTemplateDirective
  ]
})
export class GridPesquisaModule { }
