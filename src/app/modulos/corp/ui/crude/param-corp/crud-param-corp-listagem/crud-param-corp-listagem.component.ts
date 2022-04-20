import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiParamCorpService } from '../../../../api/api-param-corp.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';



@Component({
  selector: 'app-crud-param-corp-listagem',
  templateUrl: './crud-param-corp-listagem.component.html',
  styleUrls: ['./crud-param-corp-listagem.component.scss']
})
export class CrudParamCorpListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/corp/param-corp';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public apiParamCorpService: ApiParamCorpService,
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
    return this.apiParamCorpService.getColunasGrid();
  }

}
