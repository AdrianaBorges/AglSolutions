import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiItemLoteSerieEl01Service } from '../../../../api/api-item-lote-serie-el01.service';

@Component({
  selector: 'app-crude-item-lote-serie-listagem',
  templateUrl: './crude-item-lote-serie-listagem.component.html',
  styleUrls: ['./crude-item-lote-serie-listagem.component.scss']
})
export class CrudeItemLoteSerieListagemComponent implements OnInit {



  public gridRotasCadastro: string = '/modulos/fvenda/item-lote-serie';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiItemLoteSerieEl01Service: ApiItemLoteSerieEl01Service,
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
    return this.apiItemLoteSerieEl01Service.getColunasGrid();
  }



}
