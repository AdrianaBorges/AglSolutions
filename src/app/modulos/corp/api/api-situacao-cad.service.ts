import { Injectable } from '@angular/core';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelSituacaoCad } from '../models/model-situacao-cad';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiSituacaoCadService implements InterfaceColunasGrid {
  
  private url: string = 'corp/api/SituacaoCad';
  private orderByColumnName: string = 'inCodSituacaoCad';
  private sortType: string = 'asc';
  
  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
    ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodSituacaoCad';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSituacaoCad): Promise<ModelSituacaoCad>{
    return new Promise<ModelSituacaoCad>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelSituacaoCad>(this.url, objeto, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public alterar(objeto: ModelSituacaoCad): Promise<ModelSituacaoCad>{
    return new Promise<ModelSituacaoCad>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelSituacaoCad>(this.url, objeto, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public excluir(id: number): Promise<boolean>{
    return new Promise<boolean>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.delete<boolean>(url, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public obter(id: number): Promise<ModelSituacaoCad>{
    return new Promise<ModelSituacaoCad>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSituacaoCad>(url, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSituacaoCad>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelSituacaoCad>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelSituacaoCad>>(url, true)
        .then(
          (lista_objetos) => {
            resolve(lista_objetos);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
    
  }    
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn>{

    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-situacao-cad.service.ts');
                                     /* coluna: string                         , nomeCampo: string , propriedade: string, formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad'), 'inCodSituacaoCad', 'inCodSituacaoCad' , enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')     , 'chDescricao'     , 'chDescricao'      , enum_formatoColuna.texto , true      , false , false      , 500));  
    
    return colunas;
  }
}