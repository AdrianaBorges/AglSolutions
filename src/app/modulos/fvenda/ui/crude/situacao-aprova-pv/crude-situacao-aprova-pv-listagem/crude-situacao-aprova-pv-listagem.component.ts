import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiSituacaoSolAprPvService } from '../../../../api/api-situacao-sol-apr-pv.service';

@Component({
  selector: 'app-crude-situacao-aprova-pv-listagem',
  templateUrl: './crude-situacao-aprova-pv-listagem.component.html',
  styleUrls: ['./crude-situacao-aprova-pv-listagem.component.scss']
})
export class CrudeSituacaoAprovaPvListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-aprova-pv';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoSolAprPvService: ApiSituacaoSolAprPvService,
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
    return this.apiSituacaoSolAprPvService.getColunasGrid();
  }
}
