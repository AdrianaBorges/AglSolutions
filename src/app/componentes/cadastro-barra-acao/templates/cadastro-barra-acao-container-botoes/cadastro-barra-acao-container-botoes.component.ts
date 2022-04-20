import { Component, OnInit, 
         ContentChildren, QueryList,
         Input, Output, EventEmitter, 
   } from '@angular/core';
import { CadastroBarraAcaoBotaoComponent } from '../cadastro-barra-acao-botao/cadastro-barra-acao-botao.component';

@Component({
  selector: 'app-cadastro-barra-acao-container-botoes',
  templateUrl: './cadastro-barra-acao-container-botoes.component.html',
  styleUrls: ['./cadastro-barra-acao-container-botoes.component.scss']
})
export class CadastroBarraAcaoContainerBotoesComponent implements OnInit {

  @Input('dataItem') dataItem: any;
  //@ContentChildren(GridPesquisaBotaoAcaoLinhaComponent, {read: TemplateRef}) listaBotoesAcao: QueryList<GridPesquisaBotaoAcaoLinhaComponent>;
  @ContentChildren(CadastroBarraAcaoBotaoComponent) listaBotoesAcao: QueryList<CadastroBarraAcaoBotaoComponent>;

  constructor() { 
    this.listaBotoesAcao = new QueryList();
  }

  ngOnInit() {
  }

}
