import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelItemEL01 } from '../models/model-item-EL01';

@Injectable()
export class ApiItemEL01Service {

  private url: string = 'fvenda/api/ItemEL01';
  private orderByColumnName: string = 'Item.chCodItem';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'Item.chCodItem';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelItemEL01): Promise<ModelItemEL01> {
    return new Promise<ModelItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelItemEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelItemEL01): Promise<ModelItemEL01> {
    return new Promise<ModelItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelItemEL01>(this.url, objeto, true)
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

  public inativar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/inativar/${id}`;

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

  public obter(id: number): Promise<ModelItemEL01> {
    return new Promise<ModelItemEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelItemEL01>(url, true)
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

  public obterPorCodigo(chCodItem: string): Promise<ModelItemEL01> {
    return new Promise<ModelItemEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${chCodItem}/`;

        this.apiGatewayService.get<ModelItemEL01>(url, true)
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

  public obterPorCodigoOnlyItem(chCodItem: string): Promise<ModelItemEL01> {

    let filter = "";
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
    url += `&page=1&pageSize=9999999`;
    filter += `Item.inCodEspecieItem~neq~2~and~Item.chCodItem~eq~'${chCodItem}'`;
    //Aplicando filtro de pessoa por padrão
    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<ModelItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemEL01>>(url, true)
          .then(
            (lista_objetos) => {
              resolve(lista_objetos.length > 0 ? lista_objetos[0] : undefined);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public obterPorCodigoOnlyService(chCodItem: string): Promise<ModelItemEL01> {

    let filter = "";
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
    url += `&page=1&pageSize=9999999`;
    filter += `Item.inCodEspecieItem~eq~2~and~Item.chCodItem~eq~'${chCodItem}'`;
    //Aplicando filtro de pessoa por padrão
    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<ModelItemEL01>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemEL01>>(url, true)
          .then(
            (lista_objetos) => {
              resolve(lista_objetos.length > 0 ? lista_objetos[0] : undefined);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public  listarAcabadoAtivo(page: number, pageSize: number, filter: string): Promise<Array<ModelItemEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (filter != '') {
      filter += `~and~`;
    }
    filter += `Item.inCodEspecieItem~eq~1~and~Item.inCodSituacaoCad~eq~2`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemEL01>>(url, true)
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

  public listarOnlyItem(page: number, pageSize: number, filter: string): Promise<Array<ModelItemEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (filter != '') {
      filter += `~and~`;
    }
    filter += `Item.inCodEspecieItem~neq~2`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemEL01>>(url, true)
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

  public listarOnlyService(page: number, pageSize: number, filter: string): Promise<Array<ModelItemEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (filter != '') {
      filter += `~and~`;
    }
    filter += `Item.inCodEspecieItem~eq~2`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemEL01>>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelItemEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelItemEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelItemEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-item-EL01.service.ts');
                                                          /* coluna: string         , nomeCampo: string         , propriedade: string  , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItem')               , 'Item.IDItem'             , 'IDItem'             , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')            , 'Item.chCodItem'          , 'chCodItem'          , enum_formatoColuna.texto             , true      , false, false, 140));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodEspecieItem')     , 'Item.inCodEspecieItem'   , 'inCodEspecieItem'   , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesEspecieItem')     , 'EspecieItem.chDescricao' , 'chDesEspecieItem'   , enum_formatoColuna.texto             , false     , false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEAN')             , 'Item.chCodEAN'           , 'chCodEAN'           , enum_formatoColuna.texto             , true      , false, false, 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodComplem')         , 'Item.chCodComplem'       , 'chCodComplem'       , enum_formatoColuna.texto             , true      , false, false, 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')          , 'Item.chDescricao'        , 'chDescricao'        , enum_formatoColuna.texto             , true      , false, false, 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCategoria')          , 'Item.IDCategoria'        , 'IDCategoria'        , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCategoria')       , 'Categoria.chCodCategoria', 'chCodCategoria'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCategoria')       , 'Categoria.chDescricao'   , 'chDesCategoria'     , enum_formatoColuna.texto             , false     , false, false, 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDFamCom')             , 'Item.IDFamCom'           , 'IDFamCom'           , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodFamCom')          , 'FamCom.chCodFamCom'      , 'chCodFamCom'        , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesFamCom')          , 'FamCom.chDescricao'      , 'chDesFamCom'        , enum_formatoColuna.texto             , false     , false, false, 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDFamMat')             , 'Item.IDFamMat'           , 'IDFamMat'           , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodFamMat')          , 'FamMat.chCodFamMat'      , 'chCodFamMat'        , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesFamMat')          , 'FamMat.chDescricao'      , 'chDesFamMat'        , enum_formatoColuna.texto             , false     , false, false, 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrpEst')          , 'GrpEst.chDescricao'      , 'chDesGrpEst'        , enum_formatoColuna.texto             , false     , false, false, 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDGrpEst')             , 'Item.IDGrpEst'           , 'IDGrpEst'           , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodGrpEst')          , 'GrpEst.chCodGrpEst'      , 'chCodGrpEst'        , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUM')              , 'Item.chCodUM'            , 'chCodUM'            , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodNCM')             , 'Item.chCodNCM'           , 'chCodNCM'           , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePercIPI')            , 'Item.dePercIPI'          , 'dePercIPI'          , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePercST')             , 'Item.dePercST'           , 'dePercST'           , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePesoBruto')          , 'Item.dePesoBruto'        , 'dePesoBruto'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dePesoLiquido')        , 'Item.dePesoLiquido'      , 'dePesoLiquido'      , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deLargura')            , 'Item.deLargura'          , 'deLargura'          , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deAltura')             , 'Item.deAltura'           , 'deAltura'           , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deComprimento')        , 'Item.deComprimento'      , 'deComprimento'      , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdMultipla')        , 'Item.deQtdMultipla'      , 'deQtdMultipla'      , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdMinima')          , 'Item.deQtdMinima'        , 'deQtdMinima'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deQtdMaxima')          , 'Item.deQtdMaxima'        , 'deQtdMaxima'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgPermDesconto')       , 'Item.lgPermDesconto'     , 'lgPermDesconto'     , enum_formatoColuna.booleano          , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deDescMaximo')         , 'Item.deDescMaximo'       , 'deDescMaximo'       , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad')     , 'Item.inCodSituacaoCad'   , 'inCodSituacaoCad'   , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')     , 'SituacaoCad.chDescricao' , 'chDesSituacaoCad'   , enum_formatoColuna.texto             , false     , false, false, 190));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')      , 'Item.chDesObservacao'    , 'chDesObservacao'    , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgControleLoteSerie')  , 'Item.lgControleLoteSerie', 'lgControleLoteSerie', enum_formatoColuna.booleano          , false     , true));

    return colunas;
  }

  public getColunasGridPesquisa(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-item-EL01.service.ts');
                                                         /* coluna: string     , nomeCampo: string         , propriedade: string, formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDItem')          , 'Item.IDItem'             , 'IDItem'           , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')       , 'Item.chCodItem'          , 'chCodItem'        , enum_formatoColuna.texto             , true      , false , false      , 140));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodEspecieItem'), 'Item.inCodEspecieItem'   , 'inCodEspecieItem' , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesEspecieItem'), 'EspecieItem.chDescricao' , 'chDesEspecieItem' , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEAN')        , 'Item.chCodEAN'           , 'chCodEAN'         , enum_formatoColuna.texto             , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodComplem')    , 'Item.chCodComplem'       , 'chCodComplem'     , enum_formatoColuna.texto             , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')     , 'Item.chDescricao'        , 'chDescricao'      , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCategoria')     , 'Item.IDCategoria'        , 'IDCategoria'      , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCategoria')  , 'Categoria.chCodCategoria', 'chCodCategoria'   , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCategoria')  , 'Categoria.chDescricao'   , 'chDesCategoria'   , enum_formatoColuna.texto             , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDFamCom')        , 'Item.IDFamCom'           , 'IDFamCom'         , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodFamCom')     , 'FamCom.chCodFamCom'      , 'chCodFamCom'      , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesFamCom')     , 'FamCom.chDescricao'      , 'chDesFamCom'      , enum_formatoColuna.texto             , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDFamMat')        , 'Item.IDFamMat'           , 'IDFamMat'         , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodFamMat')     , 'FamMat.chCodFamMat'      , 'chCodFamMat'      , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesFamMat')     , 'FamMat.chDescricao'      , 'chDesFamMat'      , enum_formatoColuna.texto             , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDGrpEst')        , 'Item.IDGrpEst'           , 'IDGrpEst'         , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodGrpEst')     , 'GrpEst.chCodGrpEst'      , 'chCodGrpEst'      , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrpEst')     , 'GrpEst.chDescricao'      , 'chDesGrpEst'      , enum_formatoColuna.texto             , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad'), 'Item.inCodSituacaoCad'   , 'inCodSituacaoCad' , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad'), 'SituacaoCad.chDescricao' , 'chDesSituacaoCad' , enum_formatoColuna.texto             , true      , false , false      , 190));

    return colunas;
  }
}
