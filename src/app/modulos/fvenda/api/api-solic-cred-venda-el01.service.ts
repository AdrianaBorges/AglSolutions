import { Injectable } from '@angular/core';
import { ModelSolicCredVendaEL01 } from '../models/model-solic-cred-venda-EL01';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiSolicCredVendaEL01Service {

  private url: string = 'fvenda/api/SolicCredVendaEL01';
  private orderByColumnName: string = 'IDSolicCredVenda';
  private sortType: string = 'asc';
  private inCodSituacaoSolicCred: number = undefined;
  private chCodUsuarioAprov: string = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDSolicCredVenda';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSolicCredVendaEL01): Promise<ModelSolicCredVendaEL01> {
    return new Promise<ModelSolicCredVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSolicCredVendaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelSolicCredVendaEL01): Promise<ModelSolicCredVendaEL01> {
    return new Promise<ModelSolicCredVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSolicCredVendaEL01>(this.url, objeto, true)
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

  public solicitarAprova(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/SolicitarAprova/${id}`;

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

  public atualizarInfo(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/AtualizarInformacao/${id}`;

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

  public obter(id: number): Promise<ModelSolicCredVendaEL01> {
    return new Promise<ModelSolicCredVendaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSolicCredVendaEL01>(url, true)
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

  public getTnCodSituacaoSolicCred() {
    return this.inCodSituacaoSolicCred;
  }

  public setInCodSituacaoSolicCred(_inCodSituacaoSolicCred: number) {
    this.inCodSituacaoSolicCred = _inCodSituacaoSolicCred;
  }

  public getChCodUsuarioAprov() {
    return this.chCodUsuarioAprov;
  }

  public setChCodUsuarioAprov(_chCodUsuarioAprov: string) {
    this.chCodUsuarioAprov = _chCodUsuarioAprov;
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSolicCredVendaEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de pessoa por padrão
    if (this.inCodSituacaoSolicCred) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `SolicCredVenda.inCodSituacaoSolicCred~eq~${this.inCodSituacaoSolicCred}`;
    }

    /*
    if (this.chCodUsuarioAprov) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `SolicCredVenda.chCodUsuarioAprov~eq~'${this.chCodUsuarioAprov}'`;
    }
    */


    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSolicCredVendaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSolicCredVendaEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-solicita-credito.service.ts');
                                                                /* coluna: string                   , nomeCampo: string                              , propriedade: string              , formatoColuna              , filterable, hidden, detalheGrid, width */
    // mostra na grid
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDSolicCredVenda')               , 'SolicCredVenda.IDSolicCredVenda'              , 'IDSolicCredVenda'               , enum_formatoColuna.numero  , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatSolic')                     , 'SolicCredVenda.dtDatSolic'                    , 'dtDatSolic'                     , enum_formatoColuna.data    , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente')            , 'SolicCredVenda.inNumIdentifCliente'           , 'inNumIdentifCliente'            , enum_formatoColuna.numero  , true      , false              , 150, this.formatarCampoCliente));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')                   , 'Cliente.inCodCliente'                         , 'inCodCliente'                   , enum_formatoColuna.numero  , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevCliente')             , 'Cliente.chNomeAbreviado'                      , 'chNomeAbrevCliente'             , enum_formatoColuna.texto   , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')                  , 'SolicCredVenda.chNomeCliente'                 , 'chNomeCliente'                  , enum_formatoColuna.texto   , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentante')       , 'Representante.chNomeAbreviado'                , 'chNomeAbrevRepresentante'       , enum_formatoColuna.texto   , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValCredSolic')                 , 'SolicCredVenda.deValCredSolic'                , 'deValCredSolic'                 , enum_formatoColuna.moeda   , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoSolicCred')         , 'SituacaoSolicCred.chDescricao'                , 'chDesSituacaoSolicCred'         , enum_formatoColuna.numero  , false     , false , false      , 250));
    // outras colunas
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValLimCreditoCliente')         , 'Cliente.deValLimCredito'                      , 'deValLimCreditoCliente'         , enum_formatoColuna.moeda   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCondicao')                     , 'CondPagtoVenda.chCondicao'                    , 'chCondicao'                     , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValPedVenda')                  , 'SolicCredVenda.deValPedVenda'                 , 'deValPedVenda'                  , enum_formatoColuna.moeda   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDInfoSerasa')                   , 'SolicCredVenda.IDInfoSerasa'                  , 'IDInfoSerasa'                   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltConsultaSerasa')         , 'InfoSerasa.dtDatUltConsulta'                  , 'dtDatUltConsultaSerasa'         , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesInfoERP')                   , 'SolicCredVenda.chDesInfoERP'                  , 'chDesInfoERP'                   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodUsuarioAprov')              , 'SolicCredVenda.chCodUsuarioAprov'             , 'chCodUsuarioAprov'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValCredAprov')                 , 'SolicCredVenda.deValCredAprov'                , 'deValCredAprov'                 , enum_formatoColuna.moeda   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodMotivoRejeita')             , 'SolicCredVenda.inCodMotivoRejeita'            , 'inCodMotivoRejeita'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMotivoRejeita')             , 'MotivoRejeita.chDescricao'                    , 'chDesMotivoRejeita'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMotivo')                    , 'SolicCredVenda.chDesMotivo'                   , 'chDesMotivo'                    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')                  , 'SolicCredVenda.dtDatInclusao'                 , 'dtDatInclusao'                  , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao')              , 'SolicCredVenda.dtDatUltAlteracao'             , 'dtDatUltAlteracao'              , enum_formatoColuna.dataHora, false     , true));
    /*
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodUsuarioSolic')              , 'SolicCredVenda.chCodUsuarioSolic'             , 'chCodUsuarioSolic'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioSolic')             , 'UsuarioSolic.chNomeUsuario'                   , 'chNomeUsuarioSolic'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chEMailUsuarioSolic')            , 'UsuarioSolic.chEMail'                         , 'chEMailUsuarioSolic'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDClienteVenda')                 , 'SolicCredVenda.IDClienteVenda'                , 'IDClienteVenda'                 , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCliente')                      , 'ClienteVenda.IDCliente'                       , 'IDCliente'                      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaCliente')           , 'Cliente.IDPapelPessoaCliente'                 , 'IDPapelPessoaCliente'           , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaCliente')                , 'PapelPessoaCliente.IDPessoa'                  , 'IDPessoaCliente'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoa')                , 'SolicCredVenda.inCodTipoPessoa'               , 'inCodTipoPessoa'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')                , 'TipoPessoaCliente.chDesTipoPessoa'            , 'chDesTipoPessoa'                , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumento')             , 'SolicCredVenda.inCodTipoDocumento'            , 'inCodTipoDocumento'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumento')             , 'TipoDocumentoCliente.chDesTipoDocumento'      , 'chDesTipoDocumento'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatExpLimCreditoCliente')      , 'Cliente.daDatExpLimCredito'                   , 'daDatExpLimCreditoCliente'      , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCondPagtoCliente')          , 'ClienteVenda.chCodCondPagtoVenda'             , 'chCodCondPagtoCliente'          , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCondPagtoCliente')          , 'CondPagtoCliente.chDescricao'                 , 'chDesCondPagtoCliente'          , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCondicaoCliente')              , 'CondPagtoCliente.chCondicao'                  , 'chCondicaoCliente'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDRepresentante')                , 'SolicCredVenda.IDRepresentante'               , 'IDRepresentante'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaRepresentante')     , 'Representante.IDPapelPessoaRepresentante'     , 'IDPapelPessoaRepresentante'     , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaRepresentante')          , 'PapelPessoaRepresentante.IDPessoa'            , 'IDPessoaRepresentante'          , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaRepresentante')   , 'PessoaRepresentante.inCodTipoPessoa'          , 'inCodTipoPessoaRepresentante'   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaRepresentante')   , 'TipoPessoaRepresentante.chDesTipoPessoa'      , 'chDesTipoPessoaRepresentante'   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoRepresentante'), 'PessoaRepresentante.inCodTipoDocumento'       , 'inCodTipoDocumentoRepresentante', enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoRepresentante'), 'TipoDocumentoRepresentante.chDesTipoDocumento', 'chDesTipoDocumentoRepresentante', enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inNumIdentifRepresentante')      , 'PessoaRepresentante.inNumIdentificacao'       , 'inNumIdentifRepresentante'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')            , 'PessoaRepresentante.chNomePessoa'             , 'chNomeRepresentante'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')             , 'Representante.inCodRepresentante'             , 'inCodRepresentante'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCondPagtoVenda')            , 'SolicCredVenda.chCodCondPagtoVenda'           , 'chCodCondPagtoVenda'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCondPagtoVenda')            , 'CondPagtoVenda.chDescricao'                   , 'chDesCondPagtoVenda'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioAprov')             , 'UsuarioAprov.chNomeUsuario'                   , 'chNomeUsuarioAprov'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chEMailUsuarioAprov')            , 'UsuarioAprov.chEMail'                         , 'chEMailUsuarioAprov'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')                , 'SolicCredVenda.chDesObservacao'               , 'chDesObservacao'                , enum_formatoColuna.texto   , false     , true));
    */
    return colunas;
  }

  public getColunasAguardandoAprovacaoGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-solicita-credito.service.ts');
                                                                /* coluna: string                   , nomeCampo: string                              , propriedade: string              , formatoColuna              , filterable, hidden, detalheGrid, width */
    // mostra na grid
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDSolicCredVenda')               , 'SolicCredVenda.IDSolicCredVenda'              , 'IDSolicCredVenda'               , enum_formatoColuna.numero  , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatSolic')                     , 'SolicCredVenda.dtDatSolic'                    , 'dtDatSolic'                     , enum_formatoColuna.data    , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente')            , 'SolicCredVenda.inNumIdentifCliente'           , 'inNumIdentifCliente'            , enum_formatoColuna.numero  , true      , false              , 150, this.formatarCampoCliente));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')                   , 'Cliente.inCodCliente'                         , 'inCodCliente'                   , enum_formatoColuna.numero  , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevCliente')             , 'Cliente.chNomeAbreviado'                      , 'chNomeAbrevCliente'             , enum_formatoColuna.texto   , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')                  , 'SolicCredVenda.chNomeCliente'                 , 'chNomeCliente'                  , enum_formatoColuna.texto   , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentante')       , 'Representante.chNomeAbreviado'                , 'chNomeAbrevRepresentante'       , enum_formatoColuna.texto   , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValCredSolic')                 , 'SolicCredVenda.deValCredSolic'                , 'deValCredSolic'                 , enum_formatoColuna.moeda   , false     , false , false      , 150));
    // outras colunas
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoSolicCred')         , 'SituacaoSolicCred.chDescricao'                , 'chDesSituacaoSolicCred'         , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValLimCreditoCliente')         , 'Cliente.deValLimCredito'                      , 'deValLimCreditoCliente'         , enum_formatoColuna.moeda   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCondicao')                     , 'CondPagtoVenda.chCondicao'                    , 'chCondicao'                     , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValPedVenda')                  , 'SolicCredVenda.deValPedVenda'                 , 'deValPedVenda'                  , enum_formatoColuna.moeda   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDInfoSerasa')                   , 'SolicCredVenda.IDInfoSerasa'                  , 'IDInfoSerasa'                   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltConsultaSerasa')         , 'InfoSerasa.dtDatUltConsulta'                  , 'dtDatUltConsultaSerasa'         , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesInfoERP')                   , 'SolicCredVenda.chDesInfoERP'                  , 'chDesInfoERP'                   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')                  , 'SolicCredVenda.dtDatInclusao'                 , 'dtDatInclusao'                  , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao')              , 'SolicCredVenda.dtDatUltAlteracao'             , 'dtDatUltAlteracao'              , enum_formatoColuna.dataHora, false     , true));
    /*
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodUsuarioSolic')              , 'SolicCredVenda.chCodUsuarioSolic'             , 'chCodUsuarioSolic'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioSolic')             , 'UsuarioSolic.chNomeUsuario'                   , 'chNomeUsuarioSolic'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chEMailUsuarioSolic')            , 'UsuarioSolic.chEMail'                         , 'chEMailUsuarioSolic'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDClienteVenda')                 , 'SolicCredVenda.IDClienteVenda'                , 'IDClienteVenda'                 , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCliente')                      , 'ClienteVenda.IDCliente'                       , 'IDCliente'                      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaCliente')           , 'Cliente.IDPapelPessoaCliente'                 , 'IDPapelPessoaCliente'           , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaCliente')                , 'PapelPessoaCliente.IDPessoa'                  , 'IDPessoaCliente'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoa')                , 'SolicCredVenda.inCodTipoPessoa'               , 'inCodTipoPessoa'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')                , 'TipoPessoaCliente.chDesTipoPessoa'            , 'chDesTipoPessoa'                , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumento')             , 'SolicCredVenda.inCodTipoDocumento'            , 'inCodTipoDocumento'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumento')             , 'TipoDocumentoCliente.chDesTipoDocumento'      , 'chDesTipoDocumento'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatExpLimCreditoCliente')      , 'Cliente.daDatExpLimCredito'                   , 'daDatExpLimCreditoCliente'      , enum_formatoColuna.data    , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCondPagtoCliente')          , 'ClienteVenda.chCodCondPagtoVenda'             , 'chCodCondPagtoCliente'          , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCondPagtoCliente')          , 'CondPagtoCliente.chDescricao'                 , 'chDesCondPagtoCliente'          , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCondicaoCliente')              , 'CondPagtoCliente.chCondicao'                  , 'chCondicaoCliente'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDRepresentante')                , 'SolicCredVenda.IDRepresentante'               , 'IDRepresentante'                , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaRepresentante')     , 'Representante.IDPapelPessoaRepresentante'     , 'IDPapelPessoaRepresentante'     , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaRepresentante')          , 'PapelPessoaRepresentante.IDPessoa'            , 'IDPessoaRepresentante'          , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaRepresentante')   , 'PessoaRepresentante.inCodTipoPessoa'          , 'inCodTipoPessoaRepresentante'   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaRepresentante')   , 'TipoPessoaRepresentante.chDesTipoPessoa'      , 'chDesTipoPessoaRepresentante'   , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoRepresentante'), 'PessoaRepresentante.inCodTipoDocumento'       , 'inCodTipoDocumentoRepresentante', enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoRepresentante'), 'TipoDocumentoRepresentante.chDesTipoDocumento', 'chDesTipoDocumentoRepresentante', enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inNumIdentifRepresentante')      , 'PessoaRepresentante.inNumIdentificacao'       , 'inNumIdentifRepresentante'      , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')            , 'PessoaRepresentante.chNomePessoa'             , 'chNomeRepresentante'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')             , 'Representante.inCodRepresentante'             , 'inCodRepresentante'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCondPagtoVenda')            , 'SolicCredVenda.chCodCondPagtoVenda'           , 'chCodCondPagtoVenda'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCondPagtoVenda')            , 'CondPagtoVenda.chDescricao'                   , 'chDesCondPagtoVenda'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioAprov')             , 'UsuarioAprov.chNomeUsuario'                   , 'chNomeUsuarioAprov'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chEMailUsuarioAprov')            , 'UsuarioAprov.chEMail'                         , 'chEMailUsuarioAprov'            , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodUsuarioAprov')              , 'SolicCredVenda.chCodUsuarioAprov'             , 'chCodUsuarioAprov'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValCredAprov')                 , 'SolicCredVenda.deValCredAprov'                , 'deValCredAprov'                 , enum_formatoColuna.moeda   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodMotivoRejeita')             , 'SolicCredVenda.inCodMotivoRejeita'            , 'inCodMotivoRejeita'             , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMotivoRejeita')             , 'MotivoRejeita.chDescricao'                    , 'chDesMotivoRejeita'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMotivo')                    , 'SolicCredVenda.chDesMotivo'                   , 'chDesMotivo'                    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')                , 'SolicCredVenda.chDesObservacao'               , 'chDesObservacao'                , enum_formatoColuna.texto   , false     , true));
    */
    return colunas;
  }

  private formatarCampoCliente(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentifCliente.toString().length;

    if (obj.inCodTipoDocumento == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifCliente.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumento == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifCliente.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }
}
