import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelDefeitoEL01 } from '../models/model-defeito-EL01';

@Injectable()
export class ApiDefeitoEL01Service {

  private url: string = 'fvenda/api/DefeitoEL01';
  private orderByColumnName: string = 'IDDefeito';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDDefeito';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelDefeitoEL01): Promise<ModelDefeitoEL01> {
    return new Promise<ModelDefeitoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelDefeitoEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelDefeitoEL01): Promise<ModelDefeitoEL01> {
    return new Promise<ModelDefeitoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelDefeitoEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelDefeitoEL01> {
    return new Promise<ModelDefeitoEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelDefeitoEL01>(url, true)
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

  public obterPorCodigo(chCodDefeito: string): Promise<ModelDefeitoEL01> {
    return new Promise<ModelDefeitoEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByLK/${chCodDefeito}`;

        this.apiGatewayService.get<ModelDefeitoEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelDefeitoEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelDefeitoEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelDefeitoEL01>>(url, true)
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

  public listarAtivos(): Promise<Array<ModelDefeitoEL01>> {

    let url: string = `${this.url}/GetByAtivos`;

    return new Promise<Array<ModelDefeitoEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelDefeitoEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-defeito.service.ts');
                                    /* coluna: string                          , nomeCampo: string         , propriedade: string, formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDDefeito')       , 'Defeito.IDDefeito'       , 'IDDefeito'        , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodDefeito')    , 'Defeito.chCodDefeito'    , 'chCodDefeito'     , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDefeito'), 'Defeito.inCodTipoDefeito', 'inCodTipoDefeito' , enum_formatoColuna.numero            , false     , true)); 
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDefeito'), 'TipoDefeito.chDescricao' , 'chDesTipoDefeito' , enum_formatoColuna.texto             , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')     , 'Defeito.chDescricao'     , 'chDescricao'      , enum_formatoColuna.texto             , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad'), 'Defeito.inCodSituacaoCad', 'inCodSituacaoCad' , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad'), 'SituacaoCad.chDescricao' , 'chDesSituacaoCad' , enum_formatoColuna.texto             , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProblema')   , 'Defeito.chDesProblema'   , 'chDesProblema'    , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSolucao')    , 'Defeito.chDesSolucao'    , 'chDesSolucao'     , enum_formatoColuna.texto             , false     , true));

    return colunas;
  }

}
