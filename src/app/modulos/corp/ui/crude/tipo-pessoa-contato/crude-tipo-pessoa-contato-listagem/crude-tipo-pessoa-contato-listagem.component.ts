import { ApiTipoPessoaContatoService } from './../../../../api/api-tipo-pessoa-contato.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-pessoa-contato-listagem',
  templateUrl: './crude-tipo-pessoa-contato-listagem.component.html',
  styleUrls: ['./crude-tipo-pessoa-contato-listagem.component.scss']
})
export class CrudeTipoPessoaContatoListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/tipo-pessoa-contato';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoPessoaContatoService: ApiTipoPessoaContatoService
  ) { }

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
    return this.apiTipoPessoaContatoService.getColunasGrid();
  }

}
