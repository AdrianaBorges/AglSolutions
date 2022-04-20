import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoCapitalSegService } from '../../../../api/api-tipo-capital-seg.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';


@Component({
  selector: 'app-crude-tipo-capital-seg-listagem',
  templateUrl: './crude-tipo-capital-seg-listagem.component.html',
  styleUrls: ['./crude-tipo-capital-seg-listagem.component.scss']
})
export class CrudeTipoCapitalSegListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/eseg/tipo-capital-seg';
  
    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  

  constructor(
    public apiTipoCapitalSegService: ApiTipoCapitalSegService,
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
    return this.apiTipoCapitalSegService.getColunasGrid();
  }


}
