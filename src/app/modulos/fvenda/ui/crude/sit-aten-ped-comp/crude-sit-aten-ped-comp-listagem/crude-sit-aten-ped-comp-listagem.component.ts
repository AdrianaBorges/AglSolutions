import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiSitAtenPedCompService } from '../../../../api/api-sit-aten-ped-comp.service';


@Component({
  selector: 'app-crude-sit-aten-ped-comp-listagem',
  templateUrl: './crude-sit-aten-ped-comp-listagem.component.html',
  styleUrls: ['./crude-sit-aten-ped-comp-listagem.component.scss']
})
export class CrudeSitAtenPedCompListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/sit-aten-ped-comp';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSitAtenPedCompService: ApiSitAtenPedCompService,
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
    return this.apiSitAtenPedCompService.getColunasGrid();
  }

}
