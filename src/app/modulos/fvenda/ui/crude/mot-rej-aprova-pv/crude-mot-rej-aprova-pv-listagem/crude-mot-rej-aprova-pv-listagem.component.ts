import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiMotRejSolAprPvService } from '../../../../api/api-mot-rej-sol-apr-pv.service';

@Component({
  selector: 'app-crude-mot-rej-aprova-pv-listagem',
  templateUrl: './crude-mot-rej-aprova-pv-listagem.component.html',
  styleUrls: ['./crude-mot-rej-aprova-pv-listagem.component.scss']
})
export class CrudeMotRejAprovaPvListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/mot-rej-aprova-pv';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiMotRejSolAprPvService: ApiMotRejSolAprPvService,
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
    return this.apiMotRejSolAprPvService.getColunasGrid();
  }
}
