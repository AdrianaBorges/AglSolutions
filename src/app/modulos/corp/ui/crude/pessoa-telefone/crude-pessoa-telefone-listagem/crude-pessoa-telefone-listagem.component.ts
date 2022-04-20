import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiPessoaTelefoneService } from '../../../../api/api-pessoa-telefone.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
//import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';


@Component({
  selector: 'app-crude-pessoa-telefone-listagem',
  templateUrl: './crude-pessoa-telefone-listagem.component.html',
  styleUrls: ['./crude-pessoa-telefone-listagem.component.scss']
})
export class CrudePessoaTelefoneListagemComponent implements OnInit {

  
  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPessoaTelefoneService: ApiPessoaTelefoneService
  ) { }

  ngOnInit() {
    
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiPessoaTelefoneService.getColunasGrid();
  }


}
