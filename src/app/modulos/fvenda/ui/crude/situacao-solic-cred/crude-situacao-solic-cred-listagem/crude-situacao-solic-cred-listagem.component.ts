import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiSituacaoSolicCredService } from '../../../../api/api-situacao-solic-cred.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-situacao-solic-cred-listagem',
  templateUrl: './crude-situacao-solic-cred-listagem.component.html',
  styleUrls: ['./crude-situacao-solic-cred-listagem.component.scss']
})
export class CrudeSituacaoSolicCredListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/situacao-solic-cred';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoSolicCredService: ApiSituacaoSolicCredService,
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
    return this.apiSituacaoSolicCredService.getColunasGrid();
  }
}
