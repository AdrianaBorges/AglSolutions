import { Component, OnInit, Input, ViewChild, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GridPesquisaComponent } from '../grid-pesquisa/grid-pesquisa.component';
import { ApiErrorCollection } from '../../api-error/api-error-collection';
import { InterfaceFiltroInterdependente} from '../interfaces/interface-filtro-interdependente';

@Component({
  selector: 'app-filtro-multiselect',
  templateUrl: './filtro-multiselect.component.html',
  styleUrls: ['./filtro-multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FiltroMultiselectComponent),
      multi: true
    }
  ]
})
export class FiltroMultiselectComponent implements OnInit, ControlValueAccessor, InterfaceFiltroInterdependente {

  @ViewChild('formControlMultiselect', { static: true }) formControlMultiselect: FormControl;

  //INPUTS DO FORM CONTROL - inicio
  @Input() disabled = false;
  //INPUTS DO FORM CONTROL - fim

  @Input() placeholder: string;

  @Input() apiService: any;
  @Input() apiNomeMetodoListar: string;//Nome do método de listar da API
  @Input() apiFieldExibir: string;
  @Input() apiFieldKey: string;//field do qual o valor será recuperado da listagem da api para ser usado no modelo de dados ou no filtro
  @Input() apiFiltroPadrao: string; //campo com filtro padrão a ser passado pro método listar de forma estática

  //INPUTS ESPECÍFICOS PARA PESQUISA
  //
  //Atributos que serão usados pela diretiva "grid-filtro-externo.directive"
  //O "field" é importante para que apenas o valor seja passado como valor do evento de alteração quando escolhido um novo valor
  //O "operator" só está aqui para reforçar que deve existir para ser usado pela diretiva "grid-filtro-externo.directive"
  @Input() pesquisaFieldWhere: string;//field que será usado na condição where pela UI que estiver consumindo esse componente
  @Input() pesquisaOperator: string;
  @Input() pesquisaGridFiltro: GridPesquisaComponent;

  @Input() childComponent: InterfaceFiltroInterdependente;
  @Input() childComponentFieldWhere: string;
  private isChildComponent: boolean; //identifica que é um componente que reage a seleção de dados de outro componente

  @Input() carregarIniciando: boolean = true;

  public selectedValues: any;
  public listItems: Array<any> = [];
  public filteredItems: Array<any> = [];
  public value: any = [];
  private valueObjects: Array<any> =[];

  /** Filtro externo que deve ser aplicado sobre apesquisa desse componente */
  private filtro_extra: string = '';

  public erros: ApiErrorCollection;

  constructor() {

   }

  ngOnInit() {
    this.placeholder = this.placeholder || 'selecione';
    this.pesquisaOperator = this.pesquisaOperator || 'in';

    if(this.isChildComponent != true){
      //só exibe dados ao inicializar se não for um childComponent, pq nesse caso ele só exibirá dados após a seleção de um outro

      if (this.carregarIniciando){
        //Só exibe se estiver marcado para carregar ao iniciar (comportamento padrão)
        this.aplicarFiltroPadrao();
        this.exibirDados();
      }
      
    }
    
  }

  usarValoresPrimitivos() {
    if(this.pesquisaGridFiltro){
      return false;
    }else{
      return true;
    }
  }

  private exibirDados(){
    if(this.apiService){
      this.apiService[this.apiNomeMetodoListar](1, 1000, this.filtro_extra).then(
        dados => {
          //Zero a variável de erros da API
          this.erros = new ApiErrorCollection();
  
          this.listItems = dados;
          this.filteredItems = dados;
        },
        error => {
          this.erros = error;
        }
      );
    }
    
  }

  public valueChange(value: Array<any>): void {

    if(this._onChange){
      this._onChange(value);
    }
    
    this.notificarFiltroAlterado(value);
  }

  private notificarFiltroAlterado(value: Array<any>){
    let existeValor: boolean = false;
    if(value){
      if(value.length > 0){
        existeValor = true;
      } 
    }
    if(existeValor == true){
      var valores: string = '';
      value.forEach((value: any, index: number) => {
        if(valores.length > 0){valores += ','}
        valores += value[this.apiFieldKey];
      });
      valores = '('+ valores + ')';

      if(this.pesquisaGridFiltro){
        this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, valores);
      }
      if(this.childComponent){
        this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, valores);
      }
    }else{
      if(this.pesquisaGridFiltro){
        this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, null);
      }
      if(this.childComponent){
        this.childComponent.filtroAlterado(this.childComponentFieldWhere, this.pesquisaOperator, null);
      }
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
    this.selectedValues = [];
    this.isChildComponent = true;
    if(valor != null){
      this.filtro_extra = `${field}~${operator}~${valor}`;
    }else {
      this.filtro_extra = '';
    }

    this.aplicarFiltroPadrao();

    if(this.pesquisaGridFiltro){
      this.pesquisaGridFiltro.filtroAlterado(this.pesquisaFieldWhere, this.pesquisaOperator, null);  
    }

    if(valor != null){
      this.exibirDados();
    }else{
      this.listItems = [];
      this.filteredItems = [];
    }
    
  }


  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  /**
   * Implements ControlValueAccessor.writeValue
   * @param object 
   */
  writeValue(value: Array<any>): void {
    this.selectedValues = value;
    this.notificarFiltroAlterado(value);
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

  handleFilter(value) {
    this.filteredItems = this.listItems.filter((s, index) => {
      return s[this.apiFieldExibir].toLowerCase().indexOf(value.toLowerCase()) !== -1
    });
  }

}
