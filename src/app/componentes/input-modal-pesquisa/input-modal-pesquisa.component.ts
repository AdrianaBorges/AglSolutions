//Criando componentes compatíveis com Reactive e Model Forms
//https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73
//https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
//https://almerosteyn.com/2016/03/angular2-form-validation-component
import { 
  Component, OnInit, ViewChild, ElementRef,
  Input, Output, EventEmitter,
  forwardRef } from '@angular/core';
import {
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS, 
  FormControl, 
  Validator
} from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { GridFilterTranspiller } from '../camada-logica/KendoUi/GridFilterTranspiller';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { GridPesquisaColumn } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModalPesquisaComponent } from '../modal-pesquisa/modal-pesquisa.component';
import { GridPesquisaComponent } from '../grid-pesquisa/grid-pesquisa.component';
import { InterfaceModalCadastro} from '../modal-pesquisa/interface-modal-cadastro';
import { InterfaceColunasGrid } from '../interfaces/interface-get-colunas-grid';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { AssetsLocaleService } from '../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../assets-locale/locale-data-file';
import { InterfaceFiltroInterdependente} from '../interfaces/interface-filtro-interdependente';

/*
  Providers: [
    ...,
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputModalPesquisaComponent),
      multi: true
    }
  ]
 */

@Component({
  selector: 'app-input-modal-pesquisa',
  templateUrl: './input-modal-pesquisa.component.html',
  styleUrls: ['./input-modal-pesquisa.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputModalPesquisaComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputModalPesquisaComponent,
      multi: true
    }
    // ,
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => InputModalPesquisaComponent),
    //   multi: true
    // }
  ]
})
export class InputModalPesquisaComponent implements OnInit, InterfaceModalCadastro, ControlValueAccessor {
  //implements Validator
  private required: boolean = false;
  public valido: boolean;
  public touched: boolean = false;

  @Input() exibirTooltip: boolean = false;

  //Atributos passados para o modal de pesquisa
  @Input() tipo: 'pesquisa' | 'edicao' = 'pesquisa';
  @Input() placeholder: string;
  @Input() modalTitulo: string;
  @Input() modalHeight: string;
  @Input() modalWidth: string;

  @Input() pageInstance: any;//Instância da página do modal de cadastro, usada para incluir novos dados quando a pesquisa não retornar dados;
  @Input() pageNomeMetodoCadastrar: string//Nome do método que exibe o cadastro, deve ter a mesma assinatura do método da "InterfaceModalCadastro"

  @Input() apiService: any;
  @Input() nomeMetodoOrdenacao: string;
  @Input() apiNomeMetodoListar: string;//Nome do método de listar da API
  @Input() apiFieldExibir: string;
  @Input() apiFieldKey: string;//field do qual o valor será recuperado da listagem do modal de pesquisa e passado  o valor para ser filtrado
  @Input() pageSize: number;
  //INPUTS ESPECÍFICOS PARA PESQUISA
  //
  //Atributos que serão usados pela diretiva "grid-filtro-externo.directive"
  //O "field" é importante para que apenas o valor seja passado como valor do evento de alteração quando escolhido um novo valor
  //O "operator" só está aqui para reforçar que deve existir para ser usado pela diretiva "grid-filtro-externo.directive"
  
  @Input() pesquisaFieldWhere?: string;//field que será usado na condição where pela UI que estiver consumindo esse componente
  @Input() pesquisaOperator: string;
  @Input() pesquisaGridFiltro: GridPesquisaComponent;
  //FIM INPUTS PESQUISA

  //Especificação para a pesquisa rápida
  protected pesquisaRapidaText: string = '';
  @Input() pesquisaRapida: boolean;
  @Input() pesquisaRapidaTipo: 'text' | 'number' = 'text';
  @Input() pesquisaRapidaApiNomeMetodo: string;
  @Input() pesquisaRapidaPlaceholder: string; // = this.pesquisaRapidaPlaceholder || '';
  @Input() pesquisaRapidaMaxlength: number;// = this.pesquisaRapidaMaxlength || 5;
  @Input() pesquisaRapidaWidth: string;
  public numero_max: number = 9;

