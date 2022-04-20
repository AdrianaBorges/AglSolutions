import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiSorteioSegService } from '../../../../api/api-sorteio-seg.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-sorteio-seg-listagem',
  templateUrl: './crude-sorteio-seg-listagem.component.html',
  styleUrls: ['./crude-sorteio-seg-listagem.component.scss']
})
export class CrudeSorteioSegListagemComponent implements OnInit {

 
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSorteioSegService: ApiSorteioSegService
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSorteioSegService.getColunasGrid();
  }

}
