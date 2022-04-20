import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
//import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiSequeciaValorService } from '../../../../api/api-sequecia-valor.service';

@Component({
  selector: 'app-crude-sequencia-valor-listagem',
  templateUrl: './crude-sequencia-valor-listagem.component.html',
  styleUrls: ['./crude-sequencia-valor-listagem.component.scss']
})
export class CrudeSequenciaValorListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSequenciaValorService: ApiSequeciaValorService
  ) { }

  ngOnInit() {
    
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiSequenciaValorService.getColunasGrid();
  }

}
