import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoFaturaCrService } from '../../../../api/api-tipo-fatura-cr.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-tipo-fatura-cr-listagem',
  templateUrl: './crude-tipo-fatura-cr-listagem.component.html',
  styleUrls: ['./crude-tipo-fatura-cr-listagem.component.scss']
})
export class CrudeTipoFaturaCRListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/tipo-fatura-cr';

    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;


  constructor(
    public apiTipoFaturaCrService: ApiTipoFaturaCrService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiTipoFaturaCrService.getColunasGrid();
  }

}
