import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoPerContribService } from '../../../../api/api-tipo-per-contrib.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-tipo-per-contrib-listagem',
  templateUrl: './crude-tipo-per-contrib-listagem.component.html',
  styleUrls: ['./crude-tipo-per-contrib-listagem.component.scss']
})
export class CrudeTipoPerContribListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/eseg/tipo-per-contrib';
  
    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  

  constructor(
    public apiTipoPerContribService: ApiTipoPerContribService,
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
    return this.apiTipoPerContribService.getColunasGrid();
  }


}
