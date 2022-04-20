import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiProdSegCoberturaService } from '../../../../api/api-prod-seg-cobertura.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crude-prod-seg-cobertura-listagem',
  templateUrl: './crude-prod-seg-cobertura-listagem.component.html',
  styleUrls: ['./crude-prod-seg-cobertura-listagem.component.scss']
})
export class CrudeProdSegCoberturaListagemComponent implements OnInit {


  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiProdSegCoberturaService: ApiProdSegCoberturaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiProdSegCoberturaService.getColunasGrid();
  }

}
