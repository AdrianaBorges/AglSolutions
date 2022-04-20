import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelCanalVenda } from '../models/model-canal-venda';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable({
  providedIn: 'root'
})
export class ApiCanalVendaService {

  private url: string = 'corp/api/CanalVenda';
  private orderByColumnName: string = 'chCodCanalVenda';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodCanalVenda';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCanalVenda): Promise<ModelCanalVenda> {
    return new Promise<ModelCanalVenda>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCanalVenda>(this.url, objeto, true)
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

  public alterar(objeto: ModelCanalVenda): Promise<ModelCanalVenda> {
    return new Promise<ModelCanalVenda>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCanalVenda>(this.url, objeto, true)
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

  public obter(id: string): Promise<ModelCanalVenda> {
    return new Promise<ModelCanalVenda>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelCanalVenda>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCanalVenda>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCanalVenda>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCanalVenda>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-canal-venda.service.ts');
                                                          /* coluna: string   , nomeCampo: string, propriedade: string, formatoColuna           , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCanalVenda'), 'chCodCanalVenda', 'chCodCanalVenda'  , enum_formatoColuna.texto, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')    , 'chDescricao'    , 'chDescricao'      , enum_formatoColuna.texto, true      , false , false      , 500));
    return colunas;
  }

}
