import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoSeguroService } from '../../../../api/api-tipo-seguro.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-tipo-seguro-listagem',
  templateUrl: './crude-tipo-seguro-listagem.component.html',
  styleUrls: ['./crude-tipo-seguro-listagem.component.scss']
})
export class CrudeTipoSeguroListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/eseg/tipo-seguro';
  
    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  

  constructor(
    public apiTipoSeguroService: ApiTipoSeguroService,
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
    return this.apiTipoSeguroService.getColunasGrid();
  }


}
