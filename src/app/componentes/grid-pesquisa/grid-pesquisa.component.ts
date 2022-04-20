import { Component, OnInit, AfterContentInit, 
         ContentChild, ViewChild,
         Input, Output, 
         EventEmitter, ElementRef, 
         ChangeDetectorRef, NgZone  } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ControlValueAccessor, FormGroup }from '@angular/forms';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnAgregada } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column-agreagada';
import { GridPesquisaColumnFormat } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { GridPesquisaDetalheTemplateDirective } from './directives/grid-pesquisa-detalhe-template.directive'

//Kendo UI
import { GridDataResult, 
         PageChangeEvent, 
         EditEvent,
         RemoveEvent,
         GridComponent, 
         ColumnBase, 
         RowArgs, 
         SelectionDirective, 
         DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor, filterBy, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService } from '@progress/kendo-angular-grid';
//import { ExcelExportData } from '@progress/kendo-angular-excel-export';
// import { SelectionEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/selection.service';
// import { SelectionRange } from '@progress/kendo-angular-dateinputs';
// import { enum_formatoColuna } from '../camada-logica/KendoUi/Grid/enum-formato-coluna';

import { GridFilterTranspiller } from '../camada-logica/KendoUi/GridFilterTranspiller';
import { process, State } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { FiltroExternoManager } from './filtro-externo-manager';
import { GridRotaCadastro } from './grid-rota-cadastro';
import { GridPesquisaBotaoDetalhes } from './grid-pesquisa-botao-detalhes';
import { GridPesquisaPersisteEstadoService, FiltroPersistido } from './grid-pesquisa-persiste-estado.service';
//import { FormControl } from '../../../../node_modules/@angular/forms';

import { ValidarPermissaoRotaService } from '../../validar-permissao-rota.service';
import { GridInterfaceTabCadastroFilho } from './grid-interface-tab-cadastro-filho';
import { CadastroBarraAcaoComponent } from '../cadastro-barra-acao/cadastro-barra-acao.component';
import { numberSymbols } from '@telerik/kendo-intl';
import { isNumber } from 'util';
//import { CadastroBarraAcaoComponent } from '../cadastro-barra-acao/cadastro-barra-acao.component';

//TEMPLATES
import { GridPesquisaContainerBotoesAcaoLinhaComponent } from './templates/grid-pesquisa-container-botoes-acao-linha/grid-pesquisa-container-botoes-acao-linha.component';
import { GridPesquisaBotaoAcaoLinhaComponent } from './templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-botao-acao-linha.component';
import { GridPesquisaColunaEditarBotaoClick } from './templates/grid-pesquisa-botao-acao-linha/grid-pesquisa-coluna-editar-botao-click';
//import { forEach } from '@angular/router/src/utils/collection';

//COMPONENTE MODULES
import { AguardeCarregandoComponent } from '../aguarde-carregando/aguarde-carregando.component';
import { CaixaDialogoComponent } from '../caixa-dialogo/caixa-dialogo.component';

//Servicos
import { AssetsLocaleService } from '../../assets-locale/assets-locale.service';

/**
 * Essa estrutura foi a única aceita para exibir dinamicamente
 * as colunas sem que travasse o angular.
 * 
 * Segue link do exemplo que usei:
 * https://www.telerik.com/kendo-angular-ui/components/grid/columns/hidden/
 */
interface ColumnSetting {
  field: string;
  title: string;
  format?: string;
  type: 'text' | 'numeric' | 'boolean' | 'date';
  filterable: boolean;
  hidden: boolean;
  externalFilterColumn?: Element;
  width?: number;
  tipo: string//'GridPesquisaColumn' | 'GridPesquisaColumnAgregada' | 'GridPesquisaColumnFormat';
  index: number
}

// interface CaixaDialogo{
//   aberto: boolean,
//   titulo: string,
//   mensagem: string
// }

@Component({
  selector: 'app-grid-pesquisa',
  templateUrl: './grid-pesquisa.component.html',
  styleUrls: ['./grid-pesquisa.component.scss']
})
export class GridPesquisaComponent implements OnInit, AfterContentInit {

  @ContentChild(GridPesquisaContainerBotoesAcaoLinhaComponent, { static: true}) gridPesquisaContainerBotoesAcaoLinhaComponent: GridPesquisaContainerBotoesAcaoLinhaComponent;
  @ContentChild(GridPesquisaDetalheTemplateDirective) gridPesquisaDetalheTemplateDirective!: GridPesquisaDetalheTemplateDirective;

  @ViewChild('btn_novo_traducao', { static: true }) btn_novo_traducao: ElementRef;
  @ViewChild('meuGrid', { static: true }) meuGrid: GridComponent;
  @ViewChild('aguardeCarregando', { static: true }) aguardeCarregando: AguardeCarregandoComponent;
  @ViewChild('caixaDialogo', { static: true }) caixaDialogo: CaixaDialogoComponent;

  @Input() idGrid: string;
  @Input() nomeMetodoApi: string;
  @Input() apiService: any;
  @Input() nomeMetodoOrdenacao: string;
  @Input() colunasGrid: GridPesquisaColumn[];
  @Input() camposDetalheLinha: GridPesquisaColumn[];

  // Alternativa a propriedade apiService usada para quando a listagem já está no front
  @Input() itens: Array<any>;

  @Input() gridPesquisaBotaoDetalhesOrientacao: 'horizontal'|'vertical';
  @Input() gridPesquisaBotaoDetalhes: string;
  @Input() gridPesquisaBotaoDetalhesWidth: string;
  @Output() gridPesquisaBotaoDetalhesClick:  EventEmitter<GridPesquisaBotaoDetalhes> = new EventEmitter<GridPesquisaBotaoDetalhes>();

  @Input() pageSize: number;
  @Input() textoBotaoCriarNovo: string;

  //Rota do cadastro a ser exibido quando clicar para adicionar um novo ou exibir um registro para visualização/edição
  @Input() rotaCadastro: string | GridRotaCadastro[];
  @Input() rotaCadastroNomeBotoes: string;

  @Input() cabecalhoBotaoNomes: string;
  @Output() cabecalhoBotaoClick: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Evento disparado pelo botões descritos pelo usuário dentro do grid-pesquisa-template-botoes-acao-linha
   */
  @Output() colunaEditarBotaoClick: EventEmitter<GridPesquisaColunaEditarBotaoClick> = new EventEmitter<GridPesquisaColunaEditarBotaoClick>();

  //Form Group dos campos de pesquisa para manter a persistência deles ao retornar ao grid
  @Input() formGroupPesquisa: FormGroup;

  /**
   * nome do campo que representa o id do cadastro para ser usado ao direcionar para a página
   */
  @Input() apiFieldKey: string;


  /**
   * Deve ser informado quando o grid está controlando um cadastro filho dentro de uma TAB
   */
  @Input() gridInterfaceTabCadastroFilho: GridInterfaceTabCadastroFilho;
  @Input() areaFiltro: Element;

  /**
   * Função de validação para exibição dos botões de ação
   * ---
   * * **Descrição**:
   * Função que quando passada pro grid para validar se um botão de **rota filha** ou do CRUDE (**Create, Read, Delete, Update, Export**) podem ficar visível para cada linha/registro do grid
   * 
   * * **Argumentos**: GridPesquisaColunaEditarBotaoClick
   * * **Retorno**: boolean
   */
  @Input() btn_acao_exibir: Function;
  public btn_create: GridPesquisaBotaoAcaoLinhaComponent = {id: 'Create',titulo: '',rotaFilha_tooltip: '',icone: '',rotaFilha_url: ''};
  public btn_read: GridPesquisaBotaoAcaoLinhaComponent = {id: 'Read',titulo: '',rotaFilha_tooltip: '',icone: '',rotaFilha_url: ''};
  public btn_update: GridPesquisaBotaoAcaoLinhaComponent = {id: 'Update',titulo: '',rotaFilha_tooltip: '',icone: '',rotaFilha_url: ''};
  public btn_delete: GridPesquisaBotaoAcaoLinhaComponent = {id: 'Delete',titulo: '',rotaFilha_tooltip: '',icone: '',rotaFilha_url: ''};

  @Input() btn_Validar_exibir: Function;
  @Input() btn_Inativar_exibir: Function;
  @Input() btn_Reativar_exibir: Function;
  @Input() btn_Cancelar_exibir: Function;

  @Input() btn_Validar_titulo: string;
  @Input() btn_Inativar_titulo: string;
  @Input() btn_Reativar_titulo: string;
  @Input() btn_Cancelar_titulo: string;

  @Output() btn_Validar_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() btn_Inativar_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() btn_Reativar_click: EventEmitter<any> = new EventEmitter<any>();
  @Output() btn_Cancelar_click: EventEmitter<any> = new EventEmitter<any>();

  public grid_coluna_editar_width: Number;
  public grid_coluna_editar_width_tmp: Number;

  /**
   * Atributos para permitir o GRID ser usado dentro do componente modal-pesquisa
   */
  @Output() mudouSelecao: EventEmitter<any> = new EventEmitter<any>();
  @Input() esconderColunaButoesAcao: boolean;
  @Input() naoPersistirFiltro: boolean;
  @Output() resultadosTotaisMudou: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Controla se deve ou não estar sendo exibido quando 
   * usado para listar os dados de um cadastro filho dentro de uma TAB 
   */
  public isNotVisible: boolean;
  
  public erros: ApiErrorCollection;
  public exibirBotaoAdd: boolean;

  //Dados manipulados pelo KendoUi
  public gridView: GridDataResult; 
  public info = true;
  public type: 'numeric' | 'input' = 'numeric';
  public loading: boolean;
  public state: State;

  public listGridPesquisaBotaoDetalhes: GridPesquisaBotaoDetalhes[] = [];
  
  private resultado: Object;
  private filtro: string = '';
  
  public columns: ColumnSetting[];

  private objetoSelecionado: any;

  private externalFiltersManager: FiltroExternoManager;

  public permissao_editar: boolean;
  public permissao_visualizar: boolean;
  public permissao_incluir: boolean;
  public permissao_excluir: boolean;
  public permissao_exportar: boolean;

  public permissao_validar: boolean;
  public permissao_inativar: boolean;
  public permissao_reativar: boolean;
  public permissao_cancelar: boolean;

  public btn_validar_habilitado: boolean = false;
  public btn_inativar_habilitado: boolean = false;
  public btn_reativar_habilitado: boolean = false;
  public btn_cancelar_habilitado: boolean = false;

  //Array criado por esse componente dos botões que chamam a tela de criar um novo cadastro
  public botoesCriarNovo: GridRotaCadastro[];

  public reorderable: boolean;

  public filter: CompositeFilterDescriptor;

  public paginavel: boolean;

  constructor(
    private router: Router,
    private gridPesquisaPersisteEstadoService: GridPesquisaPersisteEstadoService,
    private validarPermissaoRotaService: ValidarPermissaoRotaService,
    private changeDetectorRef : ChangeDetectorRef,
    private ngZone: NgZone,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private assetsLocaleService: AssetsLocaleService
    ) {

    var totalRecordCount: number = 0;

    this.gridView = {
      data: [],
      total: 0
    };

    this.externalFiltersManager = new FiltroExternoManager();

    this.paginavel = true;
    
  }

  /**
   * Cria um serviço de api fake pra retornar os dados
   * que foram passados diretamente por array na propriedade
   * itens
   */
  inicializarFakeApiParaItensRecebidos(){
    if(this.itens){
      this.esconderColunaButoesAcao = true
      this.paginavel = false;
      this.nomeMetodoApi = 'buscar'
      this.apiService = {
        buscar: () =>{
          return new Promise((resolve)=>{
            resolve(this.itens);
          }) 
        }
      }
    }

  }

