import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelAssTecnicaEL01 } from '../models/model-ass-tecnica-EL01';

@Injectable()
export class ApiAssTecnicaEL01Service {

  private url: string = 'fvenda/api/AssTecnicaEL01';
  private orderByColumnName: string = 'IDAssTecnica';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDAssTecnica';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelAssTecnicaEL01): Promise<ModelAssTecnicaEL01> {
    return new Promise<ModelAssTecnicaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelAssTecnicaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelAssTecnicaEL01): Promise<ModelAssTecnicaEL01> {
    return new Promise<ModelAssTecnicaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelAssTecnicaEL01>(this.url, objeto, true)
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

  public cancelar(model: ModelAssTecnicaEL01): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/cancelar/${model.IDAssTecnica}`;

        this.apiGatewayService.put<boolean>(url, model, true)
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

  public obter(id: number): Promise<ModelAssTecnicaEL01> {
    return new Promise<ModelAssTecnicaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelAssTecnicaEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelAssTecnicaEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelAssTecnicaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelAssTecnicaEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ass-tecnica.service.ts');
                                                          /* coluna: string                   , nomeCampo: string                              , propriedade: string              , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssTecnica')                   , 'AssTecnica.IDAssTecnica'                      , 'IDAssTecnica'                   , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDEstabelec')                    , 'AssTecnica.IDEstabelec'                       , 'IDEstabelec'                    , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEstabelec')                 , 'Estabelec.chCodEstabelec'                     , 'chCodEstabelec'                 , enum_formatoColuna.texto             , false     , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevEstabelec')            , 'Estabelec.chNomeAbreviado'                    , 'chNomAbrevEstabelec'            , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeEstabelec')                , 'Estabelec.chNome'                             , 'chNomeEstabelec'                , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumAssTecnica')                , 'AssTecnica.inNumAssTecnica'                   , 'inNumAssTecnica'                , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoAssTec')            , 'AssTecnica.inCodSituacaoAssTec'               , 'inCodSituacaoAssTec'            , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoAssTec')            , 'SituacaoAssTec.chDescricao'                   , 'chDesSituacaoAssTec'            , enum_formatoColuna.texto             , false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoAssTec')                , 'AssTecnica.inCodTipoAssTec'                   , 'inCodTipoAssTec'                , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoAssTec')                , 'TipoAssTec.chDescricao'                       , 'chDesTipoAssTec'                , enum_formatoColuna.texto             , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodOrigemAssTec')              , 'AssTecnica.inCodOrigemAssTec'                 , 'inCodOrigemAssTec'              , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesOrigemAssTec')              , 'OrigemAssTec.chDescricao'                     , 'chDesOrigemAssTec'              , enum_formatoColuna.texto             , false     , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatAbertura')                  , 'AssTecnica.dtDatAbertura'                     , 'dtDatAbertura'                  , enum_formatoColuna.dataHora          , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDClienteVenda')                 , 'AssTecnica.IDClienteVenda'                    , 'IDClienteVenda'                 , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCliente')                      , 'ClienteVenda.IDCliente'                       , 'IDCliente'                      , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaCliente')           , 'Cliente.IDPapelPessoaCliente'                 , 'IDPapelPessoaCliente'           , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaCliente')                , 'PapelPessoaCliente.IDPessoa'                  , 'IDPessoaCliente'                , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaCliente')         , 'PessoaCliente.inCodTipoPessoa'                , 'inCodTipoPessoaCliente'         , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaCliente')         , 'TipoPessoaCliente.chDesTipoPessoa'            , 'chDesTipoPessoaCliente'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoCliente')      , 'PessoaCliente.inCodTipoDocumento'             , 'inCodTipoDocumentoCliente'      , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoCliente')      , 'TipoDocumentoCliente.chDesTipoDocumento'      , 'chDesTipoDocumentoCliente'      , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifCliente')            , 'PessoaCliente.inNumIdentificacao'             , 'inNumIdentifCliente'            , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodCliente')                   , 'Cliente.inCodCliente'                         , 'inCodCliente'                   , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevCliente')              , 'Cliente.chNomeAbreviado'                      , 'chNomAbrevCliente'              , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeCliente')                  , 'PessoaCliente.chNomePessoa'                   , 'chNomeCliente'                  , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomContatoCliente')            , 'AssTecnica.chNomContatoCliente'               , 'chNomContatoCliente'            , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedCliente')                , 'AssTecnica.chNumPedCliente'                   , 'chNumPedCliente'                , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDRepresentante')                , 'AssTecnica.IDRepresentante'                   , 'IDRepresentante'                , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaRepresentante')     , 'Representante.IDPapelPessoaRepresentante'     , 'IDPapelPessoaRepresentante'     , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaRepresentante')          , 'PapelPessoaRepresentante.IDPessoa'            , 'IDPessoaRepresentante'          , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaRepresentante')   , 'PessoaRepresentante.inCodTipoPessoa'          , 'inCodTipoPessoaRepresentante'   , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaRepresentante')   , 'TipoPessoaRepresentante.chDesTipoPessoa'      , 'chDesTipoPessoaRepresentante'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoRepresentante'), 'PessoaRepresentante.inCodTipoDocumento'       , 'inCodTipoDocumentoRepresentante', enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoRepresentante'), 'TipoDocumentoRepresentante.chDesTipoDocumento', 'chDesTipoDocumentoRepresentante', enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifRepresentante')      , 'PessoaRepresentante.inNumIdentificacao'       , 'inNumIdentifRepresentante'      , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeRepresentante')            , 'PessoaRepresentante.chNomePessoa'             , 'chNomeRepresentante'            , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRepresentante')             , 'Representante.inCodRepresentante'             , 'inCodRepresentante'             , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevRepresentante')       , 'Representante.chNomeAbreviado'                , 'chNomeAbrevRepresentante'       , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoTecnico')               , 'Tecnico.inCodTipoTecnico'                     , 'inCodTipoTecnico'               , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoTecnico')               , 'TipoTecnico.chDescricao'                      , 'chDesTipoTecnico'               , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaTecnico')           , 'Tecnico.IDPapelPessoaTecnico'                 , 'IDPapelPessoaTecnico'           , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaTecnico')                , 'PapelPessoaTecnico.IDPessoa'                  , 'IDPessoaTecnico'                , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaTecnico')         , 'PessoaTecnico.inCodTipoPessoa'                , 'inCodTipoPessoaTecnico'         , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaTecnico')         , 'TipoPessoaTecnico.chDesTipoPessoa'            , 'chDesTipoPessoaTecnico'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumentoTecnico')      , 'PessoaTecnico.inCodTipoDocumento'             , 'inCodTipoDocumentoTecnico'      , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumentoTecnico')      , 'TipoDocumentoTecnico.chDesTipoDocumento'      , 'chDesTipoDocumentoTecnico'      , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentifTecnico')            , 'PessoaTecnico.inNumIdentificacao'             , 'inNumIdentifTecnico'            , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeTecnico')                  , 'PessoaTecnico.chNomePessoa'                   , 'chNomeTecnico'                  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumAtendExt')                  , 'AssTecnica.chNumAtendExt'                     , 'chNumAtendExt'                  , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumNFVendaFinal')              , 'AssTecnica.chNumNFVendaFinal'                 , 'chNumNFVendaFinal'              , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatVendaFinal')                , 'AssTecnica.daDatVendaFinal'                   , 'daDatVendaFinal'                , enum_formatoColuna.data              , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSerieNFEntrada')            , 'AssTecnica.chCodSerieNFEntrada'               , 'chCodSerieNFEntrada'            , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumNFEntrada')                 , 'AssTecnica.chNumNFEntrada'                    , 'chNumNFEntrada'                 , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatEmisNFEntrada')             , 'AssTecnica.daDatEmisNFEntrada'                , 'daDatEmisNFEntrada'             , enum_formatoColuna.data              , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatRecebItem')                 , 'AssTecnica.dtDatRecebItem'                    , 'dtDatRecebItem'                 , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')                , 'AssTecnica.chDesObservacao'                   , 'chDesObservacao'                , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesMotivoCanc')                , 'AssTecnica.chDesMotivoCanc'                   , 'chDesMotivoCanc'                , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')                  , 'AssTecnica.dtDatInclusao'                     , 'dtDatInclusao'                  , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioInclusao')           , 'AssTecnica.chCodUsuarioInclusao'              , 'chCodUsuarioInclusao'           , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioInclusao')          , 'UsuarioInclusao.chNomeUsuario'                , 'chNomeUsuarioInclusao'          , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')              , 'AssTecnica.dtDatUltAlteracao'                 , 'dtDatUltAlteracao'              , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioAlteracao')          , 'AssTecnica.chCodUsuarioAlteracao'             , 'chCodUsuarioAlteracao'          , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioAlteracao')         , 'UsuarioAlteracao.chNomeUsuario'               , 'chCodUsuarioAlteracao'          , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatEncerram')                  , 'AssTecnica.dtDatEncerram'                     , 'dtDatEncerram'                  , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuarioEncerram')           , 'AssTecnica.chCodUsuarioEncerram'              , 'chCodUsuarioEncerram'           , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuarioEncerram')          , 'UsuarioEncerram.chNomeUsuario'                , 'chNomeUsuarioEncerram'          , enum_formatoColuna.texto             , true      , true));

    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDTecnico')                      , 'AssTecnica.IDTecnico'                         , 'IDTecnico'                      , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTecnico')                   , 'Tecnico.inCodTecnico'                         , 'inCodTecnico'                   , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevTecnico')              , 'Tecnico.chNomAbreviado'                       , 'chNomAbrevTecnico'              , enum_formatoColuna.texto             , true      , true));
    return colunas;
  }
}
