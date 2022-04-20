import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiSituacaoAssTecService } from '../../../../api/api-situacao-ass-tec.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-situacao-ass-tec-listagem',
  templateUrl: './crude-situacao-ass-tec-listagem.component.html',
  styleUrls: ['./crude-situacao-ass-tec-listagem.component.scss']
})
export class CrudeSituacaoAssTecListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-ass-tec';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoAssTecService: ApiSituacaoAssTecService,
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
    return this.apiSituacaoAssTecService.getColunasGrid();
  }

}