  ngAfterContentInit(){
    this.alterarTamanhoColunaBotoesAcao();
  }

  private alterarTamanhoColunaBotoesAcao(){
    var qtdBtnsDinamicos = 0

    if(this.btn_validar_habilitado) qtdBtnsDinamicos += 1;
    if(this.btn_inativar_habilitado) qtdBtnsDinamicos += 1;
    if(this.btn_reativar_habilitado) qtdBtnsDinamicos += 1;
    if(this.btn_cancelar_habilitado) qtdBtnsDinamicos += 1;

    if(this.gridPesquisaContainerBotoesAcaoLinhaComponent){
      if(this.gridPesquisaContainerBotoesAcaoLinhaComponent.listaBotoesAcao){
        qtdBtnsDinamicos += this.gridPesquisaContainerBotoesAcaoLinhaComponent.listaBotoesAcao.length;
      }
    }else{
      this.gridPesquisaContainerBotoesAcaoLinhaComponent = new GridPesquisaContainerBotoesAcaoLinhaComponent();
    }

    var qtd_btns_edicao = (this.permissao_excluir == true? 2: 1);
    this.grid_coluna_editar_width_tmp = 24 + 34 * (qtdBtnsDinamicos + qtd_btns_edicao);
  }

  ngOnInit() {

    this.inicializarFakeApiParaItensRecebidos()

    if(!this.nomeMetodoOrdenacao){
      this.sortable = null;
    }

    this.permissao_incluir = this.validarPermissaoRotaService.funcaoValidaProUsuario('Create');
    this.permissao_visualizar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Read');
    this.permissao_editar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Update');
    this.permissao_excluir = this.validarPermissaoRotaService.funcaoValidaProUsuario('Delete');
    this.permissao_exportar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Export');

    //Permissões especiais de registro
    this.permissao_validar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Validar');
    this.permissao_inativar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Inativar');
    this.permissao_reativar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Reativar');
    this.permissao_cancelar = this.validarPermissaoRotaService.funcaoValidaProUsuario('Cancelar');

    this.textoBotaoCriarNovo = this.textoBotaoCriarNovo || this.btn_novo_traducao.nativeElement.innerText;;
    this.botoesCriarNovo = this.getBotoesCriarNovo();

    if(!this.idGrid && this.rotaCadastro){
      //Quando o grid direciona para alguma rota, então ele persiste os dados de filtros externos
      //, para isso é necessário ter o idGrid
      console.error('É obrigatório informar a propriedade "idGrid" do componente grid-pesquisa.componente quando informada a propriedade "rotaCadastro".')
    }
    //Inicializo a variável do grid que indica: 
    //1) quantos registros saltar na paginação
    //2) os filtros que serão aplicados na API
    this.inicializarState();

    if(this.gridPesquisaBotaoDetalhes == undefined){
      this.gridPesquisaBotaoDetalhes = '';
    }
    if(this.gridPesquisaBotaoDetalhesWidth == undefined){
      this.gridPesquisaBotaoDetalhesWidth = '';
    }
    var listagemBtns: string[] = this.gridPesquisaBotaoDetalhes.split('|');
    var listagemBtnsWidth: string[] = this.gridPesquisaBotaoDetalhesWidth.split('|');
    var listaWidh: string[] = this.gridPesquisaBotaoDetalhesWidth.split('|');
    listagemBtns.forEach((nomeBtn: string, index: number)=> {
      var width: number = 150;
      if(nomeBtn.length > 0){
        if(listaWidh.length >= index + 1){
          if(isNumber(parseInt(listaWidh[index]))){
            width = parseInt(listaWidh[index]);
          }
        }
        this.listGridPesquisaBotaoDetalhes.push(
          new GridPesquisaBotaoDetalhes(index, nomeBtn, width)
        );
      }
    });

    this.esconderColunaButoesAcao = this.esconderColunaButoesAcao || false;
    this.naoPersistirFiltro = this.naoPersistirFiltro || false;

    this.iniciarDados_e_exibir();
  }

  public inicializarState(): void{
    this.state = {
      skip: 0,
      take: this.pageSize || 30,
  
      // Initial filter descriptor
      filter: {
        logic: 'and',
        filters: []
      }
    };
  }

  public executarAcaoBotao(botao: GridPesquisaBotaoDetalhes, obj: any){
    botao.objetoSelecionado = obj;
    this.gridPesquisaBotaoDetalhesClick.emit(botao);
  }

  /**
   * Volta a exibir o grid de pesquisa. Usado quando é um cadastro filho dentro de uma TAB
   */
  public exibir(){
    this.isNotVisible = false;

    if(this.areaFiltro){
      this.areaFiltro.classList.remove('invisivel');
    }
    
    this.iniciarDados_e_exibir();
  }

  /**
   * Altera o valor de um filtro externo
   */
  public filtroAlterado(field: string, operator: string, valor: any){
    this.externalFiltersManager.filtroAlterado(field, operator, valor);
  }

  public executarPesquisa(manterPaginaAtual?: boolean){
    if(manterPaginaAtual == null) manterPaginaAtual = false;

    this.persistirDadosFiltro();
    if(manterPaginaAtual == false) this.state.skip = 0;
    //var sFiltrosExternos: string = this.externalFiltersManager.getFiltrosAsString(this.colunasGrid);

    this.executarPesquisaSemPersistirFiltro();
  }

  private executarPesquisaSemPersistirFiltro(){
    this.filtro = GridFilterTranspiller.toString(this.state.filter, this.colunasGrid);

    var filtroExterno = this.externalFiltersManager.getFiltrosAsString(this.colunasGrid);
    if (filtroExterno.length > 0 && this.filtro.length > 0){
      this.filtro = `(${this.filtro})~and~${filtroExterno}`;
    }else if(filtroExterno.length > 0){
      this.filtro = filtroExterno;
    }

    this.carregarMaisDados();
  }

