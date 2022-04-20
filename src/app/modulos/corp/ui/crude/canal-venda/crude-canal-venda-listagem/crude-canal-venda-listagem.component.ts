import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { ApiCanalVendaService } from '../../../../api/api-canal-venda.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
@Component({
  selector: 'app-crude-canal-venda-listagem',
  templateUrl: './crude-canal-venda-listagem.component.html',
  styleUrls: ['./crude-canal-venda-listagem.component.scss']
})
export class CrudeCanalVendaListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/corp/canal-venda';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiCanalVendaService: ApiCanalVendaService,
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
    return this.apiCanalVendaService.getColunasGrid();
  }


}
