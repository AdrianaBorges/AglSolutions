import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelAssTecItemServ } from '../models/model-ass-tec-item-serv';

@Injectable()
export class ApiAssTecItemServService {

  private url: string = 'fvenda/api/AssTecItemServ';
  private orderByColumnName: string = 'IDAssTecItemServ';
  private sortType: string = 'asc';

  public IDAssTecItem: number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDAssTecItemServ';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelAssTecItemServ): Promise<ModelAssTecItemServ> {
    return new Promise<ModelAssTecItemServ>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelAssTecItemServ>(this.url, objeto, true)
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

  public alterar(objeto: ModelAssTecItemServ): Promise<ModelAssTecItemServ> {
    return new Promise<ModelAssTecItemServ>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelAssTecItemServ>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelAssTecItemServ> {
    return new Promise<ModelAssTecItemServ>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelAssTecItemServ>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelAssTecItemServ>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (this.IDAssTecItem != 0 && this.IDAssTecItem != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `AssTecItemServ.IDAssTecItem~eq~${this.IDAssTecItem}`;
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

    return new Promise<Array<ModelAssTecItemServ>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelAssTecItemServ>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ass-tec-item-serv.service.ts');
                                                          /* coluna: string           , nomeCampo: string                     , propriedade: string      , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecItem')           , 'AssTecItemServ.IDAssTecItem'         , 'IDAssTecItem'           , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecItemServ')       , 'AssTecItemServ.IDAssTecItemServ'     , 'IDAssTecItemServ'       , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItem')                 , 'AssTecItemServ.IDItem'               , 'IDItem'                 , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')              , 'Item.chCodItem'                      , 'chCodItem'              , enum_formatoColuna.texto             , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesItem')              , 'Item.chDescricao'                    , 'chDesItem'              , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesComplem')           , 'AssTecItemServ.chDesComplem'         , 'chDesComplem'           , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')          , 'AssTecItemServ.dtDatInclusao'        , 'dtDatInclusao'          , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioInclusao')   , 'AssTecItemServ.chCodUsuarioInclusao' , 'chCodUsuarioInclusao'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioInclusao')  , 'UsuarioInclusao.chNomeUsuario'       , 'chNomeUsuarioInclusao'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')      , 'AssTecItemServ.dtDatUltAlteracao'    , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioAlteracao')  , 'AssTecItemServ.chCodUsuarioAlteracao', 'chCodUsuarioAlteracao'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioAlteracao') , 'UsuarioAlteracao.chNomeUsuario'      , 'chCodUsuarioAlteracao'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoAssTecItem'), 'AssTecItem.inCodSituacaoAssTec'      , 'inCodSituacaoAssTecItem', enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoAssTecItem'), 'SituacaoAssTec.chDescricao'          , 'chDesSituacaoAssTecItem', enum_formatoColuna.texto             , true      , true));

    return colunas;
  }
}
