import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiSituacaoAtenPedService } from '../../../../api/api-situacao-aten-ped.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-situacao-aten-ped-listagem',
  templateUrl: './crude-situacao-aten-ped-listagem.component.html',
  styleUrls: ['./crude-situacao-aten-ped-listagem.component.scss']
})
export class CrudeSituacaoAtenPedListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-aten-ped';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoAtenPedService: ApiSituacaoAtenPedService,
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
    return this.apiSituacaoAtenPedService.getColunasGrid();
  }

}
