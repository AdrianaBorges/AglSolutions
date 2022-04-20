import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelUF } from '../models/model-uf';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable()
export class ApiUfService implements InterfaceColunasGrid {
  private url: string = 'corp/api/Uf';
  private orderByColumnName: string = 'IDUF';
  private sortType: string = 'asc';  

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDUF';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelUF): Promise<ModelUF> {
    return new Promise<ModelUF>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelUF>(this.url, objeto, true)
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

  public alterar(objeto: ModelUF): Promise<ModelUF> {
    return new Promise<ModelUF>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelUF>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelUF> {
    return new Promise<ModelUF>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelUF>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelUF>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }
    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    return new Promise<Array<ModelUF>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelUF>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-uf.service.ts');
                                     /* coluna: string                            , nomeCampo: string     , propriedade: string  , formatoColuna,             filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDUF')               , 'UF.IDUF'             , 'IDUF'               , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPais')             , 'IDPais'              , 'IDPais'             , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviadoPais'), 'Pais.chNomeAbreviado', 'chNomeAbreviadoPais', enum_formatoColuna.texto , false     , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chSigla')            , 'UF.chSigla'          , 'chSigla'            , enum_formatoColuna.texto , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNome')             , 'UF.chNome'           , 'chNome'             , enum_formatoColuna.texto , true      , false,  false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodIBGE')          , 'UF.chCodIBGE'        , 'chCodIBGE'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPais')          , 'Pais.chCodPais'      , 'chCodPais'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePais')         , 'Pais.chNome'         , 'chNomePais'         , enum_formatoColuna.texto , true      , true));

    return colunas;
  }
}
