import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiTipoFreteService } from '../../../../api/api-tipo-frete.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-frete-listagem',
  templateUrl: './crude-tipo-frete-listagem.component.html',
  styleUrls: ['./crude-tipo-frete-listagem.component.scss']
})
export class CrudeTipoFreteListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/tipo-frete';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoFreteService: ApiTipoFreteService,
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
    return this.apiTipoFreteService.getColunasGrid();
  }

}
