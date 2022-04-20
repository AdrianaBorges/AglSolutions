import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiGrpEstService } from '../../../../api/api-grp-est.service';

@Component({
  selector: 'app-crude-grp-est-listagem',
  templateUrl: './crude-grp-est-listagem.component.html',
  styleUrls: ['./crude-grp-est-listagem.component.scss']
})
export class CrudeGrpEstListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/fvenda/grp-est';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiGrpEstService: ApiGrpEstService,
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
    return this.apiGrpEstService.getColunasGrid();
  }




}
