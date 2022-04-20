/**
 * ATENÇÃO!
 * 
 * Esse é um modelo de arquivo para a página de lista de um CRUDE
 * onde os resultados de um cadastro específico são exibidos em um GRID
 * e podem ser filtrados por dados desse cadastro.
 * 
 * O Grid disponibiliza 2 ações de CRUDE que na verdade encaminham para 
 * a página de edição, são elas:
 * 1) alterar
 * 2) excluir
 * 
 * Um botão de "incluir" deve ser criado na área de filtro ao lado do botão 
 * pesquisar para que direcione para a página de CRUDE em modo de inclusão.
 * Nesse exemplo temos 2 botões de incluir, um para Pessoa Física e outro para
 * Pessoa Jurídica.
 */
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';

//1) Componentes Angular essenciais para uma página
import { FormBuilder, FormGroup } from '@angular/forms';

//2) Serviços do projeto essenciais
import { CabecalhoBreadcrumbService } from '../../../../../componentes/cabecalho-breadcrumb/cabecalho-breadcrumb.service';

//3) Outros Componentes do projeto
import { ModalPesquisaComponent } from '../../../../../componentes/modal-pesquisa/modal-pesquisa.component';
import { GridPesquisaComponent } from '../../../../../componentes/grid-pesquisa/grid-pesquisa.component';
import { GridPesquisaColumn } from '../../../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridRotaCadastro } from '../../../../../componentes/grid-pesquisa/grid-rota-cadastro';
//import { InputModalPesquisaComponent } from '../../../../../componentes/input-modal-pesquisa/input-modal-pesquisa.component';

/**
 * ATENÇÃO!
 * Substitua abaixo pelas APIs que você de fato irá precisar
 */
//4) APIs
import { ApiPessoaElService } from '../../../api/api-pessoa-el.service';
import { ApiProfissaoService } from '../../../api/api-profissao.service';
import { ApiGrauInstrucaoService } from '../../../../corp/api/api-grau-instrucao.service';
import { ApiSexoService } from '../../../../corp/api/api-sexo.service';
import { ApiTipoPessoaService } from '../../../../corp/api/api-tipo-pessoa.service';
import { ApiUsuariosEL01Service } from '../../../src/app/modulos/segur/api/api-usuarios-el01.service';


@Component({
  selector: 'app-listagem-pessoa',
  templateUrl: './listagem-pessoa.component.html',
  styleUrls: ['./listagem-pessoa.component.scss']
})
export class ListagemPessoaComponent implements OnInit {

    /**
     * ATENÇÃO!
     * Substitua as rotas abaixo pelo tipo que de fato irá precisar
     * consulte a documentação do componente grid-pesquisa para
     * saber qual forma de rotear é melhor para o seu caso.
     * 
     * A outra opção seria o "gridRotasCadastro" ser do tipo string e de fato ser
     * apenas um texto de rota, veja exemplo abaixo deste.
     */
    public gridRotasCadastro: GridRotaCadastro[] = [
    {
      nomeCampo: 'inCodTipoPessoa',
      valorCampo: 1,
      rota: '/modulos/corp/pessoa/fisica',
      textoBotaoCriarNovo: 'física'
    },
    {
      nomeCampo: 'inCodTipoPessoa',
      valorCampo: 2,
      rota: '/modulos/corp/pessoa/juridica',
      textoBotaoCriarNovo: 'jurídica'
    }
    /**
     * ATENÇÃO! (continuação)
     * Exemplo alternativo para o roteamento do GRID para ações do GRID
     * 
     * a rota deve ser uma rota de caminho absoluto, ou seja,
     * desde o caminho raiz do projeto.
     */
    //public gridRotasCadastro: string = '/modulos/corp/pessoafisica';
  ];

  @ViewChild('gridFiltro') gridFiltro: GridPesquisaComponent;

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisaProfissao') instanciaModalPesquisaProfissao: ModalPesquisaComponent;

  public formGroupPesquisa: FormGroup;
  
    /**
     * ATENÇÃO!
     * Sibstitua o código abaixo incluindo apenas as APIs que de fato ir]a usar
     */
    constructor(
    public apiService: ApiPessoaElService,
    public cabecalhoBreadcrumbService: CabecalhoBreadcrumbService,
    public ApiProfissaoService: ApiProfissaoService,
    public apiUsuarioService: ApiUsuariosEL01Service,
    public ApiGrauInstrucaoService: ApiGrauInstrucaoService,
    public ApiSexoService: ApiSexoService,
    public ApiTipoPessoaService: ApiTipoPessoaService,
    private formB: FormBuilder
  ) { }

  ngOnInit() {
    this.criarBreadCrumbs();
    this.criarForm();
  }

  private criarBreadCrumbs(){

    /**
     * ATENÇÃO!
     * Sibstitua o código abaixo pelos real caminho do breadcrumb da sua página
     */
    this.cabecalhoBreadcrumbService.setBreadcrumbs([
      {
        texto: 'início',
        url: '/modulos'
      },
      {
        texto: 'pessoa',
        url: null
      },
      {
        texto: 'listagem',
        url: null
      }
    ]);
  }

  private criarForm(){

    /**
     * ATENÇÃO!
     * Sibstitua o código abaixo pelos filtros que de fato irá usar para o GRID
     */
    this.formGroupPesquisa = this.formB.group({
      listaTipoPessoa: [[]],
      daDatNascim: [null],
      alteracaoStart: [null],
      alteracaoEnd: [null],
    });

  }

  public getColunasGridCadastro(): Array<GridPesquisaColumn>{
    return this.apiService.getColunasGrid()
  }

  executarPesquisa(){
    this.gridFiltro.executarPesquisa();
  }

}
