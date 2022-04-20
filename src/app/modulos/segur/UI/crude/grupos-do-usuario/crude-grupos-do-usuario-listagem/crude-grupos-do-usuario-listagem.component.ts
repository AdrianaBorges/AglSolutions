import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiGruposDoUsuarioService } from '../../../../api/api-grupos-do-usuario.service';

@Component({
  selector: 'app-crude-grupos-do-usuario-listagem',
  templateUrl: './crude-grupos-do-usuario-listagem.component.html',
  styleUrls: ['./crude-grupos-do-usuario-listagem.component.scss']
})
export class CrudeGruposDoUsuarioListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiUsuariosGrupoService: ApiGruposDoUsuarioService
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiUsuariosGrupoService.getColunasGrid();
  }


}
