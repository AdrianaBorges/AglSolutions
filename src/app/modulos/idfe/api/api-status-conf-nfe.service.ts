import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelStatusConfNfe } from '../models/model-status-conf-nfe';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable()
export class ApiStatusConfNfeService implements InterfaceColunasGrid {
  private url: string = 'idfe/api/StatusConfNfe';
  private orderByColumnName: string = 'inCodStatusConfNFe';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodStatusConfNFe';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelStatusConfNfe): Promise<ModelStatusConfNfe>{
    return new Promise<ModelStatusConfNfe>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelStatusConfNfe>(this.url, objeto, true)
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

  public alterar(objeto: ModelStatusConfNfe): Promise<ModelStatusConfNfe>{
    return new Promise<ModelStatusConfNfe>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelStatusConfNfe>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelStatusConfNfe>{
    return new Promise<ModelStatusConfNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelStatusConfNfe>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelStatusConfNfe>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelStatusConfNfe>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelStatusConfNfe>>(url, true)
        .then(
          (lista_objetos) => {
            resolve(lista_objetos.map((value: ModelStatusConfNfe, index: number, array: ModelStatusConfNfe[])=>{
              value.campoCalculado = `${value.inCodStatusConfNFe} - ${value.chDescricao}`;
              return value;
           }));
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.idfe.api.api-status-conf-nfe.service.ts');
                                     /* coluna: string                           , nomeCampo: string   , propriedade: string , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodStatusConfNFe'), 'inCodStatusConfNFe', 'inCodStatusConfNFe', enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')       , 'chDescricao'       , 'chDescricao'       , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}