import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColunaEditarBotaoClick } from '../../../../../../componentes/grid-pesquisa/templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
import { ApiAssTecItemDefAlegService } from '../../../../api/api-ass-tec-item-def-aleg.service';
import { ApiAssTecItemEL01Service } from '../../../../api/api-ass-tec-item-el01.service';
import { ModelAssTecItemEL01 } from '../../../../models/model-ass-tec-item-EL01';

@Component({
  selector: 'app-crude-ass-tec-item-def-aleg-listagem',
  templateUrl: './crude-ass-tec-item-def-aleg-listagem.component.html',
  styleUrls: ['./crude-ass-tec-item-def-aleg-listagem.component.scss']
})
export class CrudeAssTecItemDefAlegListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  public modelAssTecItemEL01: ModelAssTecItemEL01;
  constructor(
    private route: ActivatedRoute,
    public apiAssTecItemDefAlegService: ApiAssTecItemDefAlegService,
    private apiAssTecItemEL01Service:ApiAssTecItemEL01Service
  ) { }

  ngOnInit() {
    this.carregarDadosPai();
  }


  private carregarDadosPai() {
    var id = +this.route.snapshot.paramMap.get('IDAssTecItem');
    this.apiAssTecItemEL01Service.obter(id).then(
      programa => {
        this.modelAssTecItemEL01 = programa;
      }
    );
  }
  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiAssTecItemDefAlegService.getColunasGrid();
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
