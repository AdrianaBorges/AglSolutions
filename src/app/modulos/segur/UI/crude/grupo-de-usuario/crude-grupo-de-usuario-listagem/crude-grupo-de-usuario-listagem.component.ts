import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiGrupoUsuarioService } from '../../../../api/api-grupo-usuario.service';
import { GridRotaCadastro } from '../../../../../../componentes/grid-pesquisa/grid-rota-cadastro';

@Component({
  selector: 'app-crude-grupo-de-usuario-listagem',
  templateUrl: './crude-grupo-de-usuario-listagem.component.html',
  styleUrls: ['./crude-grupo-de-usuario-listagem.component.scss']
})
export class CrudeGrupoDeUsuarioListagemComponent implements OnInit {
  public gridRotasCadastro: string = '/modulos/segur/grupo-de-usuario';
  @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;

  constructor(
    public apiGrupoUsuarioService: ApiGrupoUsuarioService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,

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
    return this.apiGrupoUsuarioService.getColunasGrid()
  }


  
}
