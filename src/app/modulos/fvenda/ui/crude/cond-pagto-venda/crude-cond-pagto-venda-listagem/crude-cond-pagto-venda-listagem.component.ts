import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiCondPagtoVendaService } from '../../../../api/api-cond-pagto-venda.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-cond-pagto-venda-listagem',
  templateUrl: './crude-cond-pagto-venda-listagem.component.html',
  styleUrls: ['./crude-cond-pagto-venda-listagem.component.scss']
})
export class CrudeCondPagtoVendaListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/cond-pagto-venda';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiCondPagtoVendaService: ApiCondPagtoVendaService,
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
    return this.apiCondPagtoVendaService.getColunasGrid();
  }


}
