import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelProgramaNivel } from '../models/model-programa-nivel';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable()
export class ApiProgramaNivelService {


  private url: string = 'segur/api/ProgramaNivel';
  private orderByColumnName: string = 'IDProgramaNivel';
  private sortType: string = 'asc';
  private chCodPrograma: string;


  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public getChCodPrograma(): string {
    return this.chCodPrograma;
  }
  public setChCodPrograma(value: string) {
    this.chCodPrograma = value;
  }
  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDProgramaNivel';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelProgramaNivel): Promise<ModelProgramaNivel> {
    return new Promise<ModelProgramaNivel>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelProgramaNivel>(this.url, objeto, true)
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

  public alterar(objeto: ModelProgramaNivel): Promise<ModelProgramaNivel> {
    return new Promise<ModelProgramaNivel>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelProgramaNivel>(this.url, objeto, true)
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

        let url: string = `${this.url}/${id}/`;

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

  public obter(id: number): Promise<ModelProgramaNivel> {
    return new Promise<ModelProgramaNivel>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelProgramaNivel>(url, true)
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
  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelProgramaNivel>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de Chgrupo
    if ((this.chCodPrograma != "") && (this.chCodPrograma != undefined)) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `ProgramaNivel.chCodPrograma~eq~'${this.chCodPrograma}'`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelProgramaNivel>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelProgramaNivel>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-programa-nivel.service.ts');
                                      /* coluna: string                             , nomeCampo: string     , propriedade: string   , formatoColuna             , filterable  , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProgramaNivel')      , 'IDProgramaNivel'     , 'IDProgramaNivel'     , enum_formatoColuna.numero  , true        , false, false, 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPrograma')        , 'chCodPrograma'       , 'chCodPrograma'       , enum_formatoColuna.texto  , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTitPrograma')     , 'chDesTitPrograma'    , 'chDesTitPrograma'    , enum_formatoColuna.texto  , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodNivel')           , 'inCodNivel'          , 'inCodNivel'          , enum_formatoColuna.numero  , true        , false, false, 170));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProgramaNivel')   , 'chDesProgramaNivel'  , 'chDesProgramaNivel'  , enum_formatoColuna.texto  , true        , false, false, 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesComandoExecuta')  , 'chDesComandoExecuta' , 'chDesComandoExecuta' , enum_formatoColuna.texto  , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')      , 'chDesObservacao'     , 'chDesObservacao'     , enum_formatoColuna.texto  , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesOperacao')        , 'chDesOperacao'       , 'chDesOperacao'       , enum_formatoColuna.texto  , false       , true));

    return colunas;
  }

}
