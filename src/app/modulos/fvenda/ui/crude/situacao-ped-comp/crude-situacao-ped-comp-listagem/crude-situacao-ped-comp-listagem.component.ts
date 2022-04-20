import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiSituacaoPedCompService } from '../../../../api/api-situacao-ped-comp.service';

@Component({
  selector: 'app-crude-situacao-ped-comp-listagem',
  templateUrl: './crude-situacao-ped-comp-listagem.component.html',
  styleUrls: ['./crude-situacao-ped-comp-listagem.component.scss']
})
export class CrudeSituacaoPedCompListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-ped-comp';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoPedCompService: ApiSituacaoPedCompService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    //var id = this.route.snapshot.paramMap.get('id');
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiSituacaoPedCompService.getColunasGrid();
  }
}
