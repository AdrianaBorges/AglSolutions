import { Component, OnInit, 
         ContentChildren, QueryList,
          } from '@angular/core';
import { GridPesquisaBotaoAcaoLinhaComponent } from './../grid-pesquisa-botao-acao-linha/grid-pesquisa-botao-acao-linha.component';

/**
 * botão de ação do grid
 * ---
 * Esse elemento representa os botões de ação adicionais em cada 
 * linha do grid para redirecionar a rota para um cadastro filho 
 * ou mesmo responder ao evento de click com os dados do elemento
 * 
 * Documentação de referência:
 * * https://alligator.io/angular/reusable-components-ngtemplateoutlet/
 * * https://stackoverflow.com/questions/50420961/how-to-wrap-each-child-of-contentchildren-in-their-own-elements-in-angular
 * 
 */
@Component({
  selector: 'app-grid-pesquisa-container-botoes-acao-linha',
  templateUrl: './grid-pesquisa-container-botoes-acao-linha.component.html',
  styleUrls: ['./grid-pesquisa-container-botoes-acao-linha.component.scss']
})
export class GridPesquisaContainerBotoesAcaoLinhaComponent implements OnInit {

  @ContentChildren(GridPesquisaBotaoAcaoLinhaComponent) listaBotoesAcao: QueryList<GridPesquisaBotaoAcaoLinhaComponent>;

  constructor() { 
    this.listaBotoesAcao = new QueryList();
  }

  ngOnInit() {
  }

}
