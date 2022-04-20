import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiOrigemAssTecService } from '../../../../api/api-origem-ass-tec.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-origem-ass-tec-listagem',
  templateUrl: './crude-origem-ass-tec-listagem.component.html',
  styleUrls: ['./crude-origem-ass-tec-listagem.component.scss']
})
export class CrudeOrigemAssTecListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/origem-ass-tec';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiOrigemAssTecService: ApiOrigemAssTecService,
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
    return this.apiOrigemAssTecService.getColunasGrid();
  }

}