  /**
   * Nome das Colunas no formato de moeda para exportação
   */
  private colunasFormatoMoedaToExport: string[] = [];
  /**
   * Nome das Colunas marcadas com o tipo date
   */
  private colunasData: string[] = [];
  /**
   * Formato das colunas marcadas com o tipo date
   */
  private colunasDataFormat: string[] = [];
  private iniciarDados_e_exibir(){

    this.filtro = '';
    this.columns = [];
    this.objetoSelecionado = null;

    //Transformo o array recebido de colunas para o tipo aceito pelo Kendo Ui - Grid
    var index = 0;
    for(let coluna of this.colunasGrid){
      this.columns.push({
        field: coluna.nomePropriedade,
        title: coluna.nomeColuna,
        type: coluna.tipoColuna,
        format: coluna.formatoColuna,
        hidden: coluna.hidden,
        filterable: coluna.filterable,
        width: coluna.width,
        tipo: (coluna instanceof GridPesquisaColumnFormat ? 'GridPesquisaColumnFormat': (coluna instanceof GridPesquisaColumnAgregada? 'GridPesquisaColumnAgregada': 'GridPesquisaColumn')),
        index: index
      });

      index += 1;

      //Gravo no array os campos no formato "date" que serão exibidos no grid
      //para que sejam transformados de fato no tipo Date no resultado da API
      if(coluna.tipoColuna == "date"){
        this.colunasData.push(coluna.nomePropriedade);
        this.colunasDataFormat.push(coluna.formatoColuna);
      }
      if(coluna.formatoColuna == '{0:c}'){
        this.colunasFormatoMoedaToExport.push(coluna.nomePropriedade)
      }
    }

    //Zero a variável de erros da API
    this.erros = new ApiErrorCollection();

    //Carrego filtros previamente informados e persistidos
    if (this.popularFiltrosPersistidos() === false){
      //Carrego a primeira leva de dados da API
      this.carregarMaisDados();
    }

  }

  /**
   * Carrega novamente no grid os dados filtrados 
   * anteriormente, apenas se o atributo rotaCadastro
   * tiver sido informado
   */
  private popularFiltrosPersistidos(): boolean{
    var filtroGravado: FiltroPersistido;

    //Quando não persiste os dados sempre retorna false pra carregar normalmente os resultados da API
    if(this.naoPersistirFiltro === true){
      return false;
    }
    filtroGravado = this.gridPesquisaPersisteEstadoService.getCompositeFilterDescriptor(this.idGrid);
    if(filtroGravado){
      this.state.skip = filtroGravado.paginaAtual;
      this.state.filter = filtroGravado.filtros;
      if(this.formGroupPesquisa){
        this.formGroupPesquisa.setValue(filtroGravado.formGroupPesquisaData);
      }
      //this.executarPesquisa();
      this.executarPesquisaSemPersistirFiltro();
      return true;
      ////this.meuGrid.filterChange.emit(this.state.filter);
      //this.persistirDadosFiltro();
    }

    return false;
  }

  //** evento disparado pelo KendoUi Grid quando usuário solicita outra página */
  public pageChange(event: PageChangeEvent): void {
    this.state.skip = event.skip;

    //O Take é alterado quando é solicitado para exportar com todas as páginas
    this.state.take = event.take;
    this.persistirDadosFiltro();
    this.carregarMaisDados();
  }

  public sort: SortDescriptor[] = [{
    field: null,
    dir: null
  }];

  public sortable = {
    allowUnsort: true,
    mode: 'single'
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;

    //envio a alteração de ordenação usando o nome do campo
    if(this.nomeMetodoOrdenacao){
      this.colunasGrid.forEach(coluna => {
        if(coluna.nomePropriedade == sort[0].field){
          if(sort[0].dir == undefined){
            this.apiService[this.nomeMetodoOrdenacao](null, null);
          }else{
            this.apiService[this.nomeMetodoOrdenacao](coluna.nomeCampo, sort[0].dir);
          }
          
        }
      });
    }
    
    this.persistirDadosFiltro();
    this.carregarMaisDados();
  }

  /**
   * Método para exportação dos dados para Excel
   */
  public allData = (): Promise<GridDataResult>  => {
    return this.getAllDataToExport();
  }

  /**
   * Carrega todos os dados da API para exportação em Excel
   */
  private getAllDataToExport(): Promise<GridDataResult>{
    return new Promise((resolve, reject)=>{

      this.carregarMaisDadosAPI(1,this.filtro,this.gridView.total).then(
        dados => {

          let localeFile = this.assetsLocaleService.getLocaleFile('formatacao.moeda');
          let formatoMoeda = localeFile.traducao('moeda');

          //Criação da coluna de valores agregados pra exportação pro Excel
          let colunasAgregadas = this.getColunasComAgregacaoOuFormatacao();
          if(colunasAgregadas.length > 0){
            let novosDados = dados.map(item => {
              colunasAgregadas.forEach(coluna => {
                if(this.colunasGrid[coluna.index] instanceof GridPesquisaColumnAgregada){
                  let propriedades_e_separadores = this.getGridPesquisaColumnsAgregadas(coluna.field);
                  item[coluna.field] = propriedades_e_separadores.reduce((valorAnterior, valorAtual, index, array)=>{
                    if(index == 1){
                      //O primeiro loop do reduce já começa no indice 1
                      return  item[valorAnterior].trim() + valorAtual; 
                    }else
                    if ( index % 2 == 0 || index == 0) {
                      //parametro impar (even)
                      return valorAnterior + item[valorAtual].trim();  
                    }else{
                      //parametro par (Odd)
                      return valorAnterior + valorAtual;
                    }
                  });
                }else
                if(this.colunasGrid[coluna.index] instanceof GridPesquisaColumnFormat){
                  let column = <GridPesquisaColumnFormat>this.colunasGrid[coluna.index];
                  item[coluna.field] = column.executarFormatacao(item);
                }
                
              });
              this.colunasData.forEach((coluna , index)=> {
                item[coluna] = new Date(item[coluna]);
                let dateTimeFormat = this.colunasDataFormat[index].replace('{0:','').replace('}','');
                item[coluna] = this.datePipe.transform(item[coluna], dateTimeFormat);
              });
              this.colunasFormatoMoedaToExport.forEach((coluna , index)=> {
                let valor = this.currencyPipe.transform(item[coluna], formatoMoeda);
                if(valor == null) {
                  valor = '';
                };
                item[coluna] = valor;
              });
              return item;
            });
            dados = novosDados;
          }          

          const result: GridDataResult =  {
            data: dados,
            total: this.gridView.total
          };
          this.loading= false;
          resolve(result);
        },
        error =>{
          const result: GridDataResult =  {
            data: [],
            total: this.gridView.total
          };
          this.loading= false;
          reject(result);
        }
      )
    });
  }

