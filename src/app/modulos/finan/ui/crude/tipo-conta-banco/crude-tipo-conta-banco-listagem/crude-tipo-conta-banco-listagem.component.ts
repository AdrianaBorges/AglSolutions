import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiTipoContaBancoService } from '../../../../api/api-tipo-conta-banco.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-conta-banco-listagem',
  templateUrl: './crude-tipo-conta-banco-listagem.component.html',
  styleUrls: ['./crude-tipo-conta-banco-listagem.component.scss']
})
export class CrudeTipoContaBancoListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/tipo-conta-banco';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoContaBancoService: ApiTipoContaBancoService
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
    return this.apiTipoContaBancoService.getColunasGrid();
  }
}
