import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiProdSegCondPagtoService } from '../../../../api/api-prod-seg-cond-pagto.service';

@Component({
  selector: 'app-crude-prod-seg-cond-pagto-listagem',
  templateUrl: './crude-prod-seg-cond-pagto-listagem.component.html',
  styleUrls: ['./crude-prod-seg-cond-pagto-listagem.component.scss']
})
export class CrudeProdSegCondPagtoListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiProdSegCondPagtoService: ApiProdSegCondPagtoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiProdSegCondPagtoService.getColunasGrid();
  }

}
