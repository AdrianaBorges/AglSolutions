import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiSolucAssTecService } from '../../../../api/api-soluc-ass-tec.service';

@Component({
  selector: 'app-crude-soluc-ass-tec-listagem',
  templateUrl: './crude-soluc-ass-tec-listagem.component.html',
  styleUrls: ['./crude-soluc-ass-tec-listagem.component.scss']
})
export class CrudeSolucAssTecListagemComponent implements OnInit {


  public gridRotasCadastro: string = '/modulos/fvenda/soluc-ass-tec';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSolucAssTecService: ApiSolucAssTecService,
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
    return this.apiSolucAssTecService.getColunasGrid();
  }


}
