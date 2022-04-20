import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
//import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiAssistSegService } from '../../../../api/api-assist-seg.service';



@Component({
  selector: 'app-crude-assist-seg-listagem',
  templateUrl: './crude-assist-seg-listagem.component.html',
  styleUrls: ['./crude-assist-seg-listagem.component.scss']
})
export class CrudeAssistSegListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiAssistSegService: ApiAssistSegService
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiAssistSegService.getColunasGrid();
  }

}
