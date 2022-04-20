import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelCondPagtoVenda } from '../models/model-cond-pagto-venda';

@Injectable()
export class ApiCondPagtoVendaService {
  private url: string = 'fvenda/api/CondPagtoVenda';
  private orderByColumnName: string = 'chCodCondPagtoVenda';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodCondPagtoVenda';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCondPagtoVenda): Promise<ModelCondPagtoVenda> {
    return new Promise<ModelCondPagtoVenda>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCondPagtoVenda>(this.url, objeto, true)
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

  public alterar(objeto: ModelCondPagtoVenda): Promise<ModelCondPagtoVenda> {
    return new Promise<ModelCondPagtoVenda>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCondPagtoVenda>(this.url, objeto, true)
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

        let url: string = `${this.url}/${id}/`;

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

  public obter(id: string): Promise<ModelCondPagtoVenda> {
    return new Promise<ModelCondPagtoVenda>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelCondPagtoVenda>(url, true)
          .then(
            objeto_retornado => {
              resolve(objeto_retornado[0]);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCondPagtoVenda>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCondPagtoVenda>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCondPagtoVenda>>(url, true)
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
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-cond-pagto-venda.service.ts');
                                                          /* coluna: string       , nomeCampo: string    , propriedade: string  , formatoColuna           , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCondPagtoVenda'), 'chCodCondPagtoVenda', 'chCodCondPagtoVenda', enum_formatoColuna.texto, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')        , 'chDescricao'        , 'chDescricao'        , enum_formatoColuna.texto, true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCondicao')         , 'chCondicao'         , 'chCondicao'         , enum_formatoColuna.texto, true      , false , false      , 300));

    return colunas;
  }
}