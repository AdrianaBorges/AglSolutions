import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelClienteEL01 } from '../models/model-ClienteEL01';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable({
  providedIn: 'root'
})
export class ApiClienteEl01Service {
private url: string = 'corp/api/ClienteEl01';
  private orderByColumnName: string = 'IDCliente';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDCliente';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelClienteEL01): Promise<ModelClienteEL01> {
    return new Promise<ModelClienteEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelClienteEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelClienteEL01): Promise<ModelClienteEL01> {
    return new Promise<ModelClienteEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelClienteEL01>(this.url, objeto, true)
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


  public obter(id: number): Promise<ModelClienteEL01> {
    return new Promise<ModelClienteEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelClienteEL01>(url, true)
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


  public obterPorCodigo(inCodCliente: number): Promise<ModelClienteEL01> {
    return new Promise<ModelClienteEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${inCodCliente}`;

        this.apiGatewayService.get<ModelClienteEL01>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelClienteEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelClienteEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelClienteEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-cliente-el01.service.ts');
                                                          /* coluna: string                    , nomeCampo: string                      ,   propriedade: string              ,    formatoColuna            ,filterable , hidden   , detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodCliente')                    , 'inCodCliente'                         , 'inCodCliente'                     , enum_formatoColuna.numero   , true      , false    , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifCliente')             , 'inNumIdentifCliente'                  , 'inNumIdentifCliente'              , enum_formatoColuna.numero   , true      , false    , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviado')                 , 'chNomeAbreviado'                      , 'chNomeAbreviado'                  , enum_formatoColuna.texto    , true      , false    , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeCliente')                   , 'chNomeCliente'                        , 'chNomeCliente'                    , enum_formatoColuna.texto    , true      , false    , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeRepresentante')             , 'chNomeRepresentante'                  , 'chNomeRepresentante'              , enum_formatoColuna.texto    , true      , false    , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')                , 'chDesSituacaoCad'                     , 'chDesSituacaoCad'                 , enum_formatoColuna.texto    , true      , false    , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCliente')                       , 'IDCliente'                            , 'IDCliente'                        , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaCliente')            , 'IDPapelPessoaCliente'                 , 'IDPapelPessoaCliente'             , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaCliente')                 , 'IDPessoaCliente'                      , 'IDPessoaCliente'                  , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaCliente')          , 'inCodTipoPessoaCliente'               , 'inCodTipoPessoaCliente'           , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaCliente')          , 'chDesTipoPessoaCliente'               , 'chDesTipoPessoaCliente'           , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoCliente')       , 'inCodTipoDocumentoCliente'            , 'inCodTipoDocumentoCliente'        , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoCliente')       , 'chDesTipoDocumentoCliente'            , 'chDesTipoDocumentoCliente'        , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDClientePai')                    , 'IDClientePai'                         , 'IDClientePai'                     , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaClientePai')         , 'IDPapelPessoaClientePai'              , 'IDPapelPessoaClientePai'          , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaClientePai')              , 'IDPessoaClientePai'                   , 'IDPessoaClientePai'               , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaClientePai')       , 'inCodTipoPessoaClientePai'            , 'inCodTipoPessoaClientePai'        , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaClientePai')       , 'chDesTipoPessoaClientePai'            , 'chDesTipoPessoaClientePai'        , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoClientePai')    , 'inCodTipoDocumentoClientePai'         , 'inCodTipoDocumentoClientePai'     , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoClientePai')    , 'chDesTipoDocumentoClientePai'         , 'chDesTipoDocumentoClientePai'     , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifClientePai')          , 'inNumIdentifClientePai'               , 'inNumIdentifClientePai'           , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeClientePai')                , 'chNomeClientePai'                     , 'chNomeClientePai'                 , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodClientePai')                 , 'inCodClientePai'                      , 'inCodClientePai'                  , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevClientePai')           , 'chNomeAbrevClientePai'                , 'chNomeAbrevClientePai'            , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaPagador')            , 'IDPapelPessoaPagador'                 , 'IDPapelPessoaPagador'             , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaPagador')                 , 'IDPessoaPagador'                      , 'IDPessoaPagador'                  , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaPagador')          , 'inCodTipoPessoaPagador'               , 'inCodTipoPessoaPagador'           , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaPagador')          , 'chDesTipoPessoaPagador'               , 'chDesTipoPessoaPagador'           , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoPagador')       , 'inCodTipoDocumentoPagador'            , 'inCodTipoDocumentoPagador'        , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoPagador')       , 'chDesTipoDocumentoPagador'            , 'chDesTipoDocumentoPagador'        , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifPagador')             , 'inNumIdentifPagador'                  , 'inNumIdentifPagador'              , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePagador')                   , 'chNomePagador'                        , 'chNomePagador'                    , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDRepresentante')                 , 'IDRepresentante'                      , 'IDRepresentante'                  , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaRepresentante')      , 'IDPapelPessoaRepresentante'           , 'IDPapelPessoaRepresentante'       , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaRepresentante')           , 'IDPessoaRepresentante'                , 'IDPessoaRepresentante'            , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaRepresentante')    , 'inCodTipoPessoaRepresentante'         , 'inCodTipoPessoaRepresentante'     , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaRepresentante')    , 'chDesTipoPessoaRepresentante'         , 'chDesTipoPessoaRepresentante'     , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoRepresentante') , 'inCodTipoDocumentoRepresentante'      , 'inCodTipoDocumentoRepresentante'  , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoRepresentante') , 'chDesTipoDocumentoRepresentante'      , 'chDesTipoDocumentoRepresentante'  , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifRepresentante')       , 'inNumIdentifRepresentante'            , 'inNumIdentifRepresentante'        , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRepresentante')              , 'inCodRepresentante'                   , 'inCodRepresentante'               , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevRepresentante')        , 'chNomeAbrevRepresentante'             , 'chNomeAbrevRepresentante'         , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad')                , 'inCodSituacaoCad'                     , 'inCodSituacaoCad'                 , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')                , 'chDesSituacaoCad'                     , 'chDesSituacaoCad'                 , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodGrupoCliente')               , 'chCodGrupoCliente'                    , 'chCodGrupoCliente'                , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoCliente')               , 'chDesGrupoCliente'                    , 'chDesGrupoCliente'                , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDMicrorregiao')                  , 'IDMicrorregiao'                       , 'IDMicrorregiao'                   , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodRegiao')                     , 'chCodRegiao'                          , 'chCodRegiao'                      , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesRegiao')                     , 'chDesRegiao'                          , 'chDesRegiao'                      , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodMicrorregiao')               , 'chCodMicrorregiao'                    , 'chCodMicrorregiao'                , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesMicrorregiao')               , 'chDesMicrorregiao'                    , 'chDesMicrorregiao'                , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCanalVenda')                 , 'chCodCanalVenda'                      , 'chCodCanalVenda'                  , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgPermComunic')                   , 'lgPermComunic'                        , 'lgPermComunic'                    , enum_formatoColuna.booleano , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSuframa')                    , 'chDesSuframa'                         , 'chDesSuframa'                     , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValLimCredito')                 , 'deValLimCredito'                      , 'deValLimCredito'                  , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatExpLimCredito')              , 'daDatExpLimCredito'                   , 'daDatExpLimCredito'               , enum_formatoColuna.numero   , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')                 , 'chDesObservacao'                      , 'chDesObservacao'                  , enum_formatoColuna.texto    , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')                   , 'dtDatInclusao'                        , 'dtDatInclusao'                    , enum_formatoColuna.dataHora , true      , true     , false      ,   100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')               , 'dtDatUltAlteracao'                    , 'dtDatUltAlteracao'                , enum_formatoColuna.dataHora , true      , true     , false      ,   100));
    

    return colunas;
  }

  
  private formatarCampo(obj: any): string {

     let identificacao: string;
     let qtde = obj.inCNPJEmpresa.toString().length;
     let document = '0'.repeat(14-qtde)+ obj.inCNPJEmpresa.toString();
     identificacao = document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5"); //    `${document.substr(0, 2)}.${document.substr(2, 3)}.${document.substr(5, 3)}/${document.substr(8, 4)}-${document.substr(12, 2)}`
    return identificacao;
  }
  
}
