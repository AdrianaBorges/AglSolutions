import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiMotivoRejeitaService } from '../../../../api/api-motivo-rejeita.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-motivo-rejeita-listagem',
  templateUrl: './crude-motivo-rejeita-listagem.component.html',
  styleUrls: ['./crude-motivo-rejeita-listagem.component.scss']
})
export class CrudeMotivoRejeitaListagemComponent implements OnInit {


  public gridRotasCadastro: string = '/modulos/fvenda/motivo-rejeita';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiMotivoRejeitaService: ApiMotivoRejeitaService,
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
    return this.apiMotivoRejeitaService.getColunasGrid();
  }


}