  /**
   * Rertorna uma lista com as colunas do tipo 
   * GridPesquisaColumnAgregada concatenada com 
   * todas do tipo GridPesquisaColumnFormat
   */
  private getColunasComAgregacaoOuFormatacao(): ColumnSetting[]{
    
    let columnsFormat: ColumnSetting[] = [];

    let colunas: ColumnSetting[] = [];
    for (let index = 0; index < this.columns.length; index++) {
      const coluna = this.columns[index];
      if(this.colunasGrid[index] instanceof GridPesquisaColumnAgregada){
        colunas.push(coluna);
      }else
      if(this.colunasGrid[index] instanceof GridPesquisaColumnFormat){
        columnsFormat.push(coluna);
      }
    }
    colunas = colunas.concat(columnsFormat);
    return colunas;
  }

  /**
   * Enviar os dados de filtros internos e externos para serem persistidos
   * de forma a serem usados na próxima vez que a tela for recarregada.
   */
  private persistirDadosFiltro(){
    if (this.naoPersistirFiltro === false) {
      var formGroupPesquisaData = {};
      if(this.formGroupPesquisa){
        formGroupPesquisaData = this.formGroupPesquisa.value;
      }
      this.gridPesquisaPersisteEstadoService.adicionar(this.idGrid, this.state.skip , this.state.filter,  formGroupPesquisaData);
    }
  }

  public get_rotaCadastroNomeBotoes(index: number, rotaBtn: GridRotaCadastro): string{
    var arrayNomes = [];
    if(this.rotaCadastroNomeBotoes == null){
      arrayNomes = [];
    }else if(this.rotaCadastroNomeBotoes.length == 0){
      arrayNomes = [];
    }else{
      arrayNomes = this.rotaCadastroNomeBotoes.split('|');
    }

    if(index < arrayNomes.length){
      return arrayNomes[index];
    }else{
      return rotaBtn.textoBotaoCriarNovo;
    }
  }

  public getBotoesAcoes(): string[]{
    if(this.cabecalhoBotaoNomes == null){
      return [];
    }else if(this.cabecalhoBotaoNomes.length == 0){
      return [];
    }else{
      return this.cabecalhoBotaoNomes.split('|');
    }
  }

  /**
   * Cria o array de botões que chamam a tela de criar um novo cadastro.
   */
  public getBotoesCriarNovo(): GridRotaCadastro[]{
    if(this.rotaCadastro || this.gridInterfaceTabCadastroFilho){
      if( typeof this.rotaCadastro === 'string' || this.gridInterfaceTabCadastroFilho ){
        if(this.gridInterfaceTabCadastroFilho){
          return [{
            rota: '',
            nomeCampo: this.apiFieldKey,
            textoBotaoCriarNovo: this.textoBotaoCriarNovo,
            valorCampo: 0
          }];
        }else{
          return [{
            rota: <string>this.rotaCadastro,
            nomeCampo: this.apiFieldKey,
            textoBotaoCriarNovo: this.textoBotaoCriarNovo,
            valorCampo: 0
          }];
        }
      }else{
        return this.rotaCadastro.map(rota => {
          if (!rota.textoBotaoCriarNovo){
            let arrayRota = rota.rota.split('/');
            rota.textoBotaoCriarNovo = arrayRota[arrayRota.length - 1];
          }
          return rota;
        })
      }
    }else{
      return [];
    }
  }

  public cabecalhoBotaoClick_event(index: number){
    this.cabecalhoBotaoClick.emit(index);
  }

  public gridAbrirRotaCadastroNovo(rota: GridRotaCadastro){
    if(this.gridInterfaceTabCadastroFilho){
      this.isNotVisible = true;

      if(this.areaFiltro){
        this.areaFiltro.classList.add('invisivel');
      }
      
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_getCadastroBarraAcao().setIdCadastro('0', this);
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_setIdCadastro('0');
    }else{
      this.router.navigate([`${rota.rota}/0`]);
    }
  }

