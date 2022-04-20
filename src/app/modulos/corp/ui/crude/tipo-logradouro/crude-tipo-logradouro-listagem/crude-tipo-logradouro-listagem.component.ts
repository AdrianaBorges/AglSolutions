import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoLogradouroService } from '../../../../api/api-tipo-logradouro.service';

@Component({
  selector: 'app-crude-tipo-logradouro-listagem',
  templateUrl: './crude-tipo-logradouro-listagem.component.html',
  styleUrls: ['./crude-tipo-logradouro-listagem.component.scss']
})
export class CrudeTipoLogradouroListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/tipo-logradouro';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoLogradouroService: ApiTipoLogradouroService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }

  private criarBreadCrumbs(){
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0],//'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'logradouro',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiTipoLogradouroService.getColunasGrid();
  }

}
