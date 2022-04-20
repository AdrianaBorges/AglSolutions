import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiFamMatService } from '../../../../api/api-fam-mat.service';

@Component({
  selector: 'app-crude-fam-mat-listagem',
  templateUrl: './crude-fam-mat-listagem.component.html',
  styleUrls: ['./crude-fam-mat-listagem.component.scss']
})
export class CrudeFamMatListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/fvenda/fam-mat';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiFamMatService: ApiFamMatService,
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
    return this.apiFamMatService.getColunasGrid();
  }





}