  /**
   * Evento acionado quando clicado no botão de edição.
   * Navega para a página de edição informada no atributo rotaCadastro.
   * Se a rota varia dependendo do objeto selecionado no grid para edição
   * então um array do tipo GridRotaCadastro deve ser informado para cada
   * opção de rota possível.
   * Se nenhuma ocorrência de rota for encontrada para um valor de campo
   * então emite um console erro.
   * @param event 
   */
  public gridEdit(dataItem: any):void{//event: EditEvent
    this.objetoSelecionado = dataItem;

    if(this.apiFieldKey == undefined){
      console.error('Para edição é necesário ter o attribute apiFieldKey informado com o nome da chave primária');
    }

    if(this.rotaCadastro){
      this.persistirDadosFiltro();

      if( typeof this.rotaCadastro === 'string' ){
        this.router.navigate([`${this.rotaCadastro}/${this.objetoSelecionado[this.apiFieldKey]}`]);
      }else{
        //Navega para a rota que o valor da campo a ser comparado combine com o valor de uma rota existente
        var index: number = 0;
        var gridRotaCadastro: GridRotaCadastro;
        for(index = 0; index <= this.rotaCadastro.length - 1; index ++){
          gridRotaCadastro = this.rotaCadastro[index];
          if(gridRotaCadastro.valorCampo == this.objetoSelecionado[gridRotaCadastro.nomeCampo]){
            this.router.navigate([`${gridRotaCadastro.rota}/${this.objetoSelecionado[this.apiFieldKey]}`]);
            return;
          }
          
        }
        console.error(`Nenhuma das rotas ${this.rotaCadastro} foi definida para esse registro`, this.objetoSelecionado);
      }
      
    }else if(this.gridInterfaceTabCadastroFilho){
      //modo de cadastro de um filho dentro de uma TAB
      this.isNotVisible = true;
      if(this.areaFiltro){
        this.areaFiltro.classList.add('invisivel');
      }
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_getCadastroBarraAcao().setIdCadastro(this.objetoSelecionado[this.apiFieldKey], this);
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_setIdCadastro(this.objetoSelecionado[this.apiFieldKey]);
    }else{
      console.error('não foi definido o valor para o attribute rotaCadastro ou para o attribute cadastroBarraAcao');
    }

    
  }

  /**
   * Evento acionado quando clicado no botão de exclusão.
   * Navega para a página de exclusão informada no atributo rotaCadastro, 
   * porém informando no final da rota o texto "/excluir".
   * Se a rota varia dependendo do objeto selecionado no grid para edição
   * então um array do tipo GridRotaCadastro deve ser informado para cada
   * opção de rota possível.
   * Se nenhuma ocorrência de rota for encontrada para um valor de campo
   * então emite um console erro.
   * @param event 
   */
  public gridRemove(dataItem: any):void{//(event: RemoveEvent)
    this.objetoSelecionado = dataItem;

    if(this.apiFieldKey == undefined){
      console.error('Para exclusão é necesário ter o attribute apiFieldKey informado com o nome da chave primária');
    }

    if(this.rotaCadastro){

      this.persistirDadosFiltro();

      if( typeof this.rotaCadastro === 'string' ){
        this.router.navigate([`${this.rotaCadastro}/${this.objetoSelecionado[this.apiFieldKey]}/excluir`]);
      }else{
        //Navega para a rota que o valor da campo a ser comparado combine com o valor de uma rota existente
        var index: number = 0;
        var gridRotaCadastro: GridRotaCadastro;
        for(index = 0; index <= this.rotaCadastro.length - 1; index ++){
          gridRotaCadastro = this.rotaCadastro[index];
          if(gridRotaCadastro.valorCampo == this.objetoSelecionado[gridRotaCadastro.nomeCampo]){
            
            this.router.navigate([`${gridRotaCadastro.rota}/${this.objetoSelecionado[this.apiFieldKey]}/excluir`]);
            return;
          }
          
        }
        console.error(`Nenhuma das rotas ${this.rotaCadastro} foi definida para esse registro`, this.objetoSelecionado);
      }
      
    }else if(this.gridInterfaceTabCadastroFilho){
      //modo de cadastro de um filho dentro de uma TAB
      this.isNotVisible = true;

      if(this.areaFiltro){
        this.areaFiltro.classList.add('invisivel');
      }

      var id: string = this.objetoSelecionado[this.apiFieldKey] + '';
      
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_getCadastroBarraAcao().setIdCadastro(id, this);
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_setIdCadastro(id);
      this.gridInterfaceTabCadastroFilho.gridInterfaceTabCadastroFilho_getCadastroBarraAcao().setModoExclusao(id, this);
    }else{
      console.error('não foi definido o valor para o attribute rotaCadastro ou para o attribute cadastroBarraAcao');
    }

  }

  public checked: boolean = true;
  /**
   * Limpa os filtros do template de filtros booleanos
   * que foram limpos do menu de filtros do grid
   * @param event 
   */
  private limparFiltrosBoolean(event: CompositeFilterDescriptor): void{
    var listaFiltrosAPlicados: string[] = this.getNomeFiltrosAplicados(event);
    Object.keys(this.persistenciaFiltroBoolean).forEach(nomeCampo=> {
      if(listaFiltrosAPlicados.indexOf(nomeCampo) < 0){
        //retiro o valor persistido por não estar mais em uso
        this.persistenciaFiltroBoolean[nomeCampo] = null;
      }
    })
  }
  /**
   * Retorna o nome de todos os campos usados nos filtros do grid.
   * * criado para ser usado no método limparFiltrosBoolean
   * @param event 
   */
  private getNomeFiltrosAplicados(event: CompositeFilterDescriptor): string[]{
    var listaFiltrosAPlicados: string[] = [];

    event.filters.forEach(filtro => {
      var resp  = this.isFilterDescriptor(filtro);
      if(this.isFilterDescriptor(filtro)){
        filtro = <FilterDescriptor>filtro;
        if(typeof filtro.field == 'string'){
          listaFiltrosAPlicados.push(<string>filtro.field);
        }
      }else{
        listaFiltrosAPlicados = listaFiltrosAPlicados.concat(this.getNomeFiltrosAplicados(filtro));
      }
    });

    return listaFiltrosAPlicados;
  }
  /**
   * Faz a validação se o tipo de filtro recebido é do tipo FilterDescriptor
   * @param filtro 
   */
  private isFilterDescriptor(filtro: CompositeFilterDescriptor|FilterDescriptor): filtro is FilterDescriptor {
    return (<FilterDescriptor>filtro).field !== undefined;
  }

