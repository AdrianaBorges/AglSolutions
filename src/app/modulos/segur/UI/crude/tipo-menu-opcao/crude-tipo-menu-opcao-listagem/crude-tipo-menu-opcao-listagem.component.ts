import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoMenuOpcaoService } from '../../../../api/api-tipo-menu-opcao.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-menu-opcao-listagem',
  templateUrl: './crude-tipo-menu-opcao-listagem.component.html',
  styleUrls: ['./crude-tipo-menu-opcao-listagem.component.scss']
})
export class CrudeTipoMenuOpcaoListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/segur/tipo-menu-opcao';
  
    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  

  constructor(
    public apiTipoMenuOpcaoService: ApiTipoMenuOpcaoService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService
  ) { }

 
  ngOnInit() {
    this.criarBreadCrumbs();
  }
  private criarBreadCrumbs() {

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

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiTipoMenuOpcaoService.getColunasGrid();
  }

}
