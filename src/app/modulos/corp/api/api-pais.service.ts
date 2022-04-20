import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelPais } from '../models/model-pais';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable()
export class ApiPaisService implements InterfaceColunasGrid {
  private url: string = 'corp/api/pais';
  private orderByColumnName: string = 'IDPais';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'IDPais';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPais): Promise<ModelPais> {
    return new Promise<ModelPais>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPais>(this.url, objeto, true)
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

  public alterar(objeto: ModelPais): Promise<ModelPais> {
    return new Promise<ModelPais>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPais>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPais> {
    return new Promise<ModelPais>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPais>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPais>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPais>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPais>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pais.service.ts');
                                     /* coluna: string                        , nomeCampo: string   , propriedade: string , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPais')         , 'Pais.IDPais'       , 'IDPais'            , enum_formatoColuna.numero, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPais')      , 'Pais.chCodPais'    , 'chCodPais'         , enum_formatoColuna.texto , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviado'), 'chNomeAbreviado'   , 'chNomeAbreviado'   , enum_formatoColuna.texto , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNome')         , 'chNome'            , 'chNome'            , enum_formatoColuna.texto , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSiscomex')  , 'chCodSiscomex'     , 'chCodSiscomex'     , enum_formatoColuna.texto , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodIBGE')      , 'chCodIBGE'         , 'chCodIBGE'         , enum_formatoColuna.texto , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Nacionalidade')  , 'chDesNacionalidade', 'chDesNacionalidade', enum_formatoColuna.texto , false     , true));

    return colunas;
  }
}