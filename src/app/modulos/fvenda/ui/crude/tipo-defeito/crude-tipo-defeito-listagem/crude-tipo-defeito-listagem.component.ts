import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiTipoDefeitoService } from '../../../../api/api-tipo-defeito.service';

@Component({
  selector: 'app-crude-tipo-defeito-listagem',
  templateUrl: './crude-tipo-defeito-listagem.component.html',
  styleUrls: ['./crude-tipo-defeito-listagem.component.scss']
})
export class CrudeTipoDefeitoListagemComponent implements OnInit {


  public gridRotasCadastro: string = '/modulos/fvenda/tipo-defeito';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoDefeitoService: ApiTipoDefeitoService,
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
    return this.apiTipoDefeitoService.getColunasGrid();
  }


}
