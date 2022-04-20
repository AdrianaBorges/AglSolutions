import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiProdSegFormaCobService } from '../../../../api/api-prod-seg-forma-cob.service';

@Component({
  selector: 'app-crude-prod-seg-forma-cob-listagem',
  templateUrl: './crude-prod-seg-forma-cob-listagem.component.html',
  styleUrls: ['./crude-prod-seg-forma-cob-listagem.component.scss']
})
export class CrudeProdSegFormaCobListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiProdSegFormaCobService: ApiProdSegFormaCobService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiProdSegFormaCobService.getColunasGrid();
  }

}