  @Input() childComponent: InterfaceFiltroInterdependente;
  @Input() childComponentFieldWhere: string;

  @Input() colunasGrid: GridPesquisaColumn[];

  private pesquisaRapidaPlaceholderOriginal: string;
  public styleWidth: {width: string};

  //INPUTS PARA MANIPULAÇÃO DE DADOS DE UM OBJETO
  //@Input() model: any;
  public model: any;//Se o objeto passado tiver apenas 2 propriedades, uma string e outra numérica, então as propriedades abaixo do modelo não precisam ser informadas
  public modelPropriedadeDescricao: string;
  public modelPropriedadeValor: string;
  //FIM

  //INPUTS DO FORM CONTROL
  @Input() disabled = false;
  //

  //Retorna nesse evento o objeto selecionado no grid
  @Output() valorAlterado: EventEmitter<any> = new EventEmitter<any>();

  //Filtros de pesquisa
  @ViewChild('instanciaModalPesquisa', { static: true }) instanciaModalPesquisa: ModalPesquisaComponent;

  //Traducao i18n para o valor não localizado
  @ViewChild('msgValorNaoLocalizado', { static: true }) msgValorNaoLocalizado: ElementRef;

  //public inputText: string;
  public modoEdicao: boolean;

  private alterado: boolean;

  constructor(
    private assetsLocaleService: AssetsLocaleService
  ) {
    this.pageSize = this.pageSize || 30;
   }

  ngOnInit() {
    this.pesquisaRapidaPlaceholder = this.pesquisaRapidaPlaceholder || '';
    this.pesquisaRapidaMaxlength = (this.pesquisaRapidaMaxlength? +this.pesquisaRapidaMaxlength: 5);
    this.pesquisaRapidaWidth = (this.pesquisaRapidaWidth? this.pesquisaRapidaWidth: '');
    var numero_max = '';
    if(this.pesquisaRapidaTipo == 'number'){
      this.styleWidth = {width:`${this.pesquisaRapidaMaxlength}em`};
      for (let index = 0; index < this.pesquisaRapidaMaxlength; index++) {
        numero_max += '9';
        
      }
      this.numero_max = + numero_max;
    }

    if(this.pesquisaRapidaWidth.length == 0){
      this.pesquisaRapidaWidth = (this.pesquisaRapidaMaxlength + 1) * 10 + 'px';
    }

    if(this.pesquisaFieldWhere == undefined){
      this.pesquisaFieldWhere = this.apiFieldKey;
    }

    this.pesquisaRapidaPlaceholderOriginal = this.pesquisaRapidaPlaceholder || ''

    if(this.modelPropriedadeDescricao == undefined){
      this.modelPropriedadeDescricao = 'inputText';
    }

    if(this.modelPropriedadeValor == undefined){
      this.modelPropriedadeValor = 'valor';
    }

    if(this.model == undefined){
      this.model = {
        [this.modelPropriedadeDescricao]: '',
        [this.modelPropriedadeValor]: 0
      }
    }
    if(this.tipo == 'edicao'){
      this.modoEdicao = true;
    }else{
      this.modoEdicao = false;
    }
  }

  private localeFile: LocaleDataFile;

  getTootip(): string{
    if(this.exibirTooltip){
      var tooltip_selecione: string;
      if(!this.localeFile){
        this.localeFile = this.assetsLocaleService.getLocaleFile('componentes.input-modal-pesquisa.input-modal-pesquisa.component.ts')
      }
      tooltip_selecione = this.localeFile.traducao('selecione');
      
      return (this.model[this.apiFieldExibir]? this.model[this.apiFieldExibir]: tooltip_selecione);
    }else{
      return '';
    }
    
  }

  getInterfaceModalCadastro(): InterfaceModalCadastro{
    if(this.pageInstance){
      if(this.pageNomeMetodoCadastrar){
        return this;
      }
    }
    return undefined;
  }

  exibirTelaCadastro(callBack: Function): void{
    if(this.pageInstance){
      if(this.pageNomeMetodoCadastrar){
        //Chama o método de exibir o cadastro, e passa como callback a função 
        //que irá atualizar a lista após o cadastro ter sido confirmado
        this.pageInstance[this.pageNomeMetodoCadastrar](()=>{
          this.atualizarLista()
        });
      }
    }
  }

