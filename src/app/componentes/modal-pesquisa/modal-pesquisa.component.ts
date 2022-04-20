import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaComponent } from '../grid-pesquisa/grid-pesquisa.component';
import { InterfaceModalCadastro} from './interface-modal-cadastro';
import { InterfaceFiltroInterdependente } from '../interfaces/interface-filtro-interdependente';

//Idea de como filtrar dados usando a ultima pesquisa feita, aguardando usuario terminar digitação por 400 milisegundos
//https://alligator.io/angular/real-time-search-angular-rxjs/
import { Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


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
}

//export type api_metodo_get_dados = (page: number, pageSize: number, filter: any) => Promise<any>;
@Component({
  selector: 'app-modal-pesquisa',
  templateUrl: './modal-pesquisa.component.html',
  styleUrls: ['./modal-pesquisa.component.scss']
})
export class ModalPesquisaComponent implements OnInit, InterfaceFiltroInterdependente {

  @ViewChild('gridPesquisa') gridPesquisa: GridPesquisaComponent;
  @Input() titulo: string;
  @Input() width: number;
  @Input() height: number;
  //@Input() instancia: any;
  @Input() nomeMetodoApi: string;//Nome do método de listar da API
  @Input() apiService: any;
  @Input() nomeMetodoOrdenacao: string;

  //Interface com método para adicionar novos cadastros
  @Input() interfaceModalCadastro: InterfaceModalCadastro;
  @Input() colunasGrid: GridPesquisaColumn[];
  @Input() pageSize: number;
  @Output() confirmado: EventEmitter<any> = new EventEmitter<any>();

  @Input() childComponent: InterfaceFiltroInterdependente;
  @Input() childComponentFieldWhere: string;


  public opened: boolean;
  public erros: ApiErrorCollection;
  public exibirBotaoAdd: boolean;
  
  private observerFiltroAlterado = new Subject<string>();

  private objetoSelecionado: any;

  /** Filtro externo que deve ser aplicado sobre apesquisa desse componente */
  private filtro_extra: string = '';

  constructor() {

    var totalRecordCount: number = 0;

    this.exibir_botao_add(false);
  }

  public resultadosTotaisMudou(totalRegistros: number){
    if(totalRegistros == 0){
      this.exibir_botao_add(true);
    }else{
      this.exibir_botao_add(false);
    }
  }

  private exibir_botao_add(valor: boolean): void {

    //Não exibe o botão de adicioanr se a interface de cadastramento 
    //não foi passada nos atributos do componente
    if(valor == true){
      if(this.interfaceModalCadastro == undefined){
        return;
      }
    }
    this.exibirBotaoAdd = valor;
  }

  public cadastrar(event){
    if(this.interfaceModalCadastro){
      this.interfaceModalCadastro.exibirTelaCadastro(() =>{
        this.gridPesquisa.carregarMaisDados();
      });
    }
  }

  /**
   * Inclui para a condição dessa pesquisa um filtro externo
   */
  public filtroAlterado(field: string, operator: string, valor: any){

    this.gridPesquisa.filtroAlterado(field, operator, valor);
    this.gridPesquisa.executarPesquisa();
    if(this.colunasGrid){
      this.erros = new ApiErrorCollection();
      this.inicializarState();
      this.executarPesquisaNovamente();
    }
    
  }

  private inicializarState(): void{
    if(this.gridPesquisa) this.gridPesquisa.inicializarState();
  }

  ngOnInit() {
    this.inicializarState();
  }


  /**
   * Usado para forçar externamente que a pesquisa seja executada novamente
   * após um novo cdastro ter sido feito
   */
  public executarPesquisaNovamente(){
    if(this.gridPesquisa){
      //Informo a página zero para o novo resultado de pesquisa
      this.gridPesquisa.inicializarState();

      //SOlicita a API novos dados com a mesma pesquisa
      this.gridPesquisa.carregarMaisDados();
    }
  }

  public colunasGrid_set(colunasGrid: GridPesquisaColumn[]){
    this.colunasGrid = colunasGrid;
    this.erros = new ApiErrorCollection();
    this.inicializarState();
  }

  public exibir(){
    this.objetoSelecionado = null;

    //Inicializo a variável do grid que indica quantos registros saltar na paginação
    //this.skip = 0;
    //this.state.skip = 0;

    //Zero a variável de erros da API
    this.erros = new ApiErrorCollection();
    //Marco o modal como aberto para que seja exibido
    this.opened = true;
    //Carrego a primeira leva de dados da API
    //this.carregarMaisDados();

    this.observerFiltroAlterado.next(''); 
  }

  public fechar($event): void {
    this.opened = false;
    //this.log('Window was closed');
  }

  public selectionChange(rowSelected: any): void{
    this.objetoSelecionado = rowSelected;
  }

  public cancelar() {
    //Fecho a janela
    this.opened = false;
  }

  public confirmar() {
    //pega a linha selecionada e retornar o objeto dela
    if(this.objetoSelecionado){
      this.confirmado.emit(this.objetoSelecionado);
      //Fecho a janela
      this.opened = false;
    }else{
      this.erros.mensagem_geral='É necessário selecionar uma linha antes';
      setTimeout(()=>{
        this.erros.mensagem_geral = '';
      },1500)
    }
    
  }

}
