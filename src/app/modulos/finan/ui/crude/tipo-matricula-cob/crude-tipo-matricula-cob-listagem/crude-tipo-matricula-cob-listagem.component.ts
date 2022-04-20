import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiTipoMatriculaCobService } from '../../../../api/api-tipo-matricula-cob.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-matricula-cob-listagem',
  templateUrl: './crude-tipo-matricula-cob-listagem.component.html',
  styleUrls: ['./crude-tipo-matricula-cob-listagem.component.scss']
})
export class CrudeTipoMatriculaCobListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/tipo-matricula-cob';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoMatriculaCobService: ApiTipoMatriculaCobService
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
  }
  private criarBreadCrumbs(){

    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[0], //'Início',
        url: '/modulos'
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[1], //'Pessoa',
        url: null
      },
      {
        texto: this.breadcrumb_traducao.nativeElement.innerText.split('/')[2], //'Listagem',
        url: null
      }
    ]);

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiTipoMatriculaCobService.getColunasGrid();
  }

}
