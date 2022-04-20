import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiPortadorService } from '../../../../api/api-portador.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-portador-listagem',
  templateUrl: './crude-portador-listagem.component.html',
  styleUrls: ['./crude-portador-listagem.component.scss']
})
export class CrudePortadorListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/portador';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPortadorService: ApiPortadorService
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
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1],//'Condição Pagamento',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2],//'Listagem',
        url: null
      }
    ]);
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiPortadorService.getColunasGrid();
  }

}
