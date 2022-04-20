import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiGrupoClienteService } from '../../../../api/api-grupo-cliente.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crude-grupo-cliente-listagem',
  templateUrl: './crude-grupo-cliente-listagem.component.html',
  styleUrls: ['./crude-grupo-cliente-listagem.component.scss']
})
export class CrudeGrupoClienteListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/grupo-cliente';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiGrupoClienteService: ApiGrupoClienteService,
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
    return this.apiGrupoClienteService.getColunasGrid();
  }

}
