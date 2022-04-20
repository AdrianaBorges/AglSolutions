import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiCarteiraCrService } from '../../../../api/api-carteira-cr.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-carteira-cr-listagem',
  templateUrl: './crude-carteira-cr-listagem.component.html',
  styleUrls: ['./crude-carteira-cr-listagem.component.scss']
})
export class CrudeCarteiraCrListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/carteira-cr';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiCarteiraCrService: ApiCarteiraCrService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiCarteiraCrService.getColunasGrid();
  }
}
