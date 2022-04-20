import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelEstipulante } from '../models/model-estipulante';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiEstipulanteService {
  private url: string = 'eseg/api/EstipulanteEL01';
  private orderByColumnName: string = 'IDPessoa';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoa';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelEstipulante): Promise<ModelEstipulante> {
    return new Promise<ModelEstipulante>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelEstipulante>(this.url, objeto, true)
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

  public alterar(objeto: ModelEstipulante): Promise<ModelEstipulante> {
    return new Promise<ModelEstipulante>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelEstipulante>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelEstipulante> {
    return new Promise<ModelEstipulante>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelEstipulante>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelEstipulante>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelEstipulante>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelEstipulante>>(url, true)
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

  public listarJuridicas(page: number, pageSize: number, filter: string): Promise<Array<ModelEstipulante>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=Pessoa.inCodTipoPessoa~eq~2~AND~${filter}`;
    } else {
      url += `&filter=Pessoa.inCodTipoPessoa~eq~2`;
    }

    return new Promise<Array<ModelEstipulante>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelEstipulante>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-estipulante.service.ts');

    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')          , 'Pessoa.IDPessoa'                 , 'IDPessoa'          , enum_formatoColuna.numero_sem_formato  , true      , false , false      , 100));
    //colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacao', enum_formatoColuna.numero_sem_formato  , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacaoFormatado', enum_formatoColuna.texto  , true      , false , 180,this.formatarCampo));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoa')      , 'Pessoa.chNomePessoa'             , 'chNomePessoa'      , enum_formatoColuna.texto               , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaJuridica')  , 'PessoaJuridica.IDPessoaJuridica' , 'IDPessoaJuridica'  , enum_formatoColuna.numero_sem_formato  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeFantasia')    , 'PessoaJuridica.chNomeFantasia'   , 'chNomeFantasia'    , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chIM')              , 'PessoaJuridica.chIM'             , 'chIM'              , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chIE')              , 'PessoaJuridica.chIE'             , 'chIE'              , enum_formatoColuna.texto               , true      , true));
    // Tipo pessoa
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoa')   , 'Pessoa.inCodTipoPessoa'          , 'inCodTipoPessoa'   , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoa')   , 'TipoPessoa.chDesTipoPessoa'      , 'chDesTipoPessoa'   , enum_formatoColuna.texto               , false     , true));
    // Tipo documento
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumento'), 'Pessoa.inCodTipoDocumento'       , 'inCodTipoDocumento', enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumento'), 'TipoDocumento.chDesTipoDocumento', 'chDesTipoDocumento', enum_formatoColuna.texto               , false     , true));
    //Outros dados
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')     , 'Pessoa.dtDatInclusao'            , 'dtDatInclusao'     , enum_formatoColuna.dataHora            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao') , 'Pessoa.dtDatUltAlteracao'        , 'dtDatUltAlteracao' , enum_formatoColuna.data                , false     , true));

    return colunas;
  }

  
  private formatarCampo(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentificacao.toString().length;
    let cnpj = '0'.repeat(14-qtde) + obj.inNumIdentificacao.toString();
    identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    return identificacao;
  }
}
