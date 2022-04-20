import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTipoIntegraCampService } from '../../../../api/api-tipo-integra-camp.service';

@Component({
  selector: 'app-crude-tipo-integra-camp-listagem',
  templateUrl: './crude-tipo-integra-camp-listagem.component.html',
  styleUrls: ['./crude-tipo-integra-camp-listagem.component.scss']
})
export class CrudeTipoIntegraCampListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/tipo-integra-camp';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoIntegraCampService: ApiTipoIntegraCampService,
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
    return this.apiTipoIntegraCampService.getColunasGrid();
  }



}
