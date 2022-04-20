import { ApiSituacaoEnvEmailService } from '../../../../api/api-situacao-env-email.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-situacao-env-email-listagem',
  templateUrl: './crude-situacao-env-email-listagem.component.html',
  styleUrls: ['./crude-situacao-env-email-listagem.component.scss']
})
export class CrudeSituacaoEnvEmailListagemComponent implements OnInit {

  public gridRotasCadastro: string = '/modulos/corp/situacao-env-email';

  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiSituacaoEnvEmailService: ApiSituacaoEnvEmailService
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
    return this.apiSituacaoEnvEmailService.getColunasGrid();
  }

}

//SituacaoEnvEmail