  //** evento disparado pelo KendoUi Grid quando o filtro é alterado pelo usuário */
  public filterChange(event: CompositeFilterDescriptor): void {

    this.state.filter = event;
    this.persistirDadosFiltro();
    this.limparFiltrosBoolean(event);
    
    if(event['filters']){
      
      if(event.filters.length > 0){
        this.state.skip = 0;

        this.filtro = GridFilterTranspiller.toString(event, this.colunasGrid);

        var filtroExterno = this.externalFiltersManager.getFiltrosAsString(this.colunasGrid);
        if (filtroExterno.length > 0){
          this.filtro = `(${this.filtro})~and~${filtroExterno}`;
        }

        this.carregarMaisDados();
      }else{
        var filtroExterno = this.externalFiltersManager.getFiltrosAsString(this.colunasGrid);
        this.filtro = filtroExterno;
        this.carregarMaisDados();
      }
    }else{
      var filtroExterno = this.externalFiltersManager.getFiltrosAsString(this.colunasGrid);
      this.filtro = filtroExterno;
      this.carregarMaisDados();
    }
    
  }

  public selectionChange(rowSelected: any): void{
    if(rowSelected.selectedRows.length > 0){
      this.objetoSelecionado = rowSelected.selectedRows[0].dataItem;
    }else{
      this.objetoSelecionado = null;
    }

    if(this.mudouSelecao){
      this.mudouSelecao.emit(this.objetoSelecionado);
    }
  }

  private carregarMaisDadosAPI(actual_page: number, filtro: string, page_size?: number): Promise<any>{
    var tamanho_pagina: number;
    if(page_size){
      tamanho_pagina = page_size;
    }else{
      tamanho_pagina = this.state.take;
    }
    this.loading = true;

    return this.apiService[this.nomeMetodoApi](actual_page, tamanho_pagina, filtro);
  }

  private comunicar_resultadosTotaisMudou(totalResultados: number){
    if(this.resultadosTotaisMudou){
      this.resultadosTotaisMudou.emit(totalResultados);
    }
  }

  public carregarMaisDados(paginaAtual?: number){
    
    var dados_filter: string;
    var totalRecordCount: number = 0;

    //Calculo a página atual para informar a API
    if(paginaAtual){
      var actual_page = paginaAtual;
      this.state.skip = (paginaAtual - 1) * this.state.take;
    }else{
      var actual_page = (this.state.skip / this.state.take) + 1;
    }
    

    this.carregarMaisDadosAPI(actual_page, this.filtro).then(
      dados =>{
        this.loading = false;
        //this.persistirDadosFiltro();
        
        if(dados){
          if(dados.length > 0){
            totalRecordCount = dados[0].inRecordCount || dados.length;
            
            if(totalRecordCount < this.gridView.total){
              this.state.skip = 0;
            }
          }else{
            if(actual_page > 1){
              /**
               * se não retornou dados e ainda tem paginação 
               * para voltar então solicita a API para listar 
               * uma página anterior
               */
              actual_page --;
              this.carregarMaisDados(actual_page);
              this.comunicar_resultadosTotaisMudou(1);
              return;
            }
            
          }
        }

        //transforma os campos de data exibidos no grid no tipo Date
        //para que sejam adequadamente formatados para exibição
        if(this.colunasData.length > 0){
          var dadosComData: any;
          dadosComData = dados.map( objeto => {
            for(let colunaNome of this.colunasData){
              objeto[colunaNome] = new Date(objeto[colunaNome]);
            }
            return objeto;
          });
          dados = dadosComData;
        }
        

        this.gridView = {
          data: dados,
          total: totalRecordCount
        };

        this.comunicar_resultadosTotaisMudou(totalRecordCount);

        this.alterarTamanhoColunaBotoesAcao();
        setTimeout(() => {
          //this.changeDetectorRef.markForCheck();
          this.grid_coluna_editar_width = this.grid_coluna_editar_width_tmp;
        });

      },
      erros =>{
        this.loading = false;
        this.erros = erros;
        console.error('Erro ao receber os dados: ', erros);
      }
    );
  }

  public getExpessuraGrid(): string{
    var width: number = 0;
    this.colunasGrid.forEach((coluna)=>{
      if(coluna.hidden == false && coluna.width > 0){
        width += coluna.width;
      }
    });
    if(width > 0){
      return (width + 95) + 'px';
    }else{
      return '';
    }
  }

  public getAlturaGrid(): string{

    if(this.esconderColunaButoesAcao === true || this.naoPersistirFiltro === true){
      return "";
    }

    var altura_comandos_cabecalho = 47;
    var altura_titulo_colunas = 37;
    var altura_rodape = 47;
    var expessura_scroll_horizontal = 18; //scroll + altura em pixel das linhas do cabeçalho, titulo e rodapé
    var folga = 1; //para evitar exibir o scroll vertical
    var height = altura_comandos_cabecalho + altura_titulo_colunas + altura_rodape + expessura_scroll_horizontal + folga + (this.pageSize * 34);
    
    return height + 'px';
  }

  public pode_btn_acao_exibir(btn: GridPesquisaBotaoAcaoLinhaComponent, dataItem?: any): boolean{
    var retornoFuncaoValidacao = true;
    var retornoFuncaoValidacaoUpdate = this.permissao_editar;
    if(typeof this.btn_acao_exibir == 'function'){
      let arg = new GridPesquisaColunaEditarBotaoClick();
      arg.dataItem = dataItem;
      arg.botao = btn;
      retornoFuncaoValidacao = this.btn_acao_exibir(arg);
      if(btn.id == 'Read'){
        let arg = new GridPesquisaColunaEditarBotaoClick();
        arg.dataItem = dataItem;
        arg.botao = this.btn_update;
        retornoFuncaoValidacaoUpdate = this.btn_acao_exibir(arg);
      }
    }
    if(retornoFuncaoValidacao == true){
      this.alterarTamanhoColunaBotoesAcao();
    }
    if(btn.id == 'Create'){
      return (retornoFuncaoValidacao == true && this.permissao_incluir);
    }if(btn.id == 'Read'){
      if(retornoFuncaoValidacao == false) return false;
      if(retornoFuncaoValidacaoUpdate == false && this.permissao_visualizar) return true;
      return (retornoFuncaoValidacao == true && this.permissao_visualizar && this.permissao_editar == false);
    }if(btn.id == 'Update'){
      return (retornoFuncaoValidacao == true && this.permissao_editar);
    }if(btn.id == 'Delete'){
      return (retornoFuncaoValidacao == true && this.permissao_excluir);
    }else{
      return retornoFuncaoValidacao;
    }
  }

