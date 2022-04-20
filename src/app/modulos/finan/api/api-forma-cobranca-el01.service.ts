import { Injectable } from '@angular/core';

//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

// Model
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ModelFormaCobrancaEL01 } from '../models/model-forma-cobranca-el01';

@Injectable()
export class ApiFormaCobrancaEL01Service implements InterfaceColunasGrid {

  private url: string = 'finan/api/FormaCobrancaEL01';
  private orderByColumnName: string = 'FormaCobranca.chCodFormaCobranca';
  private sortType: string = 'asc';
  public chCodFormaCobranca: string = undefined

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }


  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'FormaCobranca.chCodFormaCobranca';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criarWebhookPixConfPagto(id: string, dados: ModelFormaCobrancaEL01): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelFormaCobrancaEL01>(`${this.url}/CriarWebhookPixConfPagto/${id}/`, dados, true)
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

  public excluirWebhookPixConfPagto(id: string): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelFormaCobrancaEL01>(`${this.url}/ExcluirWebhookPixConfPagto/${id}/`, {}, true)
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

  public criar(objeto: ModelFormaCobrancaEL01): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelFormaCobrancaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelFormaCobrancaEL01): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelFormaCobrancaEL01>(this.url, objeto, true)
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

  public cancelar(id: number, dados: ModelFormaCobrancaEL01): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelFormaCobrancaEL01>(`${this.url}/Cancelar/${id}/`, dados, true)
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

  public pesquisarPorId(id: string): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelFormaCobrancaEL01[]>(url, true)
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

  public obter(id: string): Promise<ModelFormaCobrancaEL01> {
    return new Promise<ModelFormaCobrancaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelFormaCobrancaEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelFormaCobrancaEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelFormaCobrancaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelFormaCobrancaEL01>>(url, true)
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
  public getColunasGrid():  Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];
    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.finan.api.api-forma-cobranca-el01.service.ts');
                                                          /* coluna: string          , nomeCampo: string                     , propriedade: string     , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodFormaCobranca')    , 'FormaCobranca.chCodFormaCobranca'    , 'chCodFormaCobranca'    , enum_formatoColuna.texto             , true      , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesAbreviada')        , 'FormaCobranca.chDesAbreviada'        , 'chDesAbreviada'        , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')           , 'FormaCobranca.chDescricao'           , 'chDescricao'           , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoCobranca')     , 'FormaCobranca.inCodTipoCobranca'     , 'inCodTipoCobranca'     , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoCobranca')     , 'TipoCobranca.chDescricao'            , 'chDesTipoCobranca'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodPortador')         , 'FormaCobranca.inCodPortador'         , 'inCodPortador'         , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevPortador')    , 'Portador.chNomAbreviado'             , 'chNomAbrevPortador'    , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomPortador')         , 'Portador.chNome'                     , 'chNomPortador'         , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chViewImpBoletoLocal')  , 'FormaCobranca.chViewImpBoletoLocal'  , 'chViewImpBoletoLocal'  , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chViewImpBoletoServer') , 'FormaCobranca.chViewImpBoletoServer' , 'chViewImpBoletoServer' , enum_formatoColuna.texto             , false     , true));

    return colunas;
  }
}
