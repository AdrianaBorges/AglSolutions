import { Injectable } from '@angular/core';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelClienteEl02 } from '../models/model-cliente-EL02';

@Injectable()
export class ApiClienteEL02Service {

  private url: string = 'fvenda/api/ClienteEL02';
  private orderByColumnName: string = 'inCodCliente';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inCodCliente';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelClienteEl02): Promise<ModelClienteEl02> {
    return new Promise<ModelClienteEl02>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelClienteEl02>(this.url, objeto, true)
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

  public alterar(objeto: ModelClienteEl02): Promise<ModelClienteEl02> {
    return new Promise<ModelClienteEl02>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelClienteEl02>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelClienteEl02> {
    return new Promise<ModelClienteEl02>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelClienteEl02>(url, true)
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

  public obterPorCodigo(inCodCliente: number): Promise<ModelClienteEl02> {
    return new Promise<ModelClienteEl02>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${inCodCliente}`;

        this.apiGatewayService.get<ModelClienteEl02>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelClienteEl02>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelClienteEl02>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelClienteEl02>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-cliente-venda.service.ts');
                                                                /* coluna: string                   , nomeCampo: string                              , propriedade: string              , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCliente')                      , 'Cliente.IDCliente'                            , 'IDCliente'                      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaCliente')           , 'Cliente.IDPapelPessoaCliente'                 , 'IDPapelPessoaCliente'           , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaCliente')                , 'PapelPessoaCliente.IDPessoa'                  , 'IDPessoaCliente'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaCliente')         , 'PessoaCliente.inCodTipoPessoa'                , 'inCodTipoPessoaCliente'         , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaCliente')         , 'TipoPessoaCliente.chDesTipoPessoa'            , 'chDesTipoPessoaCliente'         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoCliente')      , 'PessoaCliente.inCodTipoDocumento'             , 'inCodTipoDocumentoCliente'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoCliente')      , 'TipoDocumentoCliente.chDesTipoDocumento'      , 'chDesTipoDocumentoCliente'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')                   , 'Cliente.inCodCliente'                         , 'inCodCliente'                   , enum_formatoColuna.numero  , true      , false , false, 100));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente')            , 'PessoaCliente.inNumIdentificacao'             , 'inNumIdentifCliente'            , enum_formatoColuna.numero  , true      , false , 180, this.formatarCampoCliente));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbreviado')                , 'Cliente.chNomeAbreviado'                      , 'chNomeAbreviado'                , enum_formatoColuna.texto   , true      , false , false, 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')                  , 'PessoaCliente.chNomePessoa'                   , 'chNomeCliente'                  , enum_formatoColuna.texto   , true      , false , false, 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCxPostal')                     , 'PessoaCliente.chCxPostal'                     , 'chCxPostal'                     , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaFisica')                 , 'PessoaFisicaCliente.IDPessoaFisica'           , 'IDPessoaFisica'                 , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatNascim')                    , 'PessoaFisicaCliente.daDatNascim'              , 'daDatNascim'                    , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeMae')                      , 'PessoaFisicaCliente.chNomeMae'                , 'chNomeMae'                      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePai')                      , 'PessoaFisicaCliente.chNomePai'                , 'chNomePai'                      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaJuridica')               , 'PessoaJuridicaCliente.IDPessoaJuridica'       , 'IDPessoaJuridica'               , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeFantasia')                 , 'PessoaJuridicaCliente.chNomeFantasia'         , 'chNomeFantasia'                 , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIM')                           , 'PessoaJuridicaCliente.chIM'                   , 'chIM'                           , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIE')                           , 'PessoaJuridicaCliente.chIE'                   , 'chIE'                           , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatFundacao')                  , 'PessoaJuridicaCliente.daDatFundacao'          , 'daDatFundacao'                  , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDClientePai')                   , 'Cliente.IDClientePai'                         , 'IDClientePai'                   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaClientePai')        , 'ClientePai.IDPapelPessoaCliente'              , 'IDPapelPessoaClientePai'        , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaClientePai')             , 'PapelPessoaClientePai.IDPessoa'               , 'IDPessoaClientePai'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaClientePai')      , 'PessoaClientePai.inCodTipoPessoa'             , 'inCodTipoPessoaClientePai'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaClientePai')      , 'TipoPessoaClientePai.chDesTipoPessoa'         , 'chDesTipoPessoaClientePai'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoClientePai')   , 'PessoaClientePai.inCodTipoDocumento'          , 'inCodTipoDocumentoClientePai'   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoClientePai')   , 'TipoDocumentoClientePai.chDesTipoDocumento'   , 'chDesTipoDocumentoClientePai'   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifClientePai')         , 'PessoaClientePai.inNumIdentificacao'          , 'inNumIdentifClientePai'         , enum_formatoColuna.numero  , false     , true  , 180, this.formatarCampoClientePai));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeClientePai')               , 'PessoaClientePai.chNomePessoa'                , 'chNomeClientePai'               , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodClientePai')                , 'ClientePai.inCodCliente'                      , 'inCodClientePai'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevClientePai')          , 'ClientePai.chNomeAbreviado'                   , 'chNomeAbrevClientePai'          , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaPagador')           , 'Cliente.IDPapelPessoaPagador'                 , 'IDPapelPessoaPagador'           , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaPagador')                , 'PapelPessoaPagador.IDPessoa'                  , 'IDPessoaPagador'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaPagador')         , 'PessoaPagador.inCodTipoPessoa'                , 'inCodTipoPessoaPagador'         , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaPagador')         , 'TipoPessoaPagador.chDesTipoPessoa'            , 'chDesTipoPessoaPagador'         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoPagador')      , 'PessoaPagador.inCodTipoDocumento'             , 'inCodTipoDocumentoPagador'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoPagador')      , 'TipoDocumentoPagador.chDesTipoDocumento'      , 'chDesTipoDocumentoPagador'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoPagador')      , 'TipoDocumentoPagador.chDesTipoDocumento'      , 'inNumIdentifPagador'            , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePagador')                  , 'PessoaPagador.chNomePessoa'                   , 'chNomePagador'                  , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDRepresentante')                , 'IDRepresentante'                              , 'IDRepresentante'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaRepresentante')     , 'Representante.IDPapelPessoaRepresentante'     , 'IDPapelPessoaRepresentante'     , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaRepresentante')          , 'PapelPessoaRepresentante.IDPessoa'            , 'IDPessoaRepresentante'          , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaRepresentante')   , 'PessoaRepresentante.inCodTipoPessoa'          , 'inCodTipoPessoaRepresentante'   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaRepresentante')   , 'TipoPessoaRepresentante.chDesTipoPessoa'      , 'chDesTipoPessoaRepresentante'   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoRepresentante'), 'PessoaRepresentante.inCodTipoDocumento'       , 'inCodTipoDocumentoRepresentante', enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoRepresentante'), 'TipoDocumentoRepresentante.chDesTipoDocumento', 'chDesTipoDocumentoRepresentante', enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inNumIdentifRepresentante')      , 'PessoaRepresentante.inNumIdentificacao'       , 'inNumIdentifRepresentante'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')            , 'PessoaRepresentante.chNomePessoa'             , 'chNomeRepresentante'            , enum_formatoColuna.texto   , false     , false , false, 300));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')             , 'Representante.inCodRepresentante'             , 'inCodRepresentante'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentante')       , 'Representante.chNomeAbreviado'                , 'chNomeAbrevRepresentante'       , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSituacaoCad')               , 'Cliente.inCodSituacaoCad'                     , 'inCodSituacaoCad'               , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCad')               , 'SituacaoCad.chDescricao'                      , 'chDesSituacaoCad'               , enum_formatoColuna.texto   , false     , false , false, 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')                , 'Cliente.chDesObservacao'                      , 'chDesObservacao'                , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodGrupoCliente')              , 'Cliente.chCodGrupoCliente'                    , 'chCodGrupoCliente'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesGrupoCliente')              , 'GrupoCliente.chDescricao'                     , 'chDesGrupoCliente'              , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDMicrorregiao')                 , 'Cliente.IDMicrorregiao'                       , 'IDMicrorregiao'                 , enum_formatoColuna.numero  , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodRegiao')                    , 'Microrregiao.chCodRegiao'                     , 'chCodRegiao'                    , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesRegiao')                    , 'Regiao.chDescricao'                           , 'chDesRegiao'                    , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodMicrorregiao')              , 'Microrregiao.chCodMicrorregiao'               , 'chCodMicrorregiao'              , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMicrorregiao')              , 'Microrregiao.chDescricao'                     , 'chDesMicrorregiao'              , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCanalVenda')                , 'Cliente.chCodCanalVenda'                      , 'chCodCanalVenda'                , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCanalVenda')                , 'CanalVenda.chDescricao'                       , 'chDesCanalVenda'                , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('lgPermComunic')                  , 'Cliente.lgPermComunic'                        , 'lgPermComunic'                  , enum_formatoColuna.booleano, false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSuframa')                   , 'Cliente.chDesSuframa'                         , 'chDesSuframa'                   , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValLimCredito')                , 'Cliente.deValLimCredito'                      , 'deValLimCredito'                , enum_formatoColuna.moeda   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatExpLimCredito')             , 'Cliente.daDatExpLimCredito'                   , 'daDatExpLimCredito'             , enum_formatoColuna.data    , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDClienteVenda')                 , 'ClienteVenda.IDClienteVenda'                  , 'IDClienteVenda'                 , enum_formatoColuna.numero  , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCondPagtoVenda')            , 'ClienteVenda.chCodCondPagtoVenda'             , 'chCodCondPagtoVenda'            , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCondPagtoVenda')            , 'CondPagtoVenda.chDesCondPagtoVenda'           , 'chDesCondPagtoVenda'            , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCondicao')                     , 'CondPagtoVenda.chCondicao'                    , 'chCondicao'                     , enum_formatoColuna.texto   , false     , true));    
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')                  , 'Cliente.dtDatInclusao'                        , 'dtDatInclusao'                  , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao')              , 'Cliente.dtDatUltAlteracao'                    , 'dtDatUltAlteracao'              , enum_formatoColuna.dataHora, false     , true));


    return colunas;
  }



  private formatarCampoCliente(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentifCliente.toString().length;

    if (obj.inCodTipoDocumentoCliente == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifCliente.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumentoCliente == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifCliente.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }


  private formatarCampoClientePai(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentifClientePai.toString().length;

    if (obj.inCodTipoDocumentoClientePai == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifClientePai.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumentoClientePai == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifClientePai.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }
}
