import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiGrupoSeguroService } from '../../../../api/api-grupo-seguro.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-grupo-seguro-listagem',
  templateUrl: './crude-grupo-seguro-listagem.component.html',
  styleUrls: ['./crude-grupo-seguro-listagem.component.scss']
})
export class CrudeGrupoSeguroListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/eseg/grupo-seguro';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiGrupoSeguroService: ApiGrupoSeguroService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Banco',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiGrupoSeguroService.getColunasGrid();
  }


}
