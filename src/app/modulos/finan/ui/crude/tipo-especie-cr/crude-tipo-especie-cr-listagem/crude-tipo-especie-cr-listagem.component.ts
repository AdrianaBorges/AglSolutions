import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTipoEspecieCrService } from '../../../../api/api-tipo-especie-cr.service';

@Component({
  selector: 'app-crude-tipo-especie-cr-listagem',
  templateUrl: './crude-tipo-especie-cr-listagem.component.html',
  styleUrls: ['./crude-tipo-especie-cr-listagem.component.scss']
})
export class CrudeTipoEspecieCrListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/tipo-especie-cr';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoEspecieCrService: ApiTipoEspecieCrService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs() {
    var traducao: string = this.breadcrumb_traducao.nativeElement.innerText;
    this.cabecalhoBreadcrumbService.setNomeBreadcrumbRotaAtual(traducao);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiTipoEspecieCrService.getColunasGrid();
  }
}

