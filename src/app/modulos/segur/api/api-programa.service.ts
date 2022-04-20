import { Injectable } from '@angular/core';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelPrograma } from '../models/model-programa';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable()
export class ApiProgramaService {

  private url: string = 'segur/api/Programa';
  private orderByColumnName: string = 'chCodPrograma';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodPrograma';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPrograma): Promise<ModelPrograma> {
    return new Promise<ModelPrograma>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPrograma>(this.url, objeto, true)
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

  public alterar(objeto: ModelPrograma): Promise<ModelPrograma> {
    return new Promise<ModelPrograma>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPrograma>(this.url, objeto, true)
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

  public obter(id: string): Promise<ModelPrograma> {
    return new Promise<ModelPrograma>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPrograma>(url, true)
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
  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPrograma>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPrograma>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPrograma>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-programa.service.ts');
                                     /* coluna: string                         , nomeCampo: string , propriedade: string, formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPrograma')   , 'chCodPrograma'   , 'chCodPrograma'    , enum_formatoColuna.texto   , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTitPrograma'), 'chDesTitPrograma', 'chDesTitPrograma' , enum_formatoColuna.texto   , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao') , 'chDesObservacao' , 'chDesObservacao'  , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesPasta')      , 'chDesPasta'      , 'chDesPasta'       , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgDisponivelMenu'), 'lgDisponivelMenu', 'lgDisponivelMenu' , enum_formatoColuna.booleano, true      , false , false      , 110));
    return colunas;
  }
}
