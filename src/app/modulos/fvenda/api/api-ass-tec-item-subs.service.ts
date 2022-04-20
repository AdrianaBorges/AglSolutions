import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelAssTecItemSubs } from '../models/model-ass-tec-item-subs';

@Injectable()
export class ApiAssTecItemSubsService {

  private url: string = 'fvenda/api/AssTecItemSubs';
  private orderByColumnName: string = 'IDAssTecItemSubs';
  private sortType: string = 'asc';

  public IDAssTecItem: number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDAssTecItemSubs';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelAssTecItemSubs): Promise<ModelAssTecItemSubs> {
    return new Promise<ModelAssTecItemSubs>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelAssTecItemSubs>(this.url, objeto, true)
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

  public alterar(objeto: ModelAssTecItemSubs): Promise<ModelAssTecItemSubs> {
    return new Promise<ModelAssTecItemSubs>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelAssTecItemSubs>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelAssTecItemSubs> {
    return new Promise<ModelAssTecItemSubs>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelAssTecItemSubs>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelAssTecItemSubs>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (this.IDAssTecItem != 0 && this.IDAssTecItem != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `AssTecItemSubs.IDAssTecItem~eq~${this.IDAssTecItem}`;
    } else {
      console.error('O IDAssTecItem deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelAssTecItemSubs>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelAssTecItemSubs>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ass-tec-item-subs.service.ts');
                                                          /* coluna: string          , nomeCampo: string                     , propriedade: string      , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecItemSubs')      , 'AssTecItemSubs.IDAssTecItemSubs'     , 'IDAssTecItemSubs'       , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItem')                , 'AssTecItemSubs.IDItem'               , 'IDItem'                 , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')             , 'Item.chCodItem'                      , 'chCodItem'              , enum_formatoColuna.texto             , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesItem')             , 'Item.chDescricao'                    , 'chDesItem'              , enum_formatoColuna.texto             , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUMItem')           , 'Item.chCodUM'                        , 'chCodUMItem'            , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItemLoteSerie')       , 'AssTecItemSubs.IDItemLoteSerie'      , 'IDItemLoteSerie'        , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodModelo')           , 'ItemLoteSerie.chCodModelo'           , 'chCodModelo'            , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSerie')            , 'ItemLoteSerie.chNumSerie'            , 'chNumSerie'             , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumLote')             , 'ItemLoteSerie.chNumLote'             , 'chNumLote'              , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesLoteSerie')        , 'chDesLoteSerie'                      , 'chDesLoteSerie'         , enum_formatoColuna.texto             , false     , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesComplem')          , 'AssTecItemSubs.chDesComplem'         , 'chDesComplem'           , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdSubs')             , 'AssTecItemSubs.deQtdSubs'            , 'deQtdSubs'              , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSolicEstoque')     , 'AssTecItemSubs.chNumSolicEstoque'    , 'chNumSolicEstoque'      , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatSolicEstoque')     , 'AssTecItemSubs.dtDatSolicEstoque'    , 'dtDatSolicEstoque'      , enum_formatoColuna.data              , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatRecebEstoque')     , 'AssTecItemSubs.dtDatRecebEstoque'    , 'dtDatRecebEstoque'      , enum_formatoColuna.data              , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')         , 'AssTecItemSubs.dtDatInclusao'        , 'dtDatInclusao'          , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioInclusao')  , 'AssTecItemSubs.chCodUsuarioInclusao' , 'chCodUsuarioInclusao'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')     , 'AssTecItemSubs.dtDatUltAlteracao'    , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioAlteracao') , 'AssTecItemSubs.chCodUsuarioAlteracao', 'chCodUsuarioAlteracao'  , enum_formatoColuna.texto             , true      , true));

    return colunas;
  }
}
