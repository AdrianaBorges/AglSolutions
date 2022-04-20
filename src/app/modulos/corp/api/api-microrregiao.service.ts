import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelMicrorregiao } from '../models/model-microrregiao';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable({
  providedIn: 'root'
})
export class ApiMicrorregiaoService {

  private url: string = 'corp/api/Microrregiao';
  private orderByColumnName: string = 'chCodMicrorregiao';
  private sortType: string = 'asc';

  private chCodRegiao: string;
  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodMicrorregiao';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelMicrorregiao): Promise<ModelMicrorregiao> {
    return new Promise<ModelMicrorregiao>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelMicrorregiao>(this.url, objeto, true)
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

  public alterar(objeto: ModelMicrorregiao): Promise<ModelMicrorregiao> {
    return new Promise<ModelMicrorregiao>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelMicrorregiao>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelMicrorregiao> {
    return new Promise<ModelMicrorregiao>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelMicrorregiao>(url, true)
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

  public setChCodRegiao(chCodRegiao: string) {
    this.chCodRegiao = chCodRegiao;
  }

  public getChCodRegiao() {
    return this.chCodRegiao;
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelMicrorregiao>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (this.chCodRegiao != "" && this.chCodRegiao != "0" && this.chCodRegiao != undefined && this.chCodRegiao != null) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `Regiao.chCodRegiao~eq~'${this.chCodRegiao}'`;
    } else {
      console.error('O chCodRegiao deve ser passado para o grid antes de executar a pesquisa')
    }


    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelMicrorregiao>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelMicrorregiao>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-microrregiao.service.ts');
                                                          /* coluna: string     , nomeCampo: string               , propriedade: string, formatoColuna            , filterable, Hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDMicrorregiao')   , 'Microrregiao.IDMicrorregiao'   , 'IDMicrorregiao'   , enum_formatoColuna.numero, false     , true))
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodRegiao')      , 'Microrregiao.chCodRegiao'      , 'chCodRegiao'      , enum_formatoColuna.texto , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesRegiao')      , 'Regiao.chDescricao'            , 'chDesRegiao'      , enum_formatoColuna.texto , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodMicrorregiao'), 'Microrregiao.chCodMicrorregiao', 'chCodMicrorregiao', enum_formatoColuna.texto , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')      , 'Microrregiao.chDescricao'      , 'chDescricao'      , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}