  atualizarLista(){
    this.instanciaModalPesquisa.executarPesquisaNovamente()
  }

  /**
   * Inclui para a condição dessa pesquisa um filtro externo
   */
  public filtroAlterado(field: string, operator: string, valor: any){
    if(this.apiService){
      var inteface: InterfaceColunasGrid = this.apiService;
      this.instanciaModalPesquisa.colunasGrid_set(inteface.getColunasGrid());
    }
    
    this.instanciaModalPesquisa.filtroAlterado(field, operator, valor);
  }

  public getColunasGrid(): GridPesquisaColumn[]{
    if(this.colunasGrid){
      return this.colunasGrid;
    }else if(this.apiService){
      try{
        var inteface: InterfaceColunasGrid = this.apiService;
        return inteface.getColunasGrid();
      }catch(ex){
        console.error(`O Objeto passado no 'apiService' deve implementar a interface 'sistema/interface/InterfaceColunasGrid'. attributo field_key="${this.apiFieldKey}", field_where=${this.pesquisaFieldWhere}.`);
      }
    }else{
      return [];
    }
  }

  exibirModal(){
    this.touched = true;
    this.onTouched();
    this.instanciaModalPesquisa.exibir();
  }

  limparFiltro(){

    this.touched = true;
    this.resultadoPesquisaValido = true;

    this.onTouched();
    this._onChange(null);

    this.pesquisaRapidaText = '';

    this.pesquisaRapidaPlaceholder = this.pesquisaRapidaPlaceholderOriginal;

    this.model[this.modelPropriedadeDescricao] = null;
    this.model[this.modelPropriedadeValor] = 0;

    //Informo ao grid que o filtro mudou
    if(this.pesquisaGridFiltro){
      this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, null);
    }

