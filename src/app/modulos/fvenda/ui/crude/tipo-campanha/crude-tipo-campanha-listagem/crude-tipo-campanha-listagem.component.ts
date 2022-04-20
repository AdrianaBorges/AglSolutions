import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTipoCampanhaService } from '../../../../api/api-tipo-campanha.service';

@Component({
  selector: 'app-crude-tipo-campanha-listagem',
  templateUrl: './crude-tipo-campanha-listagem.component.html',
  styleUrls: ['./crude-tipo-campanha-listagem.component.scss']
})
export class CrudeTipoCampanhaListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/tipo-campanha';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoCampanhaService: ApiTipoCampanhaService,
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
    return this.apiTipoCampanhaService.getColunasGrid();
  }



}
