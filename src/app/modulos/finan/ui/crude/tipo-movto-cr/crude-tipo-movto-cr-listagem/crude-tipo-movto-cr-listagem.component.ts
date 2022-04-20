import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoMovtoCrService } from '../../../../api/api-tipo-movto-cr.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-tipo-movto-cr-listagem',
  templateUrl: './crude-tipo-movto-cr-listagem.component.html',
  styleUrls: ['./crude-tipo-movto-cr-listagem.component.scss']
})
export class CrudeTipoMovtoCRListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/tipo-movto-cr';

    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;


  constructor(
    public apiTipoMovtoCrService: ApiTipoMovtoCrService,
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
    return this.apiTipoMovtoCrService.getColunasGrid();
  }

}
