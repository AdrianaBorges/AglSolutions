import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoEventoDfeService } from '../../../../api/api-tipo-evento-dfe.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-tipo-evento-dfe-listagem',
  templateUrl: './crude-tipo-evento-dfe-listagem.component.html',
  styleUrls: ['./crude-tipo-evento-dfe-listagem.component.scss']
})
export class CrudeTipoEventoDfeListagemComponent implements OnInit {

  
  public gridRotasCadastro: string = '/modulos/idfe/tipo-evento-dfe';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoEventoDfeService: ApiTipoEventoDfeService
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
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Banco',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiTipoEventoDfeService.getColunasGrid();
  }

}
