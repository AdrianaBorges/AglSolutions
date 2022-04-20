import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ApiTabPrecoItemEL01Service } from '../../../../api/api-tab-preco-item-el01.service';


@Component({
  selector: 'app-crude-tab-preco-item-listagem',
  templateUrl: './crude-tab-preco-item-listagem.component.html',
  styleUrls: ['./crude-tab-preco-item-listagem.component.scss']
})
export class CrudeTabPrecoItemListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    private route: ActivatedRoute,
    public apiTabPrecoItemEL01Service: ApiTabPrecoItemEL01Service,
  ) { }

  ngOnInit() {
   
  }
  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiTabPrecoItemEL01Service.getColunasGrid();
  }


  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    //retorno true para qualquer outro botão que não fiz validação aqui
    return true;

  }
}
