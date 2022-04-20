import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiTipoCobrancaService } from '../../../../api/api-tipo-cobranca.service';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-cobranca-listagem',
  templateUrl: './crude-tipo-cobranca-listagem.component.html',
  styleUrls: ['./crude-tipo-cobranca-listagem.component.scss']
})
export class CrudeTipoCobrancaListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/finan/tipo-cobranca';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoCobrancaService: ApiTipoCobrancaService
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
    return this.apiTipoCobrancaService.getColunasGrid();
  }

}
