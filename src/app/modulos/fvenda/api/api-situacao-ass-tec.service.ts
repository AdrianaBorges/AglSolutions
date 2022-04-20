import { Injectable } from '@angular/core';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ModelSituacaoAssTec } from '../models/model-situacao-ass-tec';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable()
export class ApiSituacaoAssTecService {

  private url: string = 'fvenda/api/SituacaoAssTec';
  private orderByColumnName: string = 'inCodSituacaoAssTec';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inCodSituacaoAssTec';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSituacaoAssTec): Promise<ModelSituacaoAssTec> {
    return new Promise<ModelSituacaoAssTec>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSituacaoAssTec>(this.url, objeto, true)
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

  public alterar(objeto: ModelSituacaoAssTec): Promise<ModelSituacaoAssTec> {
    return new Promise<ModelSituacaoAssTec>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSituacaoAssTec>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelSituacaoAssTec> {
    return new Promise<ModelSituacaoAssTec>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSituacaoAssTec>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSituacaoAssTec>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSituacaoAssTec>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSituacaoAssTec>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-situacao-ass-tec.service.ts');
                                                          /* coluna: string       , nomeCampo: string    , propriedade: string  , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoAssTec'), 'inCodSituacaoAssTec', 'inCodSituacaoAssTec', enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')        , 'chDescricao'        , 'chDescricao'        , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}
