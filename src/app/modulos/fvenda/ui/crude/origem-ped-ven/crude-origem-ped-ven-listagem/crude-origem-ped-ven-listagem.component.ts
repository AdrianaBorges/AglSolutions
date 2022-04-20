import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiOrigemPedVenService } from '../../../../api/api-origem-ped-ven.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-origem-ped-ven-listagem',
  templateUrl: './crude-origem-ped-ven-listagem.component.html',
  styleUrls: ['./crude-origem-ped-ven-listagem.component.scss']
})
export class CrudeOrigemPedVenListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/origem-ped-ven';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiOrigemPedVenService: ApiOrigemPedVenService,
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
    return this.apiOrigemPedVenService.getColunasGrid();
  }

}
