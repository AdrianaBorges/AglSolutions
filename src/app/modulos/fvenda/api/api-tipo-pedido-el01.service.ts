import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelTipoPedidoEL01 } from '../models/model-tipo-pedido-EL01';

@Injectable()
export class ApiTipoPedidoEl01Service {
  private url: string = 'fvenda/api/TipoPedidoEL01';
  private orderByColumnName: string = 'IDTipoPedido';
  private sortType: string = 'asc';
  public inCodSituacaoCad: number = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDTipoPedido';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoPedidoEL01): Promise<ModelTipoPedidoEL01> {
    return new Promise<ModelTipoPedidoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTipoPedidoEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoPedidoEL01): Promise<ModelTipoPedidoEL01> {
    return new Promise<ModelTipoPedidoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTipoPedidoEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelTipoPedidoEL01> {
    return new Promise<ModelTipoPedidoEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoPedidoEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoPedidoEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (this.inCodSituacaoCad != 0 && this.inCodSituacaoCad != undefined) {
      if (filter != "") {
        filter += `~and~`;
      }
      filter += `TipoPedido.inCodSituacaoCad~eq~${this.inCodSituacaoCad}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoPedidoEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTipoPedidoEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-tipo-pedido-el01.service.ts');
    /* coluna: string    , nomeCampo: string             , propriedade: string, formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodTipoPedido'), 'TipoPedido.chCodTipoPedido', 'chCodTipoPedido', enum_formatoColuna.texto, true, false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao'), 'TipoPedido.chDescricao', 'chDescricao', enum_formatoColuna.texto, true, false, false, 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgConsideraVenda'), 'TipoPedido.lgConsideraVenda', 'lgConsideraVenda', enum_formatoColuna.booleano, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCad'), 'TipoPedido.inCodSituacaoCad', 'inCodSituacaoCad', enum_formatoColuna.numero, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCad'), 'SituacaoCad.chDesSituacaoCad', 'chDesSituacaoCad', enum_formatoColuna.texto, false, false, false, 250));

    return colunas;
  }
}
