import { Injectable } from "@angular/core";
import { ApiGatewayService } from "../../../api-data-access/api-gateway.service";
import { AssetsLocaleService } from "../../../assets-locale/assets-locale.service";
import { LocaleDataFile } from "../../../assets-locale/locale-data-file";
import { enum_formatoColuna } from "../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna";
import { GridPesquisaColumn } from "../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column";
import { ModelPedCompraEL01 } from "../models/model-ped-compra-EL-01";
import { ModelPedCompraItemEL01 } from "../models/model-ped-compra-item-EL01";

@Injectable()
export class ApiPedCompraItemEL01Service {
  private url: string = "fvenda/api/PedCompraItemEL01";
  private orderByColumnName: string = "IDPedCompraItem";
  private sortType: string = "asc";

  public IDPedCompra: number = undefined;
  public modelPedCompraEL01: ModelPedCompraEL01 = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) {}

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = "IDPedCompraItem";
      this.sortType = "asc";
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(
    objeto: ModelPedCompraItemEL01
  ): Promise<ModelPedCompraItemEL01> {
    return new Promise<ModelPedCompraItemEL01>((resolve, reject) => {
      this.apiGatewayService
        .post<ModelPedCompraItemEL01>(this.url, objeto, true)
        .then(
          (objeto_retornado) => {
            resolve(objeto_retornado);
          },
          (erro) => {
            reject(erro);
          }
        );
    });
  }

  public alterar(
    objeto: ModelPedCompraItemEL01
  ): Promise<ModelPedCompraItemEL01> {
    return new Promise<ModelPedCompraItemEL01>((resolve, reject) => {
      this.apiGatewayService
        .put<ModelPedCompraItemEL01>(this.url, objeto, true)
        .then(
          (objeto_retornado) => {
            resolve(objeto_retornado);
          },
          (erro) => {
            reject(erro);
          }
        );
    });
  }

  public excluir(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let url: string = `${this.url}/${id}`;

      this.apiGatewayService.delete<boolean>(url, true).then(
        (objeto_retornado) => {
          resolve(objeto_retornado);
        },
        (erro) => {
          reject(erro);
        }
      );
    });
  }

  public obter(id: number): Promise<ModelPedCompraItemEL01> {
    return new Promise<ModelPedCompraItemEL01>((resolve, reject) => {
      let url: string = `${this.url}/${id}`;

      this.apiGatewayService.get<ModelPedCompraItemEL01>(url, true).then(
        (objeto_retornado) => {
          resolve(objeto_retornado[0]);
        },
        (erro) => {
          reject(erro);
        }
      );
    });
  }

  public listar(
    page: number,
    pageSize: number,
    filter: string
  ): Promise<Array<ModelPedCompraItemEL01>> {
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (this.IDPedCompra != 0 && this.IDPedCompra != undefined) {
      if (filter != "") {
        filter += `~and~`;
      }
      filter += `PedCompraItem.IDPedCompra~eq~${this.IDPedCompra}`;
    } else {
      console.error(
        "O IDPedCompra deve ser passado para o grid antes de executar a pesquisa"
      );
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPedCompraItemEL01>>((resolve, reject) => {
      this.apiGatewayService.get<Array<ModelPedCompraItemEL01>>(url, true).then(
        (lista_objetos) => {
          resolve(lista_objetos);
        },
        (erro) => {
          reject(erro);
        }
      );
    });
  }
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile(
      "modulos.fvenda.api.api-ped-compra-item-el01-serv.service.ts"
    );
    /* coluna: string       , nomeCampo: string               , propriedade: string  , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chCodEANRec"),
        "PedCompraItem.chCodEANRec",
        "chCodEANRec",
        enum_formatoColuna.texto,
        true,
        false,
        false,
        180
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chCodItem"),
        "Item.chCodItem",
        "chCodItem",
        enum_formatoColuna.texto,
        true,
        false,
        false,
        180
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chDesItem"),
        "Item.chDescricao",
        "chDesItem",
        enum_formatoColuna.texto,
        true,
        false,
        false,
        500
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chCodUMItem"),
        "Item.chCodUM",
        "chCodUMItem",
        enum_formatoColuna.texto,
        true,
        true
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("deQtdSolic"),
        "PedCompraItem.deQtdSolic",
        "deQtdSolic",
        enum_formatoColuna.numero,
        false,
        false,
        false,
        150
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("deQtdAtend"),
        "PedCompraItem.deQtdAtend",
        "deQtdAtend",
        enum_formatoColuna.numero,
        false,
        false,
        false,
        150
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chCodTabPreco"),
        "TabPreco.chCodTabPreco",
        "chCodTabPreco",
        enum_formatoColuna.texto,
        true,
        true
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chDesTabPreco"),
        "TabPreco.chDescricao",
        "chDesTabPreco",
        enum_formatoColuna.texto,
        true,
        true
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("dePrecoTabela"),
        "PedCompraItem.dePrecoTabela",
        "dePrecoTabela",
        enum_formatoColuna.moeda,
        true,
        true
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("deValUnitSolic"),
        "PedCompraItem.deValUnitSolic",
        "deValUnitSolic",
        enum_formatoColuna.moeda,
        false,
        false,
        false,
        150
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("deValUnitLiquido"),
        "PedCompraItem.deValUnitLiquido",
        "deValUnitLiquido",
        enum_formatoColuna.moeda,
        false,
        false,
        false,
        150
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("deValTotLiquido"),
        "PedCompraItem.deValTotLiquido",
        "deValTotLiquido",
        enum_formatoColuna.moeda,
        false,
        false,
        false,
        150
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chDesSitAtenPedComp"),
        "SitAtenPedComp.chDescricao",
        "chDesSitAtenPedComp",
        enum_formatoColuna.texto,
        false,
        false,
        false,
        250
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chDesMotRejPedComp"),
        "MotRejPedComp.chDescricao",
        "chDesMotRejPedComp",
        enum_formatoColuna.texto,
        false,
        true
      )
    );
    colunas.push(
      new GridPesquisaColumn(
        localeFile.traducao("chDesMotivo"),
        "PedCompraItem.chDesMotivo",
        "chDesMotivo",
        enum_formatoColuna.texto,
        false,
        true
      )
    );

    return colunas;
  }
}
