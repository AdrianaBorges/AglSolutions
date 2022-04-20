import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelTabPrecoEL01 } from '../models/model-tab-preco-EL01';

@Injectable()
export class ApiTabPrecoEL01Service {

  private url: string = 'fvenda/api/TabPrecoEL01';
  private orderByColumnName: string = 'chCodTabPreco';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodTabPreco';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTabPrecoEL01): Promise<ModelTabPrecoEL01> {
    return new Promise<ModelTabPrecoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTabPrecoEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelTabPrecoEL01): Promise<ModelTabPrecoEL01> {
    return new Promise<ModelTabPrecoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTabPrecoEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelTabPrecoEL01> {
    return new Promise<ModelTabPrecoEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTabPrecoEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTabPrecoEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTabPrecoEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTabPrecoEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-tab-preco-el01.service.ts');
                                                                /* coluna: string    , nomeCampo: string          , propriedade: string, formatoColuna                         , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDTabPreco')      , 'TabPreco.IDTabPreco'      , 'IDTabPreco'       , enum_formatoColuna.numero_sem_formato , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodTabPreco')   , 'TabPreco.chCodTabPreco'   , 'chCodTabPreco'    , enum_formatoColuna.texto              , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDescricao')     , 'TabPreco.chDescricao'     , 'chDescricao'      , enum_formatoColuna.texto              , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatValidIni')   , 'TabPreco.dtDatValidIni'   , 'dtDatValidIni'    , enum_formatoColuna.dataHora           , true      , false , false      , 160));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatValidFim')   , 'TabPreco.dtDatValidFim'   , 'dtDatValidFim'    , enum_formatoColuna.dataHora           , true      , false , false      , 160));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSituacaoCad'), 'TabPreco.inCodSituacaoCad', 'inCodSituacaoCad' , enum_formatoColuna.numero_sem_formato , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCad'), 'SituacaoCad.chDescricao'  , 'chDesSituacaoCad' , enum_formatoColuna.texto              , false     , false , false      , 250));
    
    return colunas;
  }

  

}
