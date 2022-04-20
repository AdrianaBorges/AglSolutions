import { Directive, ElementRef, Input, forwardRef, HostListener} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GridPesquisaComponent } from './grid-pesquisa.component'

@Directive({
  selector: '[appGridFiltroExterno]',
  host: {
    "(input)": 'onInputChange($event)',
    '(ngModelChange)' : 'onModelChange($event)',
    "(valueChange)": 'kendoValueChange($event)',
    "(valorAlterado)": 'valorAlterado_input_modal_pesquisa($valor)',
  },
})
export class GridFiltroExternoDirective {

  private kendoValueChange_fired: boolean = false;
  private htmlElement: ElementRef;
//implements OnChanges 
  constructor(private el: ElementRef) {
    this.htmlElement = el;
  }

  @Input() field: string;
  /**
   * The supported operators are:
   *  "eq" (equal to)
   *  "neq" (not equal to)
   *  "isnull" (is equal to null)
   *  "isnotnull" (is not equal to null)
   *  "lt" (less than)
   *  "lte" (less than or equal to)
   *  "gt" (greater than)
   *  "gte" (greater than or equal to)
   * 
   * The following operators are supported for string fields only:
   *  "startswith"
   *  "endswith"
   *  "contains"
   *  "doesnotcontain"
   *  "isempty"
   *  "isnotempty"
   * 
   * Fonte: 
   * https://www.telerik.com/kendo-angular-ui/components/dataquery/api/FilterDescriptor/
   */
  @Input() operator: 'eq' | 'neq' | 'isnull' | 'isnotnull' | 'lt' | 'lte' | 'gt' | 'gte' | 'startswith' | 'endswith' | 'contains' | 'doesnotcontain' | 'isempty' | 'isnotempty';
  @Input('appGridFiltroExterno') gridPesquisa: GridPesquisaComponent;

  onModelChange($value){
    //console.log('Valor recebido do formGroup = ', $value);
    this.gridPesquisa.filtroAlterado(this.field, this.operator, $value);
  }

  onInputChange(event){
    //console.log('Dados alterados 1: ', event.srcElement['value']);
    
    //this._onChange(event.srcElement['value']);
    if (this.kendoValueChange_fired == false){
      //Executa para os elementos MaskedTextInput/ Input/ 
      //console.log('srcElement = ', event.srcElement['value']);

      var valor: any = event.srcElement['value'];
      this.gridPesquisa.filtroAlterado(this.field, this.operator, valor);
    }
  }

  valorAlterado_input_modal_pesquisa($valor){
    //console.log('Dados alterados 2: ', $valor);
    
    this.gridPesquisa.filtroAlterado(this.field, this.operator, $valor);
  }

  kendoValueChange(event){
    //console.log('Dados alterados 3: ', event);
    
    //Só entrega os dados anteriores, não os dados atuais
    this.kendoValueChange_fired = true;

    //no kendo-switch o event é o próprio valor
    if(typeof(event) === 'boolean' || 
       typeof(event) === 'number' || 
       typeof(event) === 'string' || 
       typeof(event) === typeof(new Date)){

        // if(typeof(event) === typeof(new Date) && event){
        //   var dtFim: Date
        //   if((this.operator == 'gte' || this.operator == 'gt')){
        //     var dt: Date = event;
        //     //var dtFim: string = `${dt.getFullYear()}-${dt.getDate().toString().padStart(2, "0")}-${(dt.getMonth() + 1).toString().padStart(2, "0")}`;
        //     dtFim = new Date(dt.getFullYear(), (dt.getMonth() + 1), dt.getDate(), 0, 0,0);
        //     event = dtFim;
        //     console.log('Data INÍCIO alterada no filtro externo = ', event);
        //   } else
        //   //Se o filtro for de data para os operadores "Less then" ou "Less then or equal to"
        //   //, então adiciona o horário final como "23:59:59"
        //   if((this.operator == 'lte' || this.operator == 'lt')){
        //     var dt: Date = event;
        //     //var dtFim: string = `${dt.getFullYear()}-${dt.getDate().toString().padStart(2, "0")}-${(dt.getMonth() + 1).toString().padStart(2, "0")} 23:59:59`;
        //     dtFim = new Date(dt.getFullYear(), (dt.getMonth() + 1), dt.getDate(), 23, 59,59);
        //     event = dtFim;
        //     console.log('Data FIM alterada no filtro externo = ', event);
        //   }
        // }

        this.gridPesquisa.filtroAlterado(this.field, this.operator, event);
        
    }else if(event == ''|| event == undefined || event == null ){
      this.gridPesquisa.filtroAlterado(this.field, this.operator, null);
    }
       
  }

}
