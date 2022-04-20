import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelAssTecItemDefConst } from '../models/model-ass-tec-item-def-const';

@Injectable()
export class ApiAssTecItemDefConstService {

  private url: string = 'fvenda/api/AssTecItemDefConst';
  private orderByColumnName: string = 'IDAssTecItemDefConst';
  private sortType: string = 'asc';

  public IDAssTecItem: number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDAssTecItemDefConst';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelAssTecItemDefConst): Promise<ModelAssTecItemDefConst> {
    return new Promise<ModelAssTecItemDefConst>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelAssTecItemDefConst>(this.url, objeto, true)
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

  public alterar(objeto: ModelAssTecItemDefConst): Promise<ModelAssTecItemDefConst> {
    return new Promise<ModelAssTecItemDefConst>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelAssTecItemDefConst>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelAssTecItemDefConst> {
    return new Promise<ModelAssTecItemDefConst>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelAssTecItemDefConst>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelAssTecItemDefConst>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (this.IDAssTecItem != 0 && this.IDAssTecItem != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `AssTecItemDefConst.IDAssTecItem~eq~${this.IDAssTecItem}`;
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

    return new Promise<Array<ModelAssTecItemDefConst>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelAssTecItemDefConst>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ass-tec-item-def-const.service.ts');
                                                          /* coluna: string           , nomeCampo: string                         , propriedade: string      , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecItem')           , 'AssTecItemDefConst.IDAssTecItem'         , 'IDAssTecItem'           , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecItemDefConst')   , 'AssTecItemDefConst.IDAssTecItemDefConst' , 'IDAssTecItemDefConst'   , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDDefeito')              , 'AssTecItemDefConst.IDDefeito'            , 'IDDefeito'              , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodDefeito')           , 'Defeito.chCodDefeito'                    , 'chCodDefeito'           , enum_formatoColuna.texto             , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesDefeito')           , 'Defeito.chDescricao'                     , 'chDesDefeito'           , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProblema')          , 'AssTecItemDefConst.chDesProblema'        , 'chDesProblema'          , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')          , 'AssTecItemDefConst.dtDatInclusao'        , 'dtDatInclusao'          , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioInclusao')   , 'AssTecItemDefConst.chCodUsuarioInclusao' , 'chCodUsuarioInclusao'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioInclusao')  , 'UsuarioInclusao.chNomeUsuario'           , 'chNomeUsuarioInclusao'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')      , 'AssTecItemDefConst.dtDatUltAlteracao'    , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioAlteracao')  , 'AssTecItemDefConst.chCodUsuarioAlteracao', 'chCodUsuarioAlteracao'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioAlteracao') , 'UsuarioAlteracao.chNomeUsuario'          , 'chCodUsuarioAlteracao'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoAssTecItem'), 'AssTecItem.inCodSituacaoAssTec'          , 'inCodSituacaoAssTecItem', enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoAssTecItem'), 'SituacaoAssTec.chDescricao'              , 'chDesSituacaoAssTecItem', enum_formatoColuna.texto             , true      , true));

    return colunas;
  }
}
