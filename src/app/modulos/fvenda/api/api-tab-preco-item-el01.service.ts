import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelTabPrecoItemEL01 } from '../models/model-tab-preco-item-EL01';

@Injectable()
export class ApiTabPrecoItemEL01Service {

  private url: string = 'fvenda/api/TabPrecoItemEL01';
  private orderByColumnName: string = 'IDTabPrecoItem';
  private sortType: string = 'asc';
  public IDTabPreco: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDTabPrecoItem';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTabPrecoItemEL01): Promise<ModelTabPrecoItemEL01> {
    return new Promise<ModelTabPrecoItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTabPrecoItemEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelTabPrecoItemEL01): Promise<ModelTabPrecoItemEL01> {
    return new Promise<ModelTabPrecoItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTabPrecoItemEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelTabPrecoItemEL01> {
    return new Promise<ModelTabPrecoItemEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTabPrecoItemEL01>(url, true)
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

  public getItem(IDTabPreco: number, IDItem: number): Promise<ModelTabPrecoItemEL01> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
    let filter = `TabPrecoItem.IDTabPreco~eq~${IDTabPreco}~and~Item.IDItem~eq~${IDItem}`;
    url += `&page=${1}&pageSize=${99999999}`;
    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<ModelTabPrecoItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTabPrecoItemEL01>>(url, true)
          .then(
            (lista_objetos) => {
              resolve(lista_objetos[0]);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTabPrecoItemEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
    if (this.IDTabPreco != 0 && this.IDTabPreco != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `TabPrecoItem.IDTabPreco~eq~${this.IDTabPreco}`;
    } else {
      console.error('O IDTabPreco deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTabPrecoItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTabPrecoItemEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-tab-preco-item-el01.service.ts');
                                                          /* coluna: string          , nomeCampo: string                    , propriedade: string        , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDTabPrecoItem')        , 'TabPrecoItem.IDTabPrecoItem'        , 'IDTabPrecoItem'           , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodTabPreco')         , 'TabPreco.chCodTabPreco'             , 'chCodTabPreco'            , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTabPreco')         , 'TabPreco.chDescricao'               , 'chDesTabPreco'            , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatValidTabPrecoIni') , 'TabPreco.dtDatValidTabPrecoIni'     , 'dtDatValidTabPrecoIni'    , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatValidTabPrecoFim') , 'TabPreco.dtDatValidTabPrecoFim'     , 'dtDatValidTabPrecoFim'    , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')             , 'Item.chCodItem'                     , 'chCodItem'                , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesItem')             , 'Item.chDescricao'                   , 'chDesItem'                , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUM')               , 'Item.chCodUM'                       , 'chCodUM'                  , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatValidIni')         , 'TabPrecoItem.dtDatValidIni'         , 'dtDatValidIni'            , enum_formatoColuna.dataHora          , true      , false , false      , 160));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdMinima')           , 'TabPrecoItem.deQtdMinima'           , 'deQtdMinima'              , enum_formatoColuna.numero            , false     , false , false      , 160));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePrecoVenda')          , 'TabPrecoItem.dePrecoVenda'          , 'dePrecoVenda'             , enum_formatoColuna.moeda             , false     , false , false      , 150));

    return colunas;
  }
}
