import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiProdSegValorService } from '../../../../api/api-prod-seg-valor.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-prod-seg-valor-listagem',
  templateUrl: './crude-prod-seg-valor-listagem.component.html',
  styleUrls: ['./crude-prod-seg-valor-listagem.component.scss']
})
export class CrudeProdSegValorListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiProdSegValorService: ApiProdSegValorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiProdSegValorService.getColunasGrid();
  }


}
