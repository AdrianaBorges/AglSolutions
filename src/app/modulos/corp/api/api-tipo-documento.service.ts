import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelTipoDocumento } from '../models/model-tipo-documento';

@Injectable()
export class ApiTipoDocumentoService implements InterfaceColunasGrid {
  private url: string = 'corp/api/TipoDocumento';
  private orderByColumnName: string = 'inCodTipoDocumento';
  private sortType: string = 'asc';
  private inCodTipoPessoa: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public getInCodTipoPessoa() {
    return this.inCodTipoPessoa;
  }
  public setInCodTipoPessoa(id) {
    return this.inCodTipoPessoa = id;
  }
  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inCodTipoDocumento';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoDocumento): Promise<ModelTipoDocumento> {
    return new Promise<ModelTipoDocumento>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTipoDocumento>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoDocumento): Promise<ModelTipoDocumento> {
    return new Promise<ModelTipoDocumento>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTipoDocumento>(this.url, objeto, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoDocumento>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //para ser exibido em um select precisa ter uma paginação
    //então forço aqui uma paginação para trazer todos os registros para o select
    if (page == 0) {
      page = 1;
      pageSize = 1000;
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoDocumento>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTipoDocumento>>(url, true)
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

  public listarDocPrinc(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoDocumento>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //para ser exibido em um select precisa ter uma paginação
    //então forço aqui uma paginação para trazer todos os registros para o select
    if (page == 0) {
      page = 1;
      pageSize = 1000;
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=inCodTipoDocumento~gte~1~and~inCodTipoDocumento~lte~2~and~${filter}`;
    } else {
      url += `&filter=inCodTipoDocumento~gte~1~and~inCodTipoDocumento~lte~2`;
    }

    return new Promise<Array<ModelTipoDocumento>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTipoDocumento>>(url, true)
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

  public obter(id: number): Promise<ModelTipoDocumento> {
    return new Promise<ModelTipoDocumento>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoDocumento>(url, true)
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


  public obterDocCompl(): Promise<Array<ModelTipoDocumento>> {
    //id = inCodTipoPessoa
    return new Promise<Array<ModelTipoDocumento>>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetDocCompl/${this.inCodTipoPessoa}`;

        this.apiGatewayService.get<Array<ModelTipoDocumento>>(url, true)
          .then(
            lista_objetos => {
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-tipo-documento.service.ts');
    /* coluna: string                           , nomeCampo: string   , propriedade: string , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumento'), 'inCodTipoDocumento', 'inCodTipoDocumento', enum_formatoColuna.numero, true, false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumento'), 'chDesTipoDocumento', 'chDesTipoDocumento', enum_formatoColuna.texto, true, false, false, 500));

    return colunas;
  }
}