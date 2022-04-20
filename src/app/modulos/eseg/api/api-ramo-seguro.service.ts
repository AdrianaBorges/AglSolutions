import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelRamoSeguro } from '../models/model-ramo-seguro';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiRamoSeguroService {
  private url: string = 'eseg/api/RamoSeguro';
  private orderByColumnName: string = 'IDRamoSeguro';
  private sortType: string = 'asc';
  private inCodGrupoSeguro: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDRamoSeguro';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelRamoSeguro): Promise<ModelRamoSeguro> {
    return new Promise<ModelRamoSeguro>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelRamoSeguro>(this.url, objeto, true)
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

  public alterar(objeto: ModelRamoSeguro): Promise<ModelRamoSeguro> {
    return new Promise<ModelRamoSeguro>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelRamoSeguro>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelRamoSeguro> {
    return new Promise<ModelRamoSeguro>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelRamoSeguro>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelRamoSeguro>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //Aplicando filtro de pessoa por padrão
    if (this.inCodGrupoSeguro != 0 && this.inCodGrupoSeguro != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `RamoSeguro.inCodGrupoSeguro~eq~${this.inCodGrupoSeguro}`;
    } else {
      console.error('O inCodGrupoSeguro deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelRamoSeguro>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelRamoSeguro>>(url, true)
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

  public setInCodGrupoSeguro(inCodGrupoSeguro: number) {
    this.inCodGrupoSeguro = inCodGrupoSeguro;
  }

  public getInCodGrupoSeguro() {
    return this.inCodGrupoSeguro;
  }
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-ramo-seguro.service.ts');
                                     /* coluna: string                         , nomeCampo: string , propriedade: string, formatoColuna            , filterable, hidden, detalheGrid, width */                
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDRamoSeguro')    , 'IDRamoSeguro'    , 'IDRamoSeguro'     , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodGrupoSeguro'), 'inCodGrupoSeguro', 'inCodGrupoSeguro' , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRamoSeguro') , 'inCodRamoSeguro' , 'inCodRamoSeguro'  , enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')     , 'chDescricao'     , 'chDescricao'      , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}