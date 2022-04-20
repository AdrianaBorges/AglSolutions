import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiEspecieItemService } from '../../../../api/api-especie-item.service';

@Component({
  selector: 'app-crude-especie-item-listagem',
  templateUrl: './crude-especie-item-listagem.component.html',
  styleUrls: ['./crude-especie-item-listagem.component.scss']
})
export class CrudeEspecieItemListagemComponent implements OnInit {


  public gridRotasCadastro: string = '/modulos/fvenda/especie-item';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiEspecieItemService: ApiEspecieItemService,
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
    return this.apiEspecieItemService.getColunasGrid();
  }


}
