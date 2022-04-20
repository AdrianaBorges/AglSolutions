import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiPessoaContaBancoService } from '../../../../api/api-pessoa-conta-banco.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
//import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';


@Component({
  selector: 'app-crude-pessoa-conta-banco-listagem',
  templateUrl: './crude-pessoa-conta-banco-listagem.component.html',
  styleUrls: ['./crude-pessoa-conta-banco-listagem.component.scss']
})
export class CrudePessoaContaBancoListagemComponent implements OnInit {

  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPessoaContaBancoService: ApiPessoaContaBancoService
  ) { }

  ngOnInit() {
    
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiPessoaContaBancoService.getColunasGrid();
  }

}
