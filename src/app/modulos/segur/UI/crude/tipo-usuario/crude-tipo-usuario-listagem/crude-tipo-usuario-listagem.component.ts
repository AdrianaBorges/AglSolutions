import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiTipoUsuarioService } from '../../../../api/api-tipo-usuario.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';

@Component({
  selector: 'app-crude-tipo-usuario-listagem',
  templateUrl: './crude-tipo-usuario-listagem.component.html',
  styleUrls: ['./crude-tipo-usuario-listagem.component.scss']
})
export class CrudeTipoUsuarioListagemComponent implements OnInit {


  public gridRotasCadastro: string = '/modulos/segur/tipo-usuario';
  
    @ViewChild('breadcrumb_traducao', { static: true }) breadcrumb_traducao: ElementRef;
  

  constructor(
    public apiTipoUsuarioService: ApiTipoUsuarioService,
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
    return this.apiTipoUsuarioService.getColunasGrid();
  }

}
