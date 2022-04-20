import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelCtoCorSegEL01 } from "../../eseg/models/model-cto-cor-seg-el01";
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiCtoCorSegEL01Service {

  private url: string = 'eseg/api/CtoCorSegEL01';
  private orderByColumnName: string = 'IDCtoCorSeg';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDCtoCorSeg';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCtoCorSegEL01): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCtoCorSegEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelCtoCorSegEL01): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCtoCorSegEL01>(this.url, objeto, true)
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

  public inativar(id: number): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCtoCorSegEL01>(`${this.url}/Inativar/${id}`, id, true)
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

  public validar(id: number): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCtoCorSegEL01>(`${this.url}/Validar/${id}`, id, true)
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


  public reativar(id: number): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCtoCorSegEL01>(`${this.url}/Reativar/${id}`, id, true)
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


  public cancelar(id: number): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCtoCorSegEL01>(`${this.url}/Cancelar/${id}`, id, true)
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

  public obter(id: number): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCtoCorSegEL01>(url, true)
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

  public obterNumContratoCorretagem(id: string): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${id}`;

        this.apiGatewayService.get<ModelCtoCorSegEL01>(url, true)
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

  public obterContratoAtivoPessoa(id: number): Promise<ModelCtoCorSegEL01> {
    return new Promise<ModelCtoCorSegEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetAtivoByIDPessoa/${id}`;

        this.apiGatewayService.get<ModelCtoCorSegEL01>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCtoCorSegEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCtoCorSegEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCtoCorSegEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-cto-cor-seg.service.ts');
                                       /* coluna: string                                   , nomeCampo: string                            , propriedade: string          , formatoColuna                        , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCtoCorSeg')                 , 'CtoCorSeg.IDCtoCorSeg'                      , 'IDCtoCorSeg'                , enum_formatoColuna.numero_sem_formato, true       , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumCtoCorSeg')              , 'CtoCorSeg.chNumCtoCorSeg'                   , 'chNumCtoCorSeg'             , enum_formatoColuna.texto             , true       , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPapel')              , 'PapelPessoa.inCodTipoPapel'                 , 'inCodTipoPapel'             , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPapel')              , 'TipoPapel.chDesTipoPapel'                   , 'chDesTipoPapel'             , enum_formatoColuna.texto             , false      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviado')             , 'CtoCorSeg.chNomeAbreviado'                  , 'chNomeAbreviado'            , enum_formatoColuna.texto             , true       , false , false      , 220));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoa')               , 'CtoCorSeg.IDPapelPessoa'                    , 'IDPapelPessoa'              , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')                    , 'PapelPessoa.IDPessoa'                       , 'IDPessoa'                   , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoa')             , 'Pessoa.inCodTipoPessoa'                     , 'inCodTipoPessoa'            , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoa')             , 'TipoPessoa.chDesTipoPessoa'                 , 'chDesTipoPessoa'            , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumento')          , 'Pessoa.inCodTipoDocumento'                  , 'inCodTipoDocumento'         , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumento')          , 'TipoDocumento.chDesTipoDocumento'           , 'chDesTipoDocumento'         , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentificacao')          , 'Pessoa.inNumIdentificacao'                  , 'inNumIdentificacao'         , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoa')                , 'Pessoa.chNomePessoa'                        , 'chNomePessoa'               , enum_formatoColuna.texto             , true       , false ,false       , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatIniVig')                 , 'CtoCorSeg.daDatIniVig'                      , 'daDatIniVig'                , enum_formatoColuna.data              , true       , false ,false       , 110));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFimVig')                 , 'CtoCorSeg.daDatFimVig'                      , 'daDatFimVig'                , enum_formatoColuna.data              , true       , false ,false       , 110));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSusep')                  , 'CtoCorSeg.chNumSusep'                       , 'chNumSusep'                 , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatRegSusep')               , 'CtoCorSeg.daDatRegSusep'                    , 'daDatRegSusep'              , enum_formatoColuna.data              , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatExpSusep')               , 'CtoCorSeg.daDatExpSusep'                    , 'daDatExpSusep'              , enum_formatoColuna.data              , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad')            , 'CtoCorSeg.inCodSituacaoCad'                 , 'inCodSituacaoCad'           , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')            , 'SituacaoCad.chDescricao'                    , 'chDesSituacaoCad'           , enum_formatoColuna.texto             , false      , false ,false       , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCtoCorSegCorretor')         , 'CtoCorSeg.IDCtoCorSegCorretor'              , 'IDCtoCorSegCorretor'        , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumCtoCorSegCorretor')      , 'CtoCorSegCorretor.chNumCtoCorSeg'           , 'chNumCtoCorSegCorretor'     , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaCorretor')            , 'PapelPessoaCorretor.IDPessoa'               , 'IDPessoaCorretor'           , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaCorretor')     , 'PessoaCorretor.inCodTipoPessoa'             , 'inCodTipoPessoaCorretor'    , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaCorretor')     , 'TipoPessoaCorretor.chDesTipoPessoa'         , 'chDesTipoPessoaCorretor'    , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoCorretor')  , 'PessoaCorretor.inCodTipoDocumento'          , 'inCodTipoDocumentoCorretor' , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoCorretor')  , 'TipoDocumentoCorretor.chDesTipoDocumento'   , 'chDesTipoDocumentoCorretor' , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifCorretor')        , 'PessoaCorretor.inNumIdentificacao'          , 'inNumIdentifCorretor'       , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeCorretor')              , 'PessoaCorretor.chNomePessoa'                , 'chNomeCorretor'             , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCtoCorSegPai')              , 'CtoCorSeg.IDCtoCorSegPai'                   , 'IDCtoCorSegPai'             , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumCtoCorSegPai')           , 'CtoCorSegPai.chNumCtoCorSeg'                , 'chNumCtoCorSegPai'          , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaPai')                 , 'PapelPessoaPai.IDPessoa'                    , 'IDPessoaPai'                , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaPai')          , 'PessoaPai.inCodTipoPessoa'                  , 'inCodTipoPessoaPai'         , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaPai')          , 'TipoPessoaPai.chDesTipoPessoa'              , 'chDesTipoPessoaPai'         , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoPai')       , 'PessoaPai.inCodTipoDocumento'               , 'inCodTipoDocumentoPai'      , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoPai')       , 'TipoDocumentoPai.chDesTipoDocumento'        , 'chDesTipoDocumentoPai'      , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifPai')             , 'PessoaPai.inNumIdentificacao'               , 'inNumIdentifPai'            , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePai')                   , 'PessoaPai.chNomePessoa'                     , 'chNomePai'                  , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPapelPai')           , 'PapelPessoaPai.inCodTipoPapel'              , 'inCodTipoPapelPai'          , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPapelPai')           , 'TipoPapelPai.chDesTipoPapel'                , 'chDesTipoPapelPai'          , enum_formatoColuna.texto             , false      , true));

    return colunas;
  }
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGridDialog(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-cto-cor-seg.service.ts');
                                           /* coluna: string                                   , nomeCampo: string                         , propriedade: string         , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCtoCorSeg')               , 'CtoCorSeg.IDCtoCorSeg'                   , 'IDCtoCorSeg'               , enum_formatoColuna.numero            , true      , false , false      , 80));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumCtoCorSeg')            , 'CtoCorSeg.chNumCtoCorSeg'                , 'chNumCtoCorSeg'            , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbreviado')           , 'CtoCorSeg.chNomeAbreviado'               , 'chNomeAbreviado'           , enum_formatoColuna.texto             , true      , false , false      , 220));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPapel')            , 'PapelPessoa.inCodTipoPapel'              , 'inCodTipoPapel'            , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoa')             , 'CtoCorSeg.IDPapelPessoa'                 , 'IDPapelPessoa'             , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoa')                  , 'PapelPessoa.IDPessoa'                    , 'IDPessoa'                  , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoa')           , 'Pessoa.inCodTipoPessoa'                  , 'inCodTipoPessoa'           , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')           , 'TipoPessoa.chDesTipoPessoa'              , 'chDesTipoPessoa'           , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumento')        , 'Pessoa.inCodTipoDocumento'               , 'inCodTipoDocumento'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumento')        , 'TipoDocumento.chDesTipoDocumento'        , 'chDesTipoDocumento'        , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao')        , 'Pessoa.inNumIdentificacao'               , 'inNumIdentificacao'        , enum_formatoColuna.numero            , true      , false              , 180, this.formatarNumIdentif));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoa')              , 'Pessoa.chNomePessoa'                     , 'chNomePessoa'              , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPapel')            , 'TipoPapel.chDesTipoPapel'                , 'chDesTipoPapel'            , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatIniVig')               , 'CtoCorSeg.daDatIniVig'                   , 'daDatIniVig'               , enum_formatoColuna.data              , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatFimVig')               , 'CtoCorSegdaDatFimVig'                    , 'daDatFimVig'               , enum_formatoColuna.data              , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumSusep')                , 'CtoCorSegchNumSusep'                     , 'chNumSusep'                , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatRegSusep')             , 'CtoCorSeg.daDatRegSusep'                 , 'daDatRegSusep'             , enum_formatoColuna.data              , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatExpSusep')             , 'CtoCorSeg.daDatExpSusep'                 , 'daDatExpSusep'             , enum_formatoColuna.data              , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSituacaoCad')          , 'CtoCorSeg.inCodSituacaoCad'              , 'inCodSituacaoCad'          , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCad')          , 'SituacaoCad.chDescricao'                 , 'chDesSituacaoCad'          , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCtoCorSegCorretor')       , 'CtoCorSeg.IDCtoCorSegCorretor'           , 'IDCtoCorSegCorretor'       , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumCtoCorSegCorretor')    , 'CtoCorSegCorretor.chNumCtoCorSeg'        , 'chNumCtoCorSegCorretor'    , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaCorretor')          , 'PapelPessoaCorretor.IDPessoa'            , 'IDPessoaCorretor'          , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaCorretor')   , 'PessoaCorretor.inCodTipoPessoa'          , 'inCodTipoPessoaCorretor'   , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaCorretor')   , 'TipoPessoaCorretor.chDesTipoPessoa'      , 'chDesTipoPessoaCorretor'   , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoCorretor'), 'PessoaCorretor.inCodTipoDocumento'       , 'inCodTipoDocumentoCorretor', enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoCorretor'), 'TipoDocumentoCorretor.chDesTipoDocumento', 'chDesTipoDocumentoCorretor', enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inNumIdentifCorretor')      , 'PessoaCorretor.inNumIdentificacao'       , 'inNumIdentifCorretor'      , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCorretor')            , 'PessoaCorretor.chNomePessoa'             , 'chNomeCorretor'            , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCtoCorSegPai')            , 'CtoCorSeg.IDCtoCorSegPai'                , 'IDCtoCorSegPai'            , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumCtoCorSegPai')         , 'CtoCorSegPai.chNumCtoCorSeg'             , 'chNumCtoCorSegPai'         , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaPai')               , 'PapelPessoaPai.IDPessoa'                 , 'IDPessoaPai'               , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaPai')        , 'PessoaPai.inCodTipoPessoa'               , 'inCodTipoPessoaPai'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaPai')        , 'TipoPessoaPai.chDesTipoPessoa'           , 'chDesTipoPessoaPai'        , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoPai')     , 'PessoaPai.inCodTipoDocumento'            , 'inCodTipoDocumentoPai'     , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoPai')     , 'TipoDocumentoPai.chDesTipoDocumento'     , 'chDesTipoDocumentoPai'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inNumIdentifPai')           , 'PessoaPai.inNumIdentificacao'            , 'inNumIdentifPai'           , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePai')                 , 'PessoaPai.chNomePessoa'                  , 'chNomePai'                 , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPapelPai')         , 'PapelPessoaPai.inCodTipoPapel'           , 'inCodTipoPapelPai'         , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPapelPai')         , 'TipoPapelPai.chDesTipoPapel'             , 'chDesTipoPapelPai'         , enum_formatoColuna.texto             , false     , true));

    return colunas;
  }
  /* Formatar Número de Identificação da Pessoa
   * com base no Tipo da Pessoa:
   * 1 - Física   - CPF
   * 2 - Jurídica - CNPJ
   */
  private formatarNumIdentif(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentificacao.toString().length;

    if (obj.inCodTipoDocumento == 1) {
      let cpf =  '0'.repeat(11-qtde) +  obj.inNumIdentificacao.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumento == 2) {
      let cnpj = '0'.repeat(14-qtde) + obj.inNumIdentificacao.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    else {
      identificacao = obj.inNumIdentificacao.toString();
    }
    return identificacao;
  }
}
