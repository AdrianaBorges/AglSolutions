import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiSituacaoPedVenService } from '../../../../api/api-situacao-ped-ven.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-situacao-ped-ven-listagem',
  templateUrl: './crude-situacao-ped-ven-listagem.component.html',
  styleUrls: ['./crude-situacao-ped-ven-listagem.component.scss']
})
export class CrudeSituacaoPedVenListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-ped-ven';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoPedVenService: ApiSituacaoPedVenService,
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
    return this.apiSituacaoPedVenService.getColunasGrid();
  }

}
