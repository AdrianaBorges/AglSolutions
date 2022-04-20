import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelRepresVendaEL01 } from '../models/model-repres-venda-EL01';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiRepresVendaEL01Service {
  private url: string = 'fvenda/api/RepresVendaEL01';
  private orderByColumnName: string = 'inCodRepresentante';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inCodRepresentante';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelRepresVendaEL01): Promise<ModelRepresVendaEL01> {
    return new Promise<ModelRepresVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelRepresVendaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelRepresVendaEL01): Promise<ModelRepresVendaEL01> {
    return new Promise<ModelRepresVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelRepresVendaEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelRepresVendaEL01> {
    return new Promise<ModelRepresVendaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelRepresVendaEL01>(url, true)
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

  public obterPorCodigo(inCodRepresentante: number): Promise<ModelRepresVendaEL01> {
    return new Promise<ModelRepresVendaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${inCodRepresentante}`;

        this.apiGatewayService.get<ModelRepresVendaEL01>(url, true)
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
  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelRepresVendaEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelRepresVendaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelRepresVendaEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-repres-venda.service.ts');
                                                                /* coluna: string                      , nomeCampo: string                                 , propriedade: string                 , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDRepresentante')                   , 'Representante.IDRepresentante'                   , 'IDRepresentante'                   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaRepresentante')        , 'Representante.IDPapelPessoaRepresentante'        , 'IDPapelPessoaRepresentante'        , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaRepresentante')             , 'PapelPessoaRepresentante.IDPessoa'               , 'IDPessoaRepresentante'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaRepresentante')      , 'PessoaRepresentante.inCodTipoPessoa'             , 'inCodTipoPessoaRepresentante'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaRepresentante')      , 'TipoPessoaRepresentante.chDesTipoPessoa'         , 'chDesTipoPessoaRepresentante'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoRepresentante')   , 'PessoaRepresentante.inCodTipoDocumento'          , 'inCodTipoDocumentoRepresentante'   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoRepresentante')   , 'TipoDocumentoRepresentante.chDesTipoDocumento'   , 'chDesTipoDocumentoRepresentante'   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')                , 'Representante.inCodRepresentante'                , 'inCodRepresentante'                , enum_formatoColuna.numero  , true      , false , false, 100));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifRepresentante')         , 'PessoaRepresentante.inNumIdentificacao'          , 'inNumIdentifRepresentante'         , enum_formatoColuna.numero  , true      , false , 180, this.formatarCampoRepresentante));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbreviado')                   , 'Representante.chNomeAbreviado'                   , 'chNomeAbreviado'                   , enum_formatoColuna.texto   , true      , false , false, 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')               , 'PessoaRepresentante.chNomePessoa'                , 'chNomeRepresentante'               , enum_formatoColuna.texto   , true      , false , false, 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoRepresentante')            , 'Representante.inCodTipoRepresentante'            , 'inCodTipoRepresentante'            , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoRepresentante')            , 'TipoRepresentante.chDescricao'                   , 'chDesTipoRepresentante'            , enum_formatoColuna.texto   , false     , false , false, 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCxPostal')                        , 'PessoaRepresentante.chCxPostal'                  , 'chCxPostal'                        , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaFisica')                    , 'PessoaFisicaRepresentante.IDPessoaFisica'        , 'IDPessoaFisica'                    , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatNascim')                       , 'PessoaFisicaRepresentante.daDatNascim'           , 'daDatNascim'                       , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeMae')                         , 'PessoaFisicaRepresentante.chNomeMae'             , 'chNomeMae'                         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePai')                         , 'PessoaFisicaRepresentante.chNomePai'             , 'chNomePai'                         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaJuridica')                  , 'PessoaJuridicaRepresentante.IDPessoaJuridica'    , 'IDPessoaJuridica'                  , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeFantasia')                    , 'PessoaJuridicaRepresentante.chNomeFantasia'      , 'chNomeFantasia'                    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIM')                              , 'PessoaJuridicaRepresentante.chIM'                , 'chIM'                              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIE')                              , 'PessoaJuridicaRepresentante.chIE'                , 'chIE'                              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatFundacao')                     , 'PessoaJuridicaRepresentante.daDatFundacao'       , 'daDatFundacao'                     , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDRepresentantePai')                , 'Representante.IDRepresentantePai'                , 'IDRepresentantePai'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaRepresentantePai')     , 'RepresentantePai.IDPapelPessoaRepresentante'     , 'IDPapelPessoaRepresentantePai'     , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaRepresentantePai')          , 'PapelPessoaRepresentantePai.IDPessoa'            , 'IDPessoaRepresentantePai'          , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaRepresentantePai')   , 'PessoaRepresentantePai.inCodTipoPessoa'          , 'inCodTipoPessoaRepresentantePai'   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaRepresentantePai')   , 'TipoPessoaRepresentantePai.chDesTipoPessoa'      , 'chDesTipoPessoaRepresentantePai'   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoRepresentantePai'), 'PessoaRepresentantePai.inCodTipoDocumento'       , 'inCodTipoDocumentoRepresentantePai', enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoRepresentantePai'), 'TipoDocumentoRepresentantePai.chDesTipoDocumento', 'chDesTipoDocumentoRepresentantePai', enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifRepresentantePai')      , 'PessoaRepresentantePai.inNumIdentificacao'       , 'inNumIdentifRepresentantePai'      , enum_formatoColuna.numero  , false     , true, 180, this.formatarCampoRepresentantePai));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentantePai')            , 'PessoaRepresentantePai.chNomePessoa'             , 'chNomeRepresentantePai'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoRepresentantePai')         , 'RepresentantePai.inCodTipoRepresentante'         , 'inCodTipoRepresentantePai'         , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoRepresentantePai')         , 'TipoRepresentantePai.chDescricao'                , 'chDesTipoRepresentantePai'         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentantePai')             , 'RepresentantePai.inCodRepresentante'             , 'inCodRepresentantePai'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentantePai')       , 'RepresentantePai.chNomeAbreviado'                , 'chNomeAbrevRepresentantePai'       , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSituacaoCad')                  , 'Representante.inCodSituacaoCad'                  , 'inCodSituacaoCad'                  , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCad')                  , 'SituacaoCad.chDescricao'                         , 'chDesSituacaoCad'                  , enum_formatoColuna.texto   , false     , false, false, 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')                   , 'Representante.chDesObservacao'                   , 'chDesObservacao'                   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')                     , 'Representante.dtDatInclusao'                     , 'dtDatInclusao'                     , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao')                 , 'Representante.dtDatUltAlteracao'                 , 'dtDatUltAlteracao'                 , enum_formatoColuna.dataHora, false     , true));

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

