import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiCondPagtoService } from '../../../../api/api-cond-pagto.service';

@Component({
  selector: 'app-crude-cond-pagto-listagem',
  templateUrl: './crude-cond-pagto-listagem.component.html',
  styleUrls: ['./crude-cond-pagto-listagem.component.scss']
})
export class CrudeCondPagtoListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/cond-pagto';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiCondPagtoService: ApiCondPagtoService
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
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1],//'Condição Pagamento',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiCondPagtoService.getColunasGrid();
  }


}
