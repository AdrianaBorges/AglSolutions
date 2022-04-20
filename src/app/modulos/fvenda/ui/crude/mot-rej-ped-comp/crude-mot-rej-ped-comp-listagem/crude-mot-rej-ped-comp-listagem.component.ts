import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiMotRejPedCompService } from '../../../../api/api-mot-rej-ped-comp.service';

@Component({
  selector: 'app-crude-mot-rej-ped-comp-listagem',
  templateUrl: './crude-mot-rej-ped-comp-listagem.component.html',
  styleUrls: ['./crude-mot-rej-ped-comp-listagem.component.scss']
})
export class CrudeMotRejPedCompListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/mot-rej-ped-comp';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiMotRejPedCompService: ApiMotRejPedCompService,
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
    return this.apiMotRejPedCompService.getColunasGrid();
  }
}
