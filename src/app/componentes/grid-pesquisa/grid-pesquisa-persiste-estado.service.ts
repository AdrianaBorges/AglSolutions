import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { ValueTemplateDirective } from '../../../../node_modules/@progress/kendo-angular-dropdowns';
import { GridComponent} from '@progress/kendo-angular-grid';

export interface FiltroPersistido{
  idGrid: string,
  paginaAtual: number,
  filtros: CompositeFilterDescriptor,
  formGroupPesquisaData: any
}

@Injectable()
export class GridPesquisaPersisteEstadoService {

  

  public listaFiltros: Array<FiltroPersistido> = [];


  constructor(private route: Router) { }

  public adicionar(idGrid: string, paginaAtual: number, filtros: CompositeFilterDescriptor, formGroupPesquisaData: any){

    if(idGrid == ''|| idGrid == null || idGrid == undefined){
      idGrid = this.route.url;
    }

    var FiltroPersistido = this.listaFiltros.find((value: FiltroPersistido)=>{
      return value.idGrid == idGrid;
    });
    
    if(FiltroPersistido == undefined){

      //console.log('Adcionando o filtro do grid');
      
      let filtroPer =  {
        idGrid: idGrid,
        paginaAtual: paginaAtual, 
        filtros: filtros,
        formGroupPesquisaData: formGroupPesquisaData
      }

      this.listaFiltros.push(filtroPer);
    }else{
      
      FiltroPersistido.paginaAtual = paginaAtual;
      FiltroPersistido.filtros = filtros;
      FiltroPersistido.formGroupPesquisaData =  formGroupPesquisaData;

      FiltroPersistido = this.listaFiltros.find((value: FiltroPersistido)=>{
        return value.idGrid == idGrid;
      });
    }
  }

  public getCompositeFilterDescriptor(idGrid: string): FiltroPersistido{

    if(idGrid == ''|| idGrid == null || idGrid == undefined){
      idGrid = this.route.url;
    }

    var FiltroPersistido = this.listaFiltros.find((value: FiltroPersistido)=>{
      return value.idGrid == idGrid;
    });
    
    return FiltroPersistido;
    
  }

}
