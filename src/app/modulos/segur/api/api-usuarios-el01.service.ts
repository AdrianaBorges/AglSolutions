import { Injectable } from '@angular/core';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ModelUsuario } from '../models/model-usuario';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiUsuariosEL01Service {
  private url: string = 'segur/api/UsuarioEL01';//'segur/api/usuario';
  private orderByColumnName: string = 'Usuario.chCodUsuario';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'Usuario.chCodUsuario';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(tipoUsuario: ModelUsuario): Promise<ModelUsuario> {
    return new Promise<ModelUsuario>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelUsuario>(this.url, tipoUsuario, true)
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

  public alterar(tipoUsuario: ModelUsuario): Promise<ModelUsuario> {
    return new Promise<ModelUsuario>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelUsuario>(this.url, tipoUsuario, true)
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

  public excluir(id: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.delete<boolean>(url, true)
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

  public inativar(id: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/inativar/${id}/`;

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

  public reativar(id: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/reativar/${id}/`;

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

  public obter(id: string): Promise<ModelUsuario> {
    return new Promise<ModelUsuario>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelUsuario>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelUsuario>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelUsuario>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelUsuario>>(url, true)
          .then(
            (tipoUsuarios) => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-usuario-el01.service.ts');
                                     /* coluna: string                                   , nomeCampo: string                    , propriedade: string       , formatoColuna               , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuario')              , 'Usuario.chCodUsuario'               , 'chCodUsuario'            , enum_formatoColuna.texto    , true       , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaUsuario')           , 'PapelUsuario.IDPessoa'              , 'IDPessoaUsuario'         , enum_formatoColuna.numero   , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaUsuario')      , 'Usuario.IDPapelPessoaUsuario'       , 'IDPapelPessoaUsuario'    , enum_formatoColuna.numero   , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoaUsuario')       , 'PessoaUsuario.chNomePessoa'         , 'chNomePessoaUsuario'     , enum_formatoColuna.texto    , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuario')             , 'Usuario.chNomeUsuario'              , 'chNomeUsuario'           , enum_formatoColuna.texto    , true       , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chEMail')                   , 'Usuario.chEMail'                    , 'chEMail'                 , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoUsuario')          , 'Usuario.inCodTipoUsuario'           , 'inCodTipoUsuario'        , enum_formatoColuna.numero   , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoUsuario')          , 'TipoUsuario.chDesTipoUsuario'       , 'chDesTipoUsuario'        , enum_formatoColuna.texto    , false      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaVinculada')         , 'PapelVinculada.IDPessoa'            , 'IDPessoaVinculada'       , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaVinculada')    , 'Usuario.IDPapelPessoaVinculada'     , 'IDPapelPessoaVinculada'  , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPapelVinculada')   , 'PapelVinculada.inCodTipoPapel'      , 'inCodTipoPapelVinculada' , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPapelVinculada')   , 'TipoPapelVinculada.chDesTipoPapel'  , 'chDesTipoPapelVinculada' , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoaVinculada')     , 'PessoaVinculada.chNomePessoa'       , 'chNomePessoaVinculada'   , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgAlteraPass1oAcesso')      , 'Usuario.lgAlteraPass1oAcesso'       , 'lgAlteraPass1oAcesso'    , enum_formatoColuna.booleano , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad')          , 'Usuario.inCodSituacaoCad'           , 'inCodSituacaoCad'        , enum_formatoColuna.numero   , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad')          , 'SituacaoCad.chDescricao'            , 'chDesSituacaoCad'        , enum_formatoColuna.texto    , false      , false , false      , 200));

    return colunas;
  }
}