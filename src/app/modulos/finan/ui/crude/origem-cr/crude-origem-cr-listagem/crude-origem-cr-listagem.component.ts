import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiOrigemCrService } from '../../../../api/api-origem-cr.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
selector: 'app-crude-origem-cr-listagem',
templateUrl: './crude-origem-cr-listagem.component.html',
styleUrls: ['./crude-origem-cr-listagem.component.scss']
})
export class CrudeOrigemCrListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/origem-cr';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiOrigemCrService: ApiOrigemCrService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiOrigemCrService.getColunasGrid();
  }
}
