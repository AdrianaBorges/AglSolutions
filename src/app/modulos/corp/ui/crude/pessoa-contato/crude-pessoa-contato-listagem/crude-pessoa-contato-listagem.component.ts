import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CabecalhoBreadcrumbService } from '../../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';
import { ApiPessoaContatoService } from '../../../../api/api-pessoa-contato.service';
import { GridPesquisaColumn } from '../../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
//import { CadastroBarraAcaoComponent } from '../../../../../../componentes/cadastro-barra-acao/cadastro-barra-acao.component';
import { GridInterfaceTabCadastroFilho } from '../../../../../../componentes/grid-pesquisa/grid-interface-tab-cadastro-filho';
import { ApiTipoPessoaContatoService } from '../../../../api/api-tipo-pessoa-contato.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crude-pessoa-contato-listagem',
  templateUrl: './crude-pessoa-contato-listagem.component.html',
  styleUrls: ['./crude-pessoa-contato-listagem.component.scss']
})
export class CrudePessoaContatoListagemComponent implements OnInit {


  @ViewChild('gridFiltro', { static: true }) gridFiltro: GridPesquisaComponent;

  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;

  public formGroupPesquisa: FormGroup;

  constructor(
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public apiPessoaContatoService: ApiPessoaContatoService,
    public apiTipoContatoService: ApiTipoPessoaContatoService,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarForm();
  }



  private criarForm() {

    this.formGroupPesquisa = this.formB.group({
      listaTipoContato: [[]],
    });

  }
  executarPesquisa() {
    this.gridFiltro.executarPesquisa();
  }


  public getColunasGridCadastro(): Array<GridPesquisaColumn> {
    return this.apiPessoaContatoService.getColunasGrid();
  }


}
