import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelRepresentanteEl01 } from '../models/model-representante-El01';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiRepresentanteEl01Service {
  private url: string = 'corp/api/RepresentanteEL01';
  private orderByColumnName: string = 'IDRepresentante';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDRepresentante';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelRepresentanteEl01): Promise<ModelRepresentanteEl01> {
    return new Promise<ModelRepresentanteEl01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelRepresentanteEl01>(this.url, objeto, true)
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

  public alterar(objeto: ModelRepresentanteEl01): Promise<ModelRepresentanteEl01> {
    return new Promise<ModelRepresentanteEl01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelRepresentanteEl01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelRepresentanteEl01> {
    return new Promise<ModelRepresentanteEl01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelRepresentanteEl01>(url, true)
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

 public obterPorCodigo(inCodRepresentante: number): Promise<ModelRepresentanteEl01> {
    return new Promise<ModelRepresentanteEl01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${inCodRepresentante}`;

        this.apiGatewayService.get<ModelRepresentanteEl01>(url, true)
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
  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelRepresentanteEl01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }


    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelRepresentanteEl01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelRepresentanteEl01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-representante-el01-service.service.ts')
                                                            /* coluna: string                          ,nomeCampo: string                     ,propriedade: string                     ,formatoColuna               ,filterable ,hidden   ,detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRepresentante')                 , 'inCodRepresentante'                      , 'inCodRepresentante'                  , enum_formatoColuna.numero   , true      , false    , false     ,   50));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifRepresentante')    , 'PessoaRepresentante.inNumIdentificacao'  , 'inNumIdentifRepresentante'           , enum_formatoColuna.numero   , true      , false    ,        100, this.formatarCampoRepresentante));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviado')                    , 'chNomeAbreviado'                         , 'chNomeAbreviado'                     , enum_formatoColuna.texto    , true      , false    , false     ,   100));   
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeRepresentante')                , 'chNomeRepresentante'                     , 'chNomeRepresentante'                 , enum_formatoColuna.texto    , true      , false    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoRepresentante')             , 'chDesTipoRepresentante'                  , 'chDesTipoRepresentante'              , enum_formatoColuna.texto    , true      , false   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')                   , 'chDesSituacaoCad'                        , 'chDesSituacaoCad'                    , enum_formatoColuna.texto    , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')                   , 'chDesSituacaoCad'                        , 'chDesSituacaoCad'                    , enum_formatoColuna.texto    , true      , true   , false     ,   100));   
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaRepresentante')         , 'IDPapelPessoaRepresentante'              , 'IDPapelPessoaRepresentante'          , enum_formatoColuna.numero   , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaRepresentante')              , 'IDPessoaRepresentante'                   , 'IDPessoaRepresentante'               , enum_formatoColuna.numero   , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaRepresentante')       , 'inCodTipoPessoaRepresentante'            , 'inCodTipoPessoaRepresentante'        , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaRepresentante')       , 'chDesTipoPessoaRepresentante'            , 'chDesTipoPessoaRepresentante'        , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoRepresentante')    , 'inCodTipoDocumentoRepresentante'         , 'inCodTipoDocumentoRepresentante'     , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoRepresentante')    , 'chDesTipoDocumentoRepresentante'         , 'chDesTipoDocumentoRepresentante'     , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDRepresentante')                    , 'IDRepresentante'                         , 'IDRepresentante'                     , enum_formatoColuna.numero   , true      , true   , false     ,   50));   
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoRepresentante')             , 'inCodTipoRepresentante'                  , 'inCodTipoRepresentante'              , enum_formatoColuna.numero   , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDRepresentantePai')                 , 'IDRepresentantePai'                      , 'IDRepresentantePai'                  , enum_formatoColuna.numero   , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaRepresentantePai')      , 'IDPapelPessoaRepresentantePai'           , 'IDPapelPessoaRepresentantePai'       , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaRepresentantePai')           , 'IDPessoaRepresentantePai'                , 'IDPessoaRepresentantePai'            , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaRepresentantePai')    , 'inCodTipoPessoaRepresentantePai'         , 'inCodTipoPessoaRepresentantePai'     , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaRepresentantePai')    , 'chDesTipoPessoaRepresentantePai'         , 'chDesTipoPessoaRepresentantePai'     , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoRepresentantePai') , 'inCodTipoDocumentoRepresentantePai'      , 'inCodTipoDocumentoRepresentantePai'  , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoRepresentantePai') , 'chDesTipoDocumentoRepresentantePai'      , 'chDesTipoDocumentoRepresentantePai'  , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifRepresentantePai')       , 'inNumIdentifRepresentantePai'            , 'inNumIdentifRepresentantePai'        , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeRepresentantePai')             , 'chNomeRepresentantePai'                  , 'chNomeRepresentantePai'              , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoRepresentantePai')          , 'inCodTipoRepresentantePai'               , 'inCodTipoRepresentantePai'           , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoRepresentantePai')          , 'chDesTipoRepresentantePai'               , 'chDesTipoRepresentantePai'           , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRepresentantePai')              , 'inCodRepresentantePai'                   , 'inCodRepresentantePai'               , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevRepresentantePai')        , 'chNomeAbrevRepresentantePai'             , 'chNomeAbrevRepresentantePai'         , enum_formatoColuna.texto    , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad')                   , 'inCodSituacaoCad'                        , 'inCodSituacaoCad'                    , enum_formatoColuna.numero   , true      , true    , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')                    , 'chDesObservacao'                         , 'chDesObservacao'                     , enum_formatoColuna.texto    , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')                      , 'dtDatInclusao'                           , 'dtDatInclusao'                       , enum_formatoColuna.dataHora , true      , true   , false     ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')                  , 'dtDatUltAlteracao'                       , 'dtDatUltAlteracao'                   , enum_formatoColuna.dataHora , true      , true   , false     ,   100));
    return colunas;
  }



  private formatarCampoRepresentante(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentifRepresentante.toString().length;

    if (obj.inCodTipoDocumentoRepresentante == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifRepresentante.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumentoRepresentante == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifRepresentante.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }

  private formatarCampoRepresentantePai(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentifRepresentantePai.toString().length;

    if (obj.inCodTipoDocumentoRepresentantePai == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifRepresentantePai.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumentoRepresentantePai == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifRepresentantePai.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }
}