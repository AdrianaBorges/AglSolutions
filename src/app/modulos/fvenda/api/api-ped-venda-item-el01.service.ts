import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelPedVendaItemEL01 } from '../models/model-ped-venda-item-EL01';

@Injectable()
export class ApiPedVendaItemEL01Service {
  private url: string = 'fvenda/api/PedVendaItemEL01';
  private orderByColumnName: string = 'IDPedVendaItem';
  private sortType: string = 'asc';
  public IDPedVendaItem: number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public IDPedVenda: number = undefined

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPedVendaItem';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPedVendaItemEL01): Promise<ModelPedVendaItemEL01> {
    return new Promise<ModelPedVendaItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPedVendaItemEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelPedVendaItemEL01): Promise<ModelPedVendaItemEL01> {
    return new Promise<ModelPedVendaItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedVendaItemEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPedVendaItemEL01> {
    return new Promise<ModelPedVendaItemEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPedVendaItemEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPedVendaItemEL01>> {
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if(this.IDPedVenda){
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `PedVendaItem.IDPedVenda~eq~${this.IDPedVenda}`;
    } else {
      filter += `PedVendaItem.IDPedVenda~eq~0`;
    }

    url += `&filter=${filter}`;

    return new Promise<Array<ModelPedVendaItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPedVendaItemEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ped-venda-item-EL01.service.ts');
                                                          /* coluna: string        , nomeCampo: string               , propriedade: string   , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPedVendaItem')      , 'PedVendaItem.IDPedVendaItem'   , 'IDPedVendaItem'      , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumSeq')            , 'PedVendaItem.inNumSeq'         , 'inNumSeq'            , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPedido')     , 'TipoPedido.chDescricao'        , 'chDesTipoPedido'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')           , 'Item.chCodItem'                , 'chCodItem'           , enum_formatoColuna.texto             , true      , false , false      , 130));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesItem')           , 'Item.chDescricao'              , 'chDesItem'           , enum_formatoColuna.texto             , true      , false , false      , 450));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCompl')          , 'PedVendaItem.chDesCompl'       , 'chDesCompl'          , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatEntregaSolic')   , 'PedVendaItem.daDatEntregaSolic', 'daDatEntregaSolic'   , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatEntregaPrev')    , 'PedVendaItem.daDatEntregaPrev' , 'daDatEntregaPrev'    , enum_formatoColuna.data              , true      , false , false      , 160));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFaturPrev')      , 'PedVendaItem.daDatFaturPrev'   , 'daDatFaturPrev'      , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodTabPreco')       , 'TabPreco.chCodTabPreco'        , 'chCodTabPreco'       , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTabPreco')       , 'TabPreco.chDescricao'          , 'chDesTabPreco'       , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdItem')           , 'PedVendaItem.deQtdItem'        , 'deQtdItem'           , enum_formatoColuna.decimal_4         , false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUMItem')         , 'Item.chCodUM'                  , 'chCodUMItem'         , enum_formatoColuna.texto             , false     , false , false      , 50));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePrecoTabela')       , 'PedVendaItem.dePrecoTabela'    , 'dePrecoTabela'       , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValUnitBruto')      , 'PedVendaItem.deValUnitBruto'   , 'deValUnitBruto'      , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescCascata')       , 'PedVendaItem.chDescCascata'    , 'chDescCascata'       , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValUnitLiquido')    , 'PedVendaItem.deValUnitLiquido' , 'deValUnitLiquido'    , enum_formatoColuna.moeda             , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValTotLiquido')     , 'PedVendaItem.deValTotLiquido'  , 'deValTotLiquido'     , enum_formatoColuna.moeda             , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePercIPI')           , 'PedVendaItem.dePercIPI'        , 'dePercIPI'           , enum_formatoColuna.decimal_2         , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValIPI')            , 'PedVendaItem.deValIPI'         , 'deValIPI'            , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePercST')            , 'PedVendaItem.dePercST'         , 'dePercST'            , enum_formatoColuna.decimal_2         , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValST')             , 'PedVendaItem.deValST'          , 'deValST'             , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoAtenPed'), 'SituacaoAtenPed.chDescricao'   , 'chDesSituacaoAtenPed', enum_formatoColuna.texto             , false     , false , false      , 200));
    
    return colunas;
  }
}