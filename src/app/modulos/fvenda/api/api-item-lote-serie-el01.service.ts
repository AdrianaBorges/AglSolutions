import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelItemLoteSerieEl01 } from '../models/model-item-lote-serie-el01';


@Injectable()
export class ApiItemLoteSerieEl01Service {

  private url: string = 'fvenda/api/ItemLoteSerieEL01';
  private orderByColumnName: string = 'chCodItem';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodItem';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelItemLoteSerieEl01): Promise<ModelItemLoteSerieEl01> {
    return new Promise<ModelItemLoteSerieEl01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelItemLoteSerieEl01>(this.url, objeto, true)
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

  public alterar(objeto: ModelItemLoteSerieEl01): Promise<ModelItemLoteSerieEl01> {
    return new Promise<ModelItemLoteSerieEl01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelItemLoteSerieEl01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelItemLoteSerieEl01> {
    return new Promise<ModelItemLoteSerieEl01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelItemLoteSerieEl01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelItemLoteSerieEl01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelItemLoteSerieEl01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemLoteSerieEl01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-item-lote-serie-el01.service.ts');
                                                          /* coluna: string          , nomeCampo: string                     , propriedade: string       , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItemLoteSerie')       , 'ItemLoteSerie.IDItemLoteSerie'       , 'IDItemLoteSerie'         , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItem')                , 'ItemLoteSerie.IDItem'                , 'IDItem'                  , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')             , 'Item.chCodItem'                      , 'chCodItem'               , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesItem')             , 'Item.chDescricao'                    , 'chDesItem'               , enum_formatoColuna.texto             , true      , false , false      , 350));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDFornecedor')          , 'ItemLoteSerie.IDFornecedor'          , 'IDFornecedor'            , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodModelo')           , 'ItemLoteSerie.chCodModelo'           , 'chCodModelo'             , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSerie')            , 'ItemLoteSerie.chNumSerie'            , 'chNumSerie'              , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumLote')             , 'ItemLoteSerie.chNumLote'             , 'chNumLote'               , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesLoteSerie')        , 'chDesLoteSerie'                      , 'chDesLoteSerie'          , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFabricacao')       , 'ItemLoteSerie.daDatFabricacao'       , 'daDatFabricacao'         , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatValidade')         , 'ItemLoteSerie.daDatValidade'         , 'daDatValidade'           , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdEntrada')          , 'ItemLoteSerie.deQtdEntrada'          , 'deQtdEntrada'            , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdSaldoIniAssTec')   , 'ItemLoteSerie.deQtdSaldoIniAssTec'   , 'deQtdSaldoIniAssTec'     , enum_formatoColuna.numero            , true      , true));

    return colunas;
  }
}
