import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelCampanhaEL01 } from '../models/model-campanha-EL01';

@Injectable({
  providedIn: 'root'
})
export class ApiCampanhaEL01Service {

  private url: string = 'fvenda/api/CampanhaEL01';
  private orderByColumnName: string = 'IDCampanha';
  private sortType: string = 'asc';


  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDCampanha';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCampanhaEL01): Promise<ModelCampanhaEL01> {
    return new Promise<ModelCampanhaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCampanhaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelCampanhaEL01): Promise<ModelCampanhaEL01> {
    return new Promise<ModelCampanhaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCampanhaEL01>(this.url, objeto, true)
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

  public liberar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/Liberar/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public suspender(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/Suspender/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public cancelar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/cancelar/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public reativar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/reativar/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public encerrar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/Encerrar/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public obter(id: number): Promise<ModelCampanhaEL01> {
    return new Promise<ModelCampanhaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCampanhaEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCampanhaEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCampanhaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCampanhaEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-campanha-el01.service.ts');
                                                          /* coluna: string          , nomeCampo: string                , propriedade: string     , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCampanha')            , 'Campanha.IDCampanha'            , 'IDCampanha'            , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCampanha')         , 'Campanha.chCodCampanha'         , 'chCodCampanha'         , enum_formatoColuna.texto   , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')           , 'Campanha.chDescricao'           , 'chDescricao'           , enum_formatoColuna.texto   , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInicio')           , 'Campanha.dtDatInicio'           , 'dtDatInicio'           , enum_formatoColuna.dataHora, true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatFim')              , 'Campanha.dtDatFim'              , 'dtDatFim'              , enum_formatoColuna.dataHora, true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoCampanha')     , 'Campanha.inCodTipoCampanha'     , 'inCodTipoCampanha'     , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoCampanha')     , 'TipoCampanha.chDescricao'       , 'chDesTipoCampanha'     , enum_formatoColuna.texto   , false     , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodOrigemVenda')      , 'Campanha.inCodOrigemVenda'      , 'inCodOrigemVenda'      , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesOrigemVenda')      , 'OrigemVenda.chDescricao'        , 'chDesOrigemVenda'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodDestinoVenda')     , 'Campanha.inCodDestinoVenda'     , 'inCodDestinoVenda'     , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesDestinoVenda')     , 'DestinoVenda.chDescricao'       , 'chDesDestinoVenda'     , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodInformaPremio')    , 'Campanha.inCodInformaPremio'    , 'inCodInformaPremio'    , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesInformaPremio')    , 'InformaPremio.chDescricao'      , 'chDesInformaPremio'    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCamp')     , 'Campanha.inCodSituacaoCamp'     , 'inCodSituacaoCamp'     , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCamp')     , 'SituacaoCamp.chDescricao'       , 'chDesSituacaoCamp'     , enum_formatoColuna.texto   , false     , false , false       , 200));

    return colunas;
  }
}

