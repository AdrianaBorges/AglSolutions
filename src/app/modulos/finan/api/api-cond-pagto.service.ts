import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelCondPagto } from '../models/model-cond-pagto';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiCondPagtoService implements InterfaceColunasGrid {  
  private url: string = 'finan/api/CondPagto';
  private orderByColumnName: string = 'chCodCondPagto';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'chCodCondPagto';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCondPagto): Promise<ModelCondPagto> {
    return new Promise<ModelCondPagto>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCondPagto>(this.url, objeto, true)
          .then(
          objeto_retornado => {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
          );
      }
    );
  }

  public alterar(objeto: ModelCondPagto): Promise<ModelCondPagto> {
    return new Promise<ModelCondPagto>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCondPagto>(this.url, objeto, true)
          .then(
          objeto_retornado => {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
          );
      }
    );
  }

  public excluir(id: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.delete<boolean>(url, true)
          .then(
          objeto_retornado => {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
          );
      }
    );
  }

  public pesquisarPorId(id: string): Promise<ModelCondPagto> {
    return new Promise<ModelCondPagto>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCondPagto[]>(url, true)
          .then(
          objeto_retornado => {
            if (objeto_retornado.length > 0) {
              resolve(objeto_retornado[0]);
            } else {
              resolve(null);
            }
          },
          erro => {
            reject(erro);
          }
          );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCondPagto>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCondPagto>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCondPagto>>(url, true)
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
  public getColunasGrid(): GridPesquisaColumn[] {
    var colunas: GridPesquisaColumn[];
    colunas = [];
    var localeFile: LocaleDataFile;
    
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.finan.api.api-cond-pagto.service.ts');
                                     /* coluna: string                       , nomeCampo: string         , propriedade: string, formatoColuna           , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCondPagto'), 'CondPagto.chCodCondPagto', 'chCodCondPagto'   , enum_formatoColuna.texto, true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')   , 'CondPagto.chDescricao'   , 'chDescricao'      , enum_formatoColuna.texto, true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCondicao')    , 'CondPagto.chCondicao'    , 'chCondicao'       , enum_formatoColuna.texto, true      , false , false      , 250));

    return colunas;
  }
}