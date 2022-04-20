import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelSolicAprovPVItemEL01 } from '../models/model-solic-aprov-pv-item-EL01';

@Injectable()
export class ApiSolicAprovPVItemEL01Service {
  private url: string = 'fvenda/api/SolicAprovPVItemEL01';
  private orderByColumnName: string = 'IDSolicAprovPVItem';
  private sortType: string = 'asc';
  public IDSolicAprovPV:number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDSolicAprovPVItem';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSolicAprovPVItemEL01): Promise<ModelSolicAprovPVItemEL01> {
    return new Promise<ModelSolicAprovPVItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSolicAprovPVItemEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelSolicAprovPVItemEL01): Promise<ModelSolicAprovPVItemEL01> {
    return new Promise<ModelSolicAprovPVItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSolicAprovPVItemEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelSolicAprovPVItemEL01> {
    return new Promise<ModelSolicAprovPVItemEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSolicAprovPVItemEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSolicAprovPVItemEL01>> {
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }
    //Aplicando filtro de pessoa por padrão
    if (this.IDSolicAprovPV) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `SolicAprovPVItem.IDSolicAprovPV~eq~${this.IDSolicAprovPV}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSolicAprovPVItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSolicAprovPVItemEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-solic-aprov-pv-item-el01.service.ts');
                                                          /* coluna: string         , nomeCampo: string                    , propriedade: string     , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSolicAprovPVItem')   , 'SolicAprovPVItem.IDSolicAprovPVItem', 'IDSolicAprovPVItem'    , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSolicAprovPV')       , 'SolicAprovPVItem.IDSolicAprovPV'    , 'IDSolicAprovPV'        , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoSolAprPV'), 'SituacaoSolAprPV.chDescricao'       , 'chDesSituacaoSolAprPV' , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEstabelec')       , 'Estabelec.chCodEstabelec'           , 'chCodEstabelec'        , enum_formatoColuna.texto             , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevEstabelec')  , 'Estabelec.chNomeAbreviado'          , 'chNomAbrevEstabelec'   , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumPedVenda')        , 'PedVenda.inNumPedVenda'             , 'inNumPedVenda'         , enum_formatoColuna.numero_sem_formato, false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedRep')          , 'PedVenda.chNumPedRep'               , 'chNumPedRep'           , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedEmp')          , 'PedVenda.chNumPedEmp'               , 'chNumPedEmp'           , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedCli')          , 'PedVenda.chNumPedCli'               , 'chNumPedCli'           , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatEmissao')         , 'PedVenda.daDatEmissao'              , 'daDatEmissao'          , enum_formatoColuna.data              , true      , false , false      , 130));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatEntrada')         , 'PedVenda.daDatEntrada'              , 'daDatEntrada'          , enum_formatoColuna.data              , true      , false , false      , 130));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValProduto')         , 'PedVenda.deValProduto'              , 'deValProduto'          , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValTotal')           , 'PedVenda.deValTotal'                , 'deValTotal'            , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValBonific')         , 'PedVenda.deValBonific'              , 'deValBonific'          , enum_formatoColuna.moeda             , false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValVenda')           , 'PedVenda.deValVenda'                , 'deValVenda'            , enum_formatoColuna.moeda             , false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgPedPrincipal')       , 'SolicAprovPVItem.lgPedPrincipal'    , 'lgPedPrincipal'        , enum_formatoColuna.booleano          , false     , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoPedVen')  , 'SituacaoPedVen.chDescricao'         , 'chDesSituacaoPedVen'   , enum_formatoColuna.texto             , false     , false , false      , 180));
    
    return colunas;
  }
}
