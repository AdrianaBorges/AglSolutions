import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ActivatedRoute } from '@angular/router';
import { ApiUsuariosDoGrupoService } from '../../../../api/api-usuarios-do-grupo.service';

@Component({
  selector: 'app-crude-usuarios-do-grupo-listagem',
  templateUrl: './crude-usuarios-do-grupo-listagem.component.html',
  styleUrls: ['./crude-usuarios-do-grupo-listagem.component.scss']
})
export class CrudeUsuariosDoGrupoListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiUsuariosGrupoService: ApiUsuariosDoGrupoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiUsuariosGrupoService.getColunasGrid();
  }



}