    //Informo a algum componente dependente 
    if(this.childComponent){
      this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, null);
    }

    this.valorAlterado.emit(null);
  }

  marcarAlterado(){
    this.onTouched();
    this.alterado = true;
  }

  onChange_modal_pesquisa(objeto: any): void{

    this.valido = true;

    //Aplico os valores no objeto recebido
    if(this.model){
      if(this.modelPropriedadeDescricao && this.apiFieldExibir){
        this.model[this.modelPropriedadeDescricao] = objeto[this.apiFieldExibir];
      }
      if(this.modelPropriedadeValor && this.apiFieldKey){
        this.model[this.modelPropriedadeValor] = objeto[this.apiFieldKey];
        if(this.pesquisaFieldWhere == this.apiFieldKey){
          this.pesquisaRapidaText = objeto[this.apiFieldKey];
        }
      }
      this.model['objetoSelecionado'] = objeto;
    }

    if(!objeto[this.apiFieldExibir]){
      console.error(`O nome da propriedade "${this.apiFieldExibir}" a ser exibida do objeto selecionado não existe nele: `, objeto);
    }
    
    //Informo ao grid que o filtro mudou
    if(this.pesquisaGridFiltro){
      this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, objeto[this.apiFieldKey]);
    }

    //Informo a algum componente dependente 
    if(this.childComponent){
      this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, objeto[this.apiFieldKey]);
    }
    
    //retorna o valor do atributo identificado pelo "field" do objeto selecionado no modal de pesquisa
    this.valorAlterado.emit(objeto);

    if(this._onChange){
      if(objeto){
        if(this.modelPropriedadeValor && this.modelPropriedadeDescricao){
          if(objeto[this.modelPropriedadeValor]>0 || ( (objeto[this.modelPropriedadeValor]+'').length > 0 && typeof objeto[this.modelPropriedadeValor] == 'string')){
            //this.pesquisaRapidaPlaceholder = objeto[this.modelPropriedadeValor];
            //this.pesquisaRapidaText = '';
            this._onChange({
              [this.modelPropriedadeValor]: objeto[this.modelPropriedadeValor],
              [this.modelPropriedadeDescricao]: objeto[this.modelPropriedadeDescricao],
              objetoSelecionado: objeto
            });  
          }else{
            this.valido = false;
            this._onChange(null);  
          }
        }else{
          this.valido = false;
          this._onChange(null);
        }
      }else{
        this.valido = false;
        this._onChange(null);
      }
      
    }
  }

  //INÍCIO ControlValueAccessor

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(object: any): void {
    this.valido = true;
    this.modelPropriedadeValor = null;
    this.modelPropriedadeDescricao = null;

    //Informo ao grid que o filtro mudou
    if(this.pesquisaGridFiltro){
      if(object){
        if(object[this.apiFieldKey]){
          this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, object[this.apiFieldKey]);
        }
      }
    }

    //Informo a algum componente dependente 
    if(this.childComponent){
      if(object){
        if(object[this.apiFieldKey]){
          this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, object[this.apiFieldKey]);
        }
      }      
    }

    const constStrErro = `É obrigatório informar um objeto com duas propriedades com nomes iguais aos informados em "apiFieldKey" e "apiFieldExibir" , modalTitulo=[${this.modalTitulo}], placeholder=[${this.placeholder}]`;

    if(object){

      this.modelPropriedadeValor = this.apiFieldKey;
      this.modelPropriedadeDescricao = this.apiFieldExibir;

      var countProperties: number = 0;
      Object.keys(object).forEach(key => {
        // countProperties += 1;

        // if(typeof(object[key]) == 'number'){
        //   this.modelPropriedadeValor = key
        // }else{
        //   this.modelPropriedadeDescricao = key;
        // }
        if(key == this.apiFieldKey){
          countProperties += 1;
        }else if(key == this.apiFieldExibir){
          countProperties += 1;
        }
      });

      if ( countProperties != 2 ){
        console.error(constStrErro);
        return;
      }

      this.model[this.apiFieldExibir] = object[this.apiFieldExibir];
      this.model[this.apiFieldKey] = object[this.apiFieldKey];

      //se a pesquisa é o mesmo campo da chave estrangeira
      if(this.pesquisaFieldWhere == this.apiFieldKey){
        this.pesquisaRapidaText = object[this.apiFieldKey];
      }

      if(this.chaveEstrangeiraInformada() == false){
        this.valido = false;
        this._onChange(null);
      }else{
        //this.pesquisaRapidaPlaceholder = this.model[this.modelPropriedadeValor];
      }
    }else{
      this.valido = false;
      this.modelPropriedadeValor = this.apiFieldKey;
      this.modelPropriedadeDescricao = this.apiFieldExibir;

      this.model = {};
      this.model[this.apiFieldExibir] = '';
      this.model[this.apiFieldKey] = 0;
      this.pesquisaRapidaText='';
      //this.pesquisaRapidaPlaceholder = this.pesquisaRapidaPlaceholderOriginal;
    }
  }

  _onChange = (objeto_selecionado: any) => {};
  // Allows Angular to register a function to call when the selection changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (objeto_selecionado: any) => void): void {
    this._onChange = fn;
  }

  // Function to call when the grid is selected is touched (when a star is clicked).
  onTouched = () => {}

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  chaveEstrangeiraInformada(): boolean{
    if(this.model){
      if(this.modelPropriedadeValor){
        return (this.model[this.modelPropriedadeValor] > 0);
      }
    }
    return false;
  }

  
  pesquisaRapidaChange(event){
    if(this.alterado == true){
      this.efetuarPesquisaRapida();
    }
  }

  pesquisaRapida_keydown_enter($value){
    this.alterado = false;
    this.efetuarPesquisaRapida();
  }

  private efetuarPesquisaRapida(){
    if(this.apiService && this.pesquisaRapidaApiNomeMetodo){

      if(this.pesquisaRapidaApiNomeMetodo == this.apiNomeMetodoListar){
        this.efetuarPesquisaRapida_paginada()
      }else{
        this.efetuarPesquisaRapida_porId()
      }
    }
  }

  validate({ value }: FormControl) {
    return !this.resultadoPesquisaValido && {
      invalid: true
    }
  }

  private resultadoPesquisaValido = true;
  private efetuarPesquisaRapida_porId(){
    if(this.apiService && this.pesquisaRapidaApiNomeMetodo){
      if(this.pesquisaRapidaText == null || this.pesquisaRapidaText == ''){
        //Limpa a seleção
        this.resultadoPesquisaValido = true;
        this.model[this.modelPropriedadeDescricao] = '';
        this.model[this.modelPropriedadeValor] = this.pesquisaRapidaText;
        
        this.onTouched();
        this._onChange(this.model);
        this.valorAlterado.emit(this.model);
      }else
      this.apiService[this.pesquisaRapidaApiNomeMetodo](this.pesquisaRapidaText).then(
        sucesso => {
          this.model = {};
          
          if(sucesso){
            this.model[this.modelPropriedadeDescricao] = sucesso[this.apiFieldExibir];
            this.model[this.modelPropriedadeValor] = sucesso[this.apiFieldKey];
            this.model.objetoSelecionado = sucesso;
            //this.pesquisaRapidaPlaceholder = this.model[this.modelPropriedadeValor];
            //this.pesquisaRapidaText = '';
            this.resultadoPesquisaValido = true;
            this.onTouched();
            this._onChange(this.model);
            this.valorAlterado.emit(sucesso);
            
          }else{
            this.resultadoPesquisaValido = false;
            
            this.model[this.modelPropriedadeDescricao] = this.msgValorNaoLocalizado.nativeElement.innerText;
            this.model[this.modelPropriedadeValor] = this.pesquisaRapidaText;
            
            this.onTouched();
            this._onChange(this.model);
            this.valorAlterado.emit(this.model);
          }
          
        },
        erro => {
          this.resultadoPesquisaValido = false;

          var apiErro: ApiErrorCollection = erro;
          //this.pesquisaRapidaPlaceholder = 'erro';
          //this.pesquisaRapidaText = 'erro';
          this.model[this.modelPropriedadeDescricao] = apiErro.mensagem_geral;
          this.model[this.modelPropriedadeValor] = this.pesquisaRapidaText;
          
          this.onTouched();
          this._onChange(this.model);
          this.valorAlterado.emit(this.model);
        }
      );
    }
  }

  /**
   * Considera que está usando um filtro de API paginado
   * listando apenas a pagina 1 com 1 resultado somente
   */
  private efetuarPesquisaRapida_paginada(){
    if(this.apiService && this.apiNomeMetodoListar){
      var filtro: string;// = `${this.pesquisaFieldWhere}~${this.pesquisaOperator}~${this.pesquisaRapidaText}`;
      var filterDesc: CompositeFilterDescriptor = {
        logic: 'and',
        filters: [{
          field: this.pesquisaFieldWhere,
          operator: this.pesquisaOperator,
          value: this.pesquisaRapidaText
        }]
      };
      
      filtro = GridFilterTranspiller.toString(filterDesc, this.getColunasGrid());
      
      this.apiService[this.apiNomeMetodoListar](1, 1, filtro).then(
        sucesso => {
          this.model = {};
          
          if(sucesso.length > 0){
            this.model[this.modelPropriedadeDescricao] = sucesso[0][this.apiFieldExibir];
            this.model[this.modelPropriedadeValor] = sucesso[0][this.apiFieldKey];
            this.model.objetoSelecionado = sucesso[0];

            
            this.onTouched();
            this._onChange(this.model);
            this.valorAlterado.emit(sucesso[0]);
          }else{
            
            this.model[this.modelPropriedadeDescricao] = null;
            this.model[this.modelPropriedadeValor] = 0;

            //Informo ao grid que o filtro mudou
            if(this.pesquisaGridFiltro){
              this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, null);
            }

            //Informo a algum componente dependente 
            if(this.childComponent){
              this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, null);
            }

            this.onTouched();
            this._onChange(null);
            this.valorAlterado.emit(null);
          }
          
        },
        erro => {
          var apiErro: ApiErrorCollection = erro;
          
          //this.pesquisaRapidaPlaceholder = 'erro';
          this.pesquisaRapidaText = 'erro';
          this.model[this.modelPropriedadeDescricao] = apiErro.mensagem_geral;
        }
      );
    }
  }

}
