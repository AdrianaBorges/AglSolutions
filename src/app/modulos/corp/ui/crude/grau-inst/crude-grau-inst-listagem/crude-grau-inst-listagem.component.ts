import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiGrauInstrucaoService } from '../../../../api/api-grau-instrucao.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-grau-inst-listagem',
  templateUrl: './crude-grau-inst-listagem.component.html',
  styleUrls: ['./crude-grau-inst-listagem.component.scss']
})
export class CrudeGrauInstListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/grau-inst';
  
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
              public apiGrauInstrucaoService: ApiGrauInstrucaoService) { }

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
    return this.apiGrauInstrucaoService.getColunasGrid();
  }

}
