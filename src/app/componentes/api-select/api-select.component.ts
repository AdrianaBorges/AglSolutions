import {
  Component, OnInit, ViewChild,
  Input, Output, EventEmitter, ElementRef ,Injector ,AfterViewInit,
  ContentChildren, QueryList,
  forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
  NgControl,
  //RequiredValidator
} from '@angular/forms';
import { GridPesquisaComponent } from '../grid-pesquisa/grid-pesquisa.component';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { InterfaceFiltroInterdependente} from '../interfaces/interface-filtro-interdependente';

//Kendo
import { ComboBoxColumnComponent } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-api-select',
  templateUrl: './api-select.component.html',
  styleUrls: ['./api-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApiSelectComponent),
      multi: true
    }
  ]
  //,host: { '[attr.required]': 'required ? "" : null' }
})
export class ApiSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor, InterfaceFiltroInterdependente {

  @ContentChildren(ComboBoxColumnComponent) listaColunas: QueryList<ComboBoxColumnComponent>;

  @ViewChild('formControlSelect') formControlSelect: FormControl;
  @ViewChild('traducao_carregando', { static: true }) traducao_carregando: ElementRef;
  //current form control input. helpful in validating and accessing form control
  public control: FormControl;

  @Input() placeholder: string;

  @Input() apiService: any;
  @Input() apiNomeMetodoListar: string;//Nome do método de listar da API
  @Input() apiFieldExibir: string;
  @Input() apiFieldKey: string;//field do qual o valor será recuperado da listagem da api para ser usado no modelo de dados ou no filtro
  @Input() apiFiltroPadrao: string; //campo com filtro padrão a ser passado pro método listar

  //INPUTS ESPECÍFICOS PARA PESQUISA
  //
  //Atributos que serão usados pela diretiva "grid-filtro-externo.directive"
  //O "field" é importante para que apenas o valor seja passado como valor do evento de alteração quando escolhido um novo valor
  //O "operator" só está aqui para reforçar que deve existir para ser usado pela diretiva "grid-filtro-externo.directive"
  @Input() pesquisaFieldWhere: string;//field que será usado na condição where pela UI que estiver consumindo esse componente
  @Input() pesquisaOperator: string;
  @Input() pesquisaGridFiltro: GridPesquisaComponent;

  //INPUTS PARA MANIPULAÇÃO DE DADOS DE UM OBJETO
  public id_selecionado: number|string = '0';

  //INPUTS DO FORM CONTROL - inicio
  @Input() disabled = false;
  //INPUTS DO FORM CONTROL - fim

  //Retorna nesse evento o objeto selecionado no select
  @Output() valorAlterado: EventEmitter<any> = new EventEmitter<any>();

  @Input() childComponent: InterfaceFiltroInterdependente;
  @Input() childComponentFieldWhere: string;
  @Input() isChildComponent: boolean;

  @Input() carregarIniciando: boolean = true;

  public listagem: Array<any>;
  public data: Array<any>;
  public itemSelecionado: any = null;
  public erros: ApiErrorCollection;

  /** Filtro externo que deve ser aplicado sobre apesquisa desse componente */
  private filtro_extra: string = '';

  constructor(private injector: Injector) {
    //Inicializo a variável de erro
    this.erros = new ApiErrorCollection();
   }

  ngOnInit() {
    this.placeholder = this.placeholder || 'selecione';
    this.pesquisaOperator = this.pesquisaOperator || 'eq';
    if(this.isChildComponent != true){
      //só exibe dados ao inicializar se não for um childComponent, pq nesse caso ele só exibirá dados após a seleção de um outro
      
      if (this.carregarIniciando){
        //Só exibe se estiver marcado para carregar ao iniciar (comportamento padrão)
        this.aplicarFiltroPadrao();
        this.exibirDados();
      }
    }

  }

  // The form control is only set after initialization
  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      } else {
        // Component is missing form control binding
      }
    });
  }

  public formControlTemErro(): boolean{
    if(this.control){
      return this.control.hasError('required');
    }else{
      return false;
    }
  }

  private exibirDados(){
    this.data = [];
    var aguarde = {};
    var desabilitar = false;

    //crio uma opção temporária marcada para exibir o texto "carregando"
    aguarde[this.apiFieldExibir] = this.traducao_carregando.nativeElement.innerText;
    aguarde[this.apiFieldKey] = 0;
    this.data.push(aguarde);
    this.id_selecionado = 0;

    if(this.apiService){
      this.apiService[this.apiNomeMetodoListar](1, 1000, this.filtro_extra).then(
        dados => {
          //Zero a variável de erros da API
          this.erros = new ApiErrorCollection();

          this.listagem = dados;
          this.data = dados;
        },
        error => {
          this.erros = error;
        }
      );
    }
  }

  private aplicarFiltroPadrao(){
    if(this.apiFiltroPadrao){
      if(this.filtro_extra.length > 0){
        this.filtro_extra.concat('~and~');
      }
      this.filtro_extra = this.apiFiltroPadrao;
    }
  }

  /**
   * Inclui para a condição dessa pesquisa um filtro externo
   */
  public filtroAlterado(field: string, operator: string, valor: any){
    this.isChildComponent = true;
    if(valor != null){
      this.filtro_extra = `${field}~${operator}~${valor}`;
    }else {
      this.filtro_extra = '';
    }

    this.aplicarFiltroPadrao()
    
    this.id_selecionado = null;
    //Informo ao grid que o filtro mudou
    this.informarGridFiltroAlterado(null);

    if(this.childComponent){
      this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, null);
    }

    if(valor == null){
      this.data = [];
    }else{
      this.exibirDados();
    }
  }

  private informarGridFiltroAlterado(dataSelected: any){
    //Informo ao grid que o filtro mudou
    if(this.pesquisaGridFiltro){
      if(dataSelected){
        this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, dataSelected);
      }else{
        this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, null);
      }
    }
  }

  onChange(dataSelected){

    this.onTouched();

    //Informo ao grid que o filtro mudou
    this.informarGridFiltroAlterado(dataSelected);

    if(this.childComponent){
      if(dataSelected){
        this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, dataSelected);
      }else{
        this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, null);
      }
    }

    //Emito o aviso de que o valor foi alterado
    if(this.valorAlterado){
      this.valorAlterado.emit(dataSelected);
      this.data = this.listagem;
    }

    if(this._onChange){
      var valor = dataSelected + '';
      if(valor.length > 0){
        this._onChange(dataSelected);
      }else{
        this._onChange(null);
      }

    }

  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  /**
   * Implements ControlValueAccessor.writeValue
   * @param object
   */
  writeValue(valor: string|number): void {
    this.id_selecionado = valor || 0;

    //Informo ao grid que o filtro mudou
    if(this.pesquisaGridFiltro){
      if(valor){
        this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, valor);
      }else{
        this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, null);
      }
    }

    //Informo a algum componente dependente de filtro que o filtro mudou
    if(this.childComponent){
      if(valor){
        this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, valor);
      }else{
        this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, null);
      }
    }
  }

  _onChange = (objeto_selecionado: any) => {};

  /**
   * Implements ControlValueAccessor.registerOnChange
   * @param fn
   */
  registerOnChange(fn: (objeto_selecionado: any) => void): void {
    // Allows Angular to register a function to call when the selection changes.
    // Save the function as a property to call later here.
    this._onChange = fn;
  }

  // Function to call when the grid is selected is touched (when a star is clicked).
  onTouched = () => {}

  /**
   * Implements ControlValueAccessor.registerOnTouched
   * @param fn
   */
  registerOnTouched(fn: () => void): void {
    // Allows Angular to register a function to call when the input has been touched.
    // Save the function as a property to call later here.
    this.onTouched = fn;
  }

  /**
   * Implements ControlValueAccessor.setDisabledState
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    // Allows Angular to disable the input.
    this.disabled = isDisabled;
  }

  chaveEstrangeiraInformada(): boolean{
    return (this.id_selecionado > 0 || ( (this.id_selecionado + '').length > 0 && typeof this.id_selecionado == 'string' ));
  }

  handleFilter(value) {
    if(this.listagem){
      if(this.listaColunas.length == 0){
        //Filtro sem uso de colunas
        this.data = this.listagem.filter((s, index) => {
          return s[this.apiFieldExibir].toLowerCase().indexOf(value.toLowerCase()) !== -1
        });
      }else{
        //Filtro com uso das colunas
        this.data = this.listagem.filter((s, index) => {
          for (let indexColuna = 0; indexColuna < this.listaColunas.length; indexColuna++) {
            const coluna = this.listaColunas.get(indexColuna);
            if(coluna)
            if((s[coluna.field] + '').toLowerCase().indexOf(value.toLowerCase()) !== -1){
              return true;
            }
          }
          return false;
        });
      }

    }else{
      this.data = [];
    }

  }

}
