import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiSituacaoDocCrService } from '../../../../api/api-situacao-doc-cr.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
selector: 'app-crude-situacao-doc-cr-listagem',
templateUrl: './crude-situacao-doc-cr-listagem.component.html',
styleUrls: ['./crude-situacao-doc-cr-listagem.component.scss']
})
export class CrudeSituacaoDocCrListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/situacao-doc-cr';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoDocCrService: ApiSituacaoDocCrService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSituacaoDocCrService.getColunasGrid();
  }
}
