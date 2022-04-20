import { ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';
import { GridFilterTranspiller } from '../camada-logica/KendoUi/GridFilterTranspiller';
import { GridPesquisaColumn } from '../camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { FormControl } from '../../../../node_modules/@angular/forms';

/**
 * Gerencia a alteração de filtros alimentados por componentes externos ao grid
 * para criar uma condição adicional ao filtro gerado pelo próprio Grid
 */
export class FiltroExternoManager{

    /**
    * Filtro alimentado por componentes externos ao grid pela função filtroAlterado
    */
    private filtrosExternos: CompositeFilterDescriptor;

    constructor(){

        //Inicializo o objeto de filtros
        // this.filtrosExternos = {
        //     logic: 'and',
        //     filters: []
        // };
        this.clearFiltrosExternos();

    }

    // public getFiltrosExternosData(): CompositeFilterDescriptor{
    //     return this.filtrosExternos;
    // }

    // public setFiltrosExternos(filtros: CompositeFilterDescriptor){
    //     this.filtrosExternos = filtros;
    // }

    private clearFiltrosExternos(){
        //Inicializo o objeto de filtros
        this.filtrosExternos = {
            logic: 'and',
            filters: []
        };
    }

    /**
     * Remove da coleção de filtros o filtro relacionado a essa propriedade
     * @param field Nome da propriedade do objeto que é usada fo FilterDescriptor do Grid 
     */
    private removerFiltro(field: string){
        var index: number = this.filtrosExternos.filters.length -1

        //Removo da coleção o filtro
        var novoArray: any;
        this.filtrosExternos.filters = this.filtrosExternos.filters.filter((filtro: FilterDescriptor) => {
            return filtro.field != field
        })
    }

    /**
     * 
     * @param field Nome da propriedade do objeto que é usada fo FilterDescriptor do Grid 
     * @param valor Valor informado pelo usuário a ser usado no filtro
     */
    private atualisarFiltro(field: string, operator: string, valor: any){
        var objeto: any;
        var filterDescriptor: FilterDescriptor;
        objeto = this.filtrosExternos.filters.find((element, index, array)=>{
            filterDescriptor = <FilterDescriptor>element;
            if(filterDescriptor.field == field && filterDescriptor.operator == operator){
                filterDescriptor.value = valor;
                return <any>filterDescriptor;
            }
            return null;
        });

        //Caso o filtro já não existisse então adiciono ele
        if (objeto == null){
            filterDescriptor = {
                field: field,
                value: valor,
                operator: operator
            };
            this.filtrosExternos.filters.push(filterDescriptor);
        }
    }

    /**
    * Altera o valor de um filtro externo
    */
    public filtroAlterado(field: string, operator: string, valor: any){
        if(valor){
            this.atualisarFiltro(field,operator,valor);
        }else{
            this.removerFiltro(field);
        }
    }

    /**
     * Retorna a condição de where
     * @param colunasGrid Colunas que representam os dados do banco para substituir 
     * o nome da propriedade(field) pelo nome que deverá ser usado na condição de where
     */
    public getFiltrosAsString(colunasGrid: GridPesquisaColumn[]): string{
        if (this.filtrosExternos.filters.length ==0 ){
            return '';
        }else{
            return GridFilterTranspiller.toString(this.filtrosExternos, colunasGrid);
        }
    }

}