import { ModelTipoPapel } from './../models/model-tipo-papel';
import { Injectable } from '@angular/core';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiTipoPapelService {
  private url: string = 'corp/api/TipoPapel';
  private orderByColumnName: string = 'inCodTipoPapel';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inCodTipoPapel';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoPapel): Promise<ModelTipoPapel> {
    return new Promise<ModelTipoPapel>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTipoPapel>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoPapel): Promise<ModelTipoPapel> {
    return new Promise<ModelTipoPapel>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTipoPapel>(this.url, objeto, true)
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

  public excluir(id: number): Promise<boolean> {
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoPapel>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoPapel>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTipoPapel>>(url, true)
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

  public listarCorretor(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoPapel>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }
    
    filter += "inCodTipoPapel~in~(" + [8, 12, 13, 14].join(',') + ")";

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoPapel>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTipoPapel>>(url, true)
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

  public obter(id: number): Promise<ModelTipoPapel> {
    return new Promise<ModelTipoPapel>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoPapel>(url, true)
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
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-tipo-papel.service.ts');
    /* coluna: string                       , nomeCampo: string, propriedade: string, formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPapel'), 'inCodTipoPapel', 'inCodTipoPapel', enum_formatoColuna.numero, true, false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPapel'), 'chDesTipoPapel', 'chDesTipoPapel', enum_formatoColuna.texto, true, false, false, 500));

    return colunas;
  }
}