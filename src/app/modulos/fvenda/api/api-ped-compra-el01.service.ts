import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelPedCompraEL01 } from '../models/model-ped-compra-EL-01';

@Injectable()
export class ApiPedCompraEL01Service {

  private url: string = 'fvenda/api/PedCompraEL01';
  private orderByColumnName: string = 'inNumPedCompra';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'inNumPedCompra';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPedCompraEL01): Promise<ModelPedCompraEL01> {
    return new Promise<ModelPedCompraEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPedCompraEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelPedCompraEL01): Promise<ModelPedCompraEL01> {
    return new Promise<ModelPedCompraEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedCompraEL01>(this.url, objeto, true)
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

  public liberar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/liberar/${id}`;

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

  public rejeitarItens(id: number, dados: any): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/RejeitarItens/${id}`;

        this.apiGatewayService.put<boolean>(url, dados, true)
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

  public obter(id: number): Promise<ModelPedCompraEL01> {
    return new Promise<ModelPedCompraEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPedCompraEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPedCompraEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPedCompraEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPedCompraEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ped-compra-el01.service.ts');
    /* coluna: string            , nomeCampo: string                 , propriedade: string       , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEstabelec'), 'Estabelec.chCodEstabelec', 'chCodEstabelec', enum_formatoColuna.texto, false, false, false, 60));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevEstabelec'), 'Estabelec.chNomeAbreviado', 'chNomAbrevEstabelec', enum_formatoColuna.texto, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumPedCompra'), 'PedCompra.inNumPedCompra', 'inNumPedCompra', enum_formatoColuna.numero, true, false, false, 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoPedComp'), 'SituacaoPedComp.chDescricao', 'chDesSituacaoPedComp', enum_formatoColuna.texto, false, false, false, 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatPedCompra'), 'PedCompra.daDatPedCompra', 'daDatPedCompra', enum_formatoColuna.dataHora, true, false, false, 170));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodCliente'), 'Cliente.inCodCliente', 'inCodCliente', enum_formatoColuna.numero_sem_formato, true, false, false, 100));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente '), 'PessoaCliente.inNumIdentificacao', 'inNumIdentifCliente', enum_formatoColuna.numero_sem_formato, false, true, 100, this.formatarCampoCliente));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbrevCliente'), 'Cliente.chNomeAbreviado', 'chNomAbrevCliente', enum_formatoColuna.texto, true, false, false, 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeCliente'), 'PessoaCliente.chNomePessoa', 'chNomeCliente', enum_formatoColuna.texto, true, false, false, 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomContatoCliente'), 'PedCompra.chNomContatoCliente', 'chNomContatoCliente', enum_formatoColuna.texto, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedCliente'), 'PedCompra.chNumPedCliente', 'chNumPedCliente', enum_formatoColuna.texto, false, false, false, 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRepresentante'), 'Representante.inCodRepresentante', 'inCodRepresentante', enum_formatoColuna.numero_sem_formato, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeRepresentante'), 'PessoaRepresentante.chNomePessoa', 'chNomeRepresentante', enum_formatoColuna.texto, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevRepresentante'), 'Representante.chNomeAbreviado', 'chNomeAbrevRepresentante', enum_formatoColuna.texto, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodTabPreco'), 'TabPreco.chCodTabPreco', 'chCodTabPreco', enum_formatoColuna.texto, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTabPreco'), 'TabPreco.chDescricao', 'chDesTabPreco', enum_formatoColuna.texto, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValProduto'), 'PedCompra.deValProduto', 'deValProduto', enum_formatoColuna.moeda, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValTotal'), 'PedCompra.deValTotal', 'deValTotal', enum_formatoColuna.moeda, false, false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao'), 'PedCompra.chDesObservacao', 'chDesObservacao', enum_formatoColuna.texto, false, true));

    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodMotRejPedComp'), 'PedCompraItem.inCodMotRejPedComp', 'inCodMotRejPedComp', enum_formatoColuna.numero, false, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesComplMotRejPedComp'), 'PedCompraItem.chDesMotivo', 'chDesComplMotRejPedComp', enum_formatoColuna.texto, false, true));

    return colunas;
  }

  private formatarCampoCliente(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentifCliente.toString().length;

    if (obj.inCodTipoDocumentoCliente == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifCliente.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumentoCliente == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifCliente.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }
}
