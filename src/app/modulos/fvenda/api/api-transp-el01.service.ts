import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelTranspEL01 } from '../models/model-transp-EL01';

@Injectable()
export class ApiTranspEl01Service {

  private url: string = 'fvenda/api/TranspEL01';
  private orderByColumnName: string = 'Transp.inCodTransp';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'Transp.inCodTransp';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTranspEL01): Promise<ModelTranspEL01> {
    return new Promise<ModelTranspEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTranspEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelTranspEL01): Promise<ModelTranspEL01> {
    return new Promise<ModelTranspEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTranspEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelTranspEL01> {
    return new Promise<ModelTranspEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTranspEL01>(url, true)
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

  public obterPorCodigo(inCodTransp: number): Promise<ModelTranspEL01> {
    return new Promise<ModelTranspEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${inCodTransp}`;

        this.apiGatewayService.get<ModelTranspEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTranspEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTranspEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTranspEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-transp-el01.service.ts');
                                                                /* coluna: string      , nomeCampo: string           , propriedade: string  , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDTransp')          , 'Transp.IDTransp'           , 'IDTransp'           , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTransp')       , 'Transp.inCodTransp'        , 'inCodTransp'        , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomAbreviado')    , 'Transp.chNomAbreviado'     , 'chNomAbreviado'     , enum_formatoColuna.texto             , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNome')            , 'Transp.chNome'             , 'chNome'             , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')   , 'TipoPessoa.chDesTipoPessoa', 'chDesTipoPessoa'    , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Transp.inNumIdentificacao' , 'inNumIdentificacao' , enum_formatoColuna.numero_sem_formato, true      , false , 150        , this.formatarCampoDocCliente));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevPais')   , 'Pais.chNomeAbreviado'      , 'chNomeAbrevPais'    , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chSiglaUF')         , 'UF.chSigla'                , 'chSiglaUF'          , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCidade')      , 'Cidade.chNome'             , 'chNomeCidade'       , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDDDTelefone')     , 'Transp.chDDDTelefone'      , 'chDDDTelefone'      , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumTelefone')     , 'Transp.chNumTelefone'      , 'chNumTelefone'      , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chEmail')           , 'Transp.chEmail'            , 'chEmail'            , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCad')  , 'SituacaoCad.chDescricao'   , 'chDesSituacaoCad'   , enum_formatoColuna.texto             , false     , false , false      , 180));

    return colunas;
  }

  private formatarCampoDocCliente(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentificacao.toString().length;

    if (obj.inCodTipoDocumento == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentificacao.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumento == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentificacao.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }
}
