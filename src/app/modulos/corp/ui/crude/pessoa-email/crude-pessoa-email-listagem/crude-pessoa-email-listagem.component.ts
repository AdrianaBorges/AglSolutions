import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiPessoaEmailService } from '../../../../api/api-pessoa-email.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
//import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';


@Component({
  selector: 'app-crude-pessoa-email-listagem',
  templateUrl: './crude-pessoa-email-listagem.component.html',
  styleUrls: ['./crude-pessoa-email-listagem.component.scss']
})
export class CrudePessoaEmailListagemComponent implements OnInit {


  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPessoaEmailService: ApiPessoaEmailService
  ) { }

  ngOnInit() {
    
  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiPessoaEmailService.getColunasGrid();
  }


}