  // public abrirRotaFilha(obj: any): void{
  //   this.router.navigateByUrl(`${this.router.url }/${obj[this.apiFieldKey]}/filho/${this.rotaFilha_url}`);
  // }

  public btn_crude_filho_abrirRotaFilha(botao: GridPesquisaBotaoAcaoLinhaComponent, obj: any): void{
    var naoUsarRota = false;
    if(this.colunaEditarBotaoClick){
      if(!botao.rotaFilha_url){
        var btnClickData = new GridPesquisaColunaEditarBotaoClick();
        btnClickData.botao = botao;
        btnClickData.dataItem = obj;
        this.colunaEditarBotaoClick.emit(btnClickData);
        naoUsarRota = true;
      }
    }
    if(naoUsarRota == false)
    this.router.navigateByUrl(`${this.router.url }/${obj[this.apiFieldKey]}/filho/${botao.rotaFilha_url}`);
  }

  public pode_btn_Validar_exibir(dataItem: any): boolean{
    var retornoFuncaoValidacao = false;
    if(typeof this.btn_Validar_exibir == 'function'){
      retornoFuncaoValidacao = this.btn_Validar_exibir(dataItem);
    }
    if(retornoFuncaoValidacao == true){
      this.btn_validar_habilitado = retornoFuncaoValidacao;
      this.alterarTamanhoColunaBotoesAcao();
      //this.changeDetectorRef.markForCheck();
    }
    
    return (retornoFuncaoValidacao == true && this.permissao_validar);
  }

  public pode_btn_Inativar_exibir(dataItem: any): boolean{
    var retornoFuncaoValidacao = false;
    if(typeof this.btn_Inativar_exibir == 'function'){
      retornoFuncaoValidacao = this.btn_Inativar_exibir(dataItem);
    }
    if(retornoFuncaoValidacao == true){
      this.btn_inativar_habilitado = retornoFuncaoValidacao;
      this.alterarTamanhoColunaBotoesAcao();
      // this.changeDetectorRef.markForCheck();
    }

    return (retornoFuncaoValidacao == true && this.permissao_inativar);
  }

  public pode_btn_Reativar_exibir(dataItem: any): boolean{
    var retornoFuncaoValidacao = false;
    if(typeof this.btn_Reativar_exibir == 'function'){
      retornoFuncaoValidacao = this.btn_Reativar_exibir(dataItem);
    }
    if(retornoFuncaoValidacao == true){
      this.btn_reativar_habilitado = retornoFuncaoValidacao;
      this.alterarTamanhoColunaBotoesAcao();
      // this.changeDetectorRef.markForCheck();
    }

    return (retornoFuncaoValidacao == true && this.permissao_reativar);
  }

  public pode_btn_Cancelar_exibir(dataItem: any): boolean{
    var retornoFuncaoValidacao = false;
    if(typeof this.btn_Cancelar_exibir == 'function'){
      retornoFuncaoValidacao = this.btn_Cancelar_exibir(dataItem);
    }
    if(retornoFuncaoValidacao == true){
      this.btn_cancelar_habilitado = retornoFuncaoValidacao;
      this.alterarTamanhoColunaBotoesAcao();
      // this.changeDetectorRef.markForCheck();
    }

    return (retornoFuncaoValidacao == true && this.permissao_cancelar);
  }

  public send_btn_Validar_click(data: any){
    this.btn_Validar_click.emit(data);
  }
  public send_btn_Inativar_click(data: any){
    this.btn_Inativar_click.emit(data);
  }
  public send_btn_Reativar_click(data: any){
    this.btn_Reativar_click.emit(data);
  }
  public send_btn_Cancelar_click(data: any){
    this.btn_Cancelar_click.emit(data);
  }

  public persistenciaFiltroBoolean = [];
  public filtroBooleanAlterado(values: any, filterService: FilterService, nome_campo: string): void {
    const valor = (values['target']['defaultValue'] == 'Sim'? true: false);
    var filtro = <FilterDescriptor>{
      field: nome_campo,
      operator: "eq",
      value: valor
    };

    this.persistenciaFiltroBoolean[nome_campo] = valor;
    
    filterService.filter({
        filters: [filtro],
        logic: "or"
    });
  }

  public getGridPesquisaColumnsAgregadas(field: string): Array<string>{
    return field.split('/');
  }
  // public isGridPesquisaColumnAgregada(column: any){
  //   return column.format == 'agregada' && column.field.indexOf('/')>=0 && column.type == 'text';
  // }
  
  public executarFormatacaoColuna(index: number, objeto: any){
    let coluna = this.colunasGrid[index];
    if( coluna instanceof GridPesquisaColumnFormat){
      let column = <GridPesquisaColumnFormat>coluna;
      return column.executarFormatacao(objeto);
    }
    return '';
  }

  public exibirAguarde(callback?: Function){
    this.aguardeCarregando.exibir();
    if(callback){
      setTimeout(()=>{
        callback();
      },1);
    }
  }

  public esconderAguarde(){
    this.aguardeCarregando.esconder();
  }

  /**
   * Exibe uma caixa de diálogo que só fecha quando o usuário clicar para fechar.
   * * Não é obrigatório o título
   * @param msg 
   */
  public dialogo_exibir(msg: string, titulo?: string){
    this.caixaDialogo.dialogo_exibir(msg,titulo);
  }

  public dialogo_fechar(){
    this.caixaDialogo.dialogo_fechar();
  }

  /**
   * Exibe uma mensagem por até 3 segundos que fecha sozinha caso o usuário não o faça
   * @param msg 
   */
  public alerta_exibir(msg: string){
    this.caixaDialogo.alerta_exibir(msg);
  }
  
}
