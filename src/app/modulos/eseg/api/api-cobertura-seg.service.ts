import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelCoberturaSeg } from '../models/model-cobertura-seg';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiCoberturaSegService {
  private url: string = 'eseg/api/CoberturaSeg';//'segur/api/usuario';
  private orderByColumnName: string = 'IDCoberturaSeg';
  private sortType: string = 'asc';
  private IDSeguradora: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDCoberturaSeg';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCoberturaSeg): Promise<ModelCoberturaSeg> {
    return new Promise<ModelCoberturaSeg>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCoberturaSeg>(this.url, objeto, true)
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

  public alterar(objeto: ModelCoberturaSeg): Promise<ModelCoberturaSeg> {
    return new Promise<ModelCoberturaSeg>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCoberturaSeg>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelCoberturaSeg> {
    return new Promise<ModelCoberturaSeg>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCoberturaSeg>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCoberturaSeg>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //Aplicando filtro de pessoa por padrão
    if (this.IDSeguradora != 0 && this.IDSeguradora != undefined ) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `CoberturaSeg.IDSeguradora~eq~${this.IDSeguradora}`;
    } else {
      console.error('O IDSeguradora deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCoberturaSeg>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCoberturaSeg>>(url, true)
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

  public setIDSeguradora(IDSeguradora: number) {
    this.IDSeguradora = IDSeguradora;
  }

  public getIDSeguradora() {
    return this.IDSeguradora;
  }
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-cobertura-seg.service.ts');
                                     /* coluna: string                          , nomeCampo: string  , propriedade: string , formatoColuna            , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCoberturaSeg')   , 'IDCoberturaSeg'   , 'IDCoberturaSeg'    , enum_formatoColuna.numero, true       , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSeguradora')     , 'IDSeguradora'     , 'IDCoberturaSeg'    , enum_formatoColuna.numero, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCoberturaSeg'), 'chCodCoberturaSeg', 'chCodCoberturaSeg' , enum_formatoColuna.texto , true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')      , 'chDescricao'      , 'chDescricao'       , enum_formatoColuna.texto , true       , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesExterna')     , 'chDesExterna'     , 'chDesExterna'      , enum_formatoColuna.texto , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesDetalhe')     , 'chDesDetalhe'     , 'chDesDetalhe'      , enum_formatoColuna.texto , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValLimitePorCPF'), 'deValLimitePorCPF', 'deValLimitePorCPF' , enum_formatoColuna.moeda , false      , true));

    return colunas;
  }
}