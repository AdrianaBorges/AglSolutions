import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiMicrorregiaoService } from '../../../../api/api-microrregiao.service';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-microrregiao-listagem',
  templateUrl: './crude-microrregiao-listagem.component.html',
  styleUrls: ['./crude-microrregiao-listagem.component.scss']
})
export class CrudeMicrorregiaoListagemComponent implements OnInit {



  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiMicrorregiaoService: ApiMicrorregiaoService
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiMicrorregiaoService.getColunasGrid();
  }

}
