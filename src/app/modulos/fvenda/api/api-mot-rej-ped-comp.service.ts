import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelMotRejPedComp } from '../models/model-mot-rej-ped-comp';

@Injectable()
export class ApiMotRejPedCompService {

  private url: string = 'fvenda/api/MotRejPedComp';
  private orderByColumnName: string = 'inCodMotRejPedComp';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inCodMotRejPedComp';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelMotRejPedComp): Promise<ModelMotRejPedComp> {
    return new Promise<ModelMotRejPedComp>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelMotRejPedComp>(this.url, objeto, true)
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

  public alterar(objeto: ModelMotRejPedComp): Promise<ModelMotRejPedComp> {
    return new Promise<ModelMotRejPedComp>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelMotRejPedComp>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelMotRejPedComp> {
    return new Promise<ModelMotRejPedComp>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelMotRejPedComp>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelMotRejPedComp>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelMotRejPedComp>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelMotRejPedComp>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-mot-rej-ped-comp.service.ts');
                                                          /* coluna: string         ,  nomeCampo: string                      , propriedade: string    , formatoColuna            , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodMotRejPedComp'),    'MotRejPedComp.inCodMotRejPedComp',      'inCodMotRejPedComp',     enum_formatoColuna.numero, true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')       ,    'MotRejPedComp.chDescricao'         ,    'chDescricao'         ,   enum_formatoColuna.texto , true       , false , false      , 500));

    return colunas;
  }
}
