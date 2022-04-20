import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiSituacaoCampService } from '../../../../api/api-situacao-camp.service';

@Component({
  selector: 'app-crude-situacao-camp-listagem',
  templateUrl: './crude-situacao-camp-listagem.component.html',
  styleUrls: ['./crude-situacao-camp-listagem.component.scss']
})
export class CrudeSituacaoCampListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-camp';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoCampService: ApiSituacaoCampService,
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
    return this.apiSituacaoCampService.getColunasGrid();
  }



}
