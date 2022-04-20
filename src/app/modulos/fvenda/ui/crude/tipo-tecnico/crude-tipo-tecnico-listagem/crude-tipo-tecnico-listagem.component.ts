import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiTipoTecnicoService } from '../../../../api/api-tipo-tecnico.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-tecnico-listagem',
  templateUrl: './crude-tipo-tecnico-listagem.component.html',
  styleUrls: ['./crude-tipo-tecnico-listagem.component.scss']
})
export class CrudeTipoTecnicoListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/tipo-tecnico';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoTecnicoService: ApiTipoTecnicoService,
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
    return this.apiTipoTecnicoService.getColunasGrid();
  }

}
