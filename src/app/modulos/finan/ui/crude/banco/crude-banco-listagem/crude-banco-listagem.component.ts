import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiBancoService } from '../../../../api/api-banco.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-banco-listagem',
  templateUrl: './crude-banco-listagem.component.html',
  styleUrls: ['./crude-banco-listagem.component.scss']
})
export class CrudeBancoListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/banco';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiBancoService: ApiBancoService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }
  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiBancoService.getColunasGrid();
  }

}
