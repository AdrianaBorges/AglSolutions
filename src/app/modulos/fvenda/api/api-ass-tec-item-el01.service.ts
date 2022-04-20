import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelAssTecItemEL01 } from '../models/model-ass-tec-item-EL01';

@Injectable()
export class ApiAssTecItemEL01Service {

  private url: string = 'fvenda/api/AssTecItemEL01';
  private orderByColumnName: string = 'IDAssTecItem';
  private sortType: string = 'asc';

  public IDAssTecnica: number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDAssTecItem';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelAssTecItemEL01): Promise<ModelAssTecItemEL01> {
    return new Promise<ModelAssTecItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelAssTecItemEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelAssTecItemEL01): Promise<ModelAssTecItemEL01> {
    return new Promise<ModelAssTecItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelAssTecItemEL01>(this.url, objeto, true)
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

  public cancelar(model: ModelAssTecItemEL01): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/cancelar/${model.IDAssTecItem}`;

        this.apiGatewayService.put<boolean>(url, model, true)
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


  public atender(model: ModelAssTecItemEL01): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/Atender/${model.IDAssTecItem}`;

        this.apiGatewayService.put<boolean>(url, model, true)
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

  public obter(id: number): Promise<ModelAssTecItemEL01> {
    return new Promise<ModelAssTecItemEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelAssTecItemEL01>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelAssTecItemEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (this.IDAssTecnica != 0 && this.IDAssTecnica != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `AssTecItem.IDAssTecnica~eq~${this.IDAssTecnica}`;
    } else {
      console.error('O IDAssTecnica deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelAssTecItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelAssTecItemEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ass-tec-item.service.ts');
                                                          /* coluna: string          , nomeCampo: string                 , propriedade: string    , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecItem')          , 'AssTecItem.IDAssTecItem'         , 'IDAssTecItem'         , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItem')                , 'AssTecItem.IDItem'               , 'IDItem'               , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')             , 'Item.chCodItem'                  , 'chCodItem'            , enum_formatoColuna.texto             , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesItem')             , 'Item.chDescricao'                , 'chDesItem'            , enum_formatoColuna.texto             , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUMItem')           , 'Item.chCodUM'                    , 'chCodUMItem'          , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesLoteSerie')        , 'chDesLoteSerie'                  , 'chDesLoteSerie'       , enum_formatoColuna.texto             , false     , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSerieItem')        , 'AssTecItem.chNumSerieItem'       , 'chNumSerieItem'       , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesComplem')          , 'AssTecItem.chDesComplem'         , 'chDesComplem'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdItem')             , 'AssTecItem.deQtdItem'            , 'deQtdItem'            , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSolucAssTec')      , 'SolucAssTec.chDescricao'         , 'chDesSolucAssTec'     , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSolucao')          , 'AssTecItem.chDesSolucao'         , 'chDesSolucao'         , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesMotivoCanc')       , 'AssTecItem.chDesMotivoCanc'      , 'chDesMotivoCanc'      , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSerieNFSaida')     , 'AssTecItem.chCodSerieNFSaida'    , 'chCodSerieNFSaida'    , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumNFSaida')          , 'AssTecItem.chNumNFSaida'         , 'chNumNFSaida'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatEmisNFSaida')      , 'AssTecItem.daDatEmisNFSaida'     , 'daDatEmisNFSaida'     , enum_formatoColuna.data              , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdAtend')            , 'AssTecItem.deQtdAtend'           , 'deQtdAtend'           , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')         , 'AssTecItem.dtDatInclusao'        , 'dtDatInclusao'        , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioInclusao')  , 'AssTecItem.chCodUsuarioInclusao' , 'chCodUsuarioInclusao' , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')     , 'AssTecItem.dtDatUltAlteracao'    , 'dtDatUltAlteracao'    , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioAlteracao') , 'AssTecItem.chCodUsuarioAlteracao', 'chCodUsuarioAlteracao', enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatEncerram')         , 'AssTecItem.dtDatEncerram'        , 'dtDatEncerram'        , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioEncerram')  , 'AssTecItem.chCodUsuarioEncerram' , 'chCodUsuarioEncerram' , enum_formatoColuna.texto             , true      , true));

    return colunas;
  }
}
