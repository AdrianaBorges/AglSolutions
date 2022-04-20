import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiGrupoEstabService } from '../../../../api/api-grupo-estab.service';

@Component({
  selector: 'app-crude-grupo-estab-listagem',
  templateUrl: './crude-grupo-estab-listagem.component.html',
  styleUrls: ['./crude-grupo-estab-listagem.component.scss']
})
export class CrudeGrupoEstabListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/grupo-estab';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiGrupoEstabService: ApiGrupoEstabService,
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
    return this.apiGrupoEstabService.getColunasGrid();
  }


}
