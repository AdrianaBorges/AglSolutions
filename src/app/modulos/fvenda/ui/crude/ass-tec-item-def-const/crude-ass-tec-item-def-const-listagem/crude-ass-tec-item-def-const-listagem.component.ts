import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ApiAssTecItemDefConstService } from '../../../../api/api-ass-tec-item-def-const.service';

@Component({
  selector: 'app-crude-ass-tec-item-def-const-listagem',
  templateUrl: './crude-ass-tec-item-def-const-listagem.component.html',
  styleUrls: ['./crude-ass-tec-item-def-const-listagem.component.scss']
})
export class CrudeAssTecItemDefConstListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(

    public apiAssTecItemDefConstService: ApiAssTecItemDefConstService
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiAssTecItemDefConstService.getColunasGrid();
  }


  public btn_acao_exibir(dados: GridPesquisaColunaEditarBotaoClick): boolean {
    if (dados.botao.id == 'Update') {
      return dados.dataItem.inCodSituacaoAssTecItem == 1;
    } else if (dados.botao.id == 'Delete') {
      return dados.dataItem.inCodSituacaoAssTecItem == 1;
    } else {
      //retorno true para qualquer outro botão que não fiz validação aqui
      return true;
    }
  }
}
