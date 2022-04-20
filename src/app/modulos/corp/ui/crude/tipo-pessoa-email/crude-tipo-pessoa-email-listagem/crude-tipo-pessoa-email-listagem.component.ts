import { ApiTipoDocumentoPessoaEmailService } from './../../../../api/api-tipo-pessoa-email.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-pessoa-email-listagem',
  templateUrl: './crude-tipo-pessoa-email-listagem.component.html',
  styleUrls: ['./crude-tipo-pessoa-email-listagem.component.scss']
})
export class CrudeTipoPessoaEmailListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/tipo-pessoa-email';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  
  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiTipoDocumentoPessoaEmailService: ApiTipoDocumentoPessoaEmailService
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
    return this.apiTipoDocumentoPessoaEmailService.getColunasGrid();
  }

}
