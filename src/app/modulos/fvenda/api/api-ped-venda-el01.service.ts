import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelPedVendaEL01 } from '../models/model-ped-venda-EL01';

@Injectable()
export class ApiPedVendaEL01Service {

  private url: string = 'fvenda/api/PedVendaEL01';
  private orderByColumnName: string = 'IDPedVenda';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPedVenda';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPedVendaEL01): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPedVendaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelPedVendaEL01): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedVendaEL01>(this.url, objeto, true)
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

  public liberar(id: number): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedVendaEL01>(`${this.url}/Liberar/${id}/`, {}, true)
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

  public cancelar(id: number, dados: ModelPedVendaEL01): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedVendaEL01>(`${this.url}/Cancelar/${id}/`, dados, true)
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

  public redigitar(id: number): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedVendaEL01>(`${this.url}/Redigitar/${id}/`, {}, true)
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
  public devolver(id: number): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPedVendaEL01>(`${this.url}/Devolver/${id}/`, {}, true)
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

  public obter(id: number): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPedVendaEL01>(url, true)
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

  public obterPorCod(inNumPedVenda: number): Promise<ModelPedVendaEL01> {
    return new Promise<ModelPedVendaEL01>(
      (resolve, reject) => {
        let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
        url += `&filter=PedVenda.inNumPedVenda~eq~${inNumPedVenda}` + `&page=1&pageSize=1`;

        this.apiGatewayService.get<ModelPedVendaEL01>(url, true)
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


 

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPedVendaEL01>> {
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPedVendaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPedVendaEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-ped-venda-el01.service.ts');
                                                                /* coluna: string            , nomeCampo: string                 , propriedade: string       , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPedVenda')              , 'PedVenda.IDPedVenda'             , 'IDPedVenda'              , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodEstabelec')          , 'Estabelec.chCodEstabelec'        , 'chCodEstabelec'          , enum_formatoColuna.texto             , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomAbrevEstabelec')     , 'Estabelec.chNomeAbreviado'       , 'chNomAbrevEstabelec'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chLstTipoPedido')         , 'PedVenda.chLstTipoPedido'        , 'chLstTipoPedido'         , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inNumPedVenda')           , 'PedVenda.inNumPedVenda'          , 'inNumPedVenda'           , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumPedEmp')             , 'PedVenda.chNumPedEmp'            , 'chNumPedEmp'             , enum_formatoColuna.texto             , true      , false , false      , 160));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoPedVen')     , 'SituacaoPedVen.chDescricao'      , 'chDesSituacaoPedVen'     , enum_formatoColuna.texto             , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatEmissao')            , 'PedVenda.daDatEmissao'           , 'daDatEmissao'            , enum_formatoColuna.data              , true      , false , false      , 130));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatEntrada')            , 'PedVenda.daDatEntrada'           , 'daDatEntrada'            , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatLimFatur')           , 'PedVenda.daDatLimFatur'          , 'daDatLimFatur'           , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatEntregaSolic')       , 'PedVenda.daDatEntregaSolic'      , 'daDatEntregaSolic'       , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatEntregaPrev')        , 'PedVenda.daDatEntregaPrev'       , 'daDatEntregaPrev'        , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatFaturPrev')          , 'PedVenda.daDatFaturPrev'         , 'daDatFaturPrev'          , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')            , 'Cliente.inCodCliente'            , 'inCodCliente'            , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomAbrevCliente')       , 'Cliente.chNomeAbreviado'         , 'chNomAbrevCliente'       , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')           , 'PessoaCliente.chNomePessoa'      , 'chNomeCliente'           , enum_formatoColuna.texto             , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente')     , 'PessoaCliente.inNumIdentificacao', 'inNumIdentifCliente'     , enum_formatoColuna.numero_sem_formato, false     , true  , 180, this.formatar_CPF_CNPJ));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumPedCli')             , 'PedVenda.chNumPedCli'            , 'chNumPedCli'             , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumOrdCompCli')         , 'PedVenda.chNumOrdCompCli'        , 'chNumOrdCompCli'         , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomComprador')          , 'PedVenda.chNomComprador'         , 'chNomComprador'          , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')      , 'Representante.inCodRepresentante', 'inCodRepresentante'      , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentante'), 'Representante.chNomeAbreviado'   , 'chNomeAbrevRepresentante', enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')     , 'PessoaRepresentante.chNomePessoa', 'chNomeRepresentante'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumPedRep')             , 'PedVenda.chNumPedRep'            , 'chNumPedRep'             , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTransp')             , 'Transp.inCodTransp'              , 'inCodTransp'             , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeTransp')            , 'Transp.chNome'                   , 'chNomeTransp'            , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoFrete')          , 'TipoFrete.chDescricao'           , 'chDesTipoFrete'          , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRedesp')             , 'Redesp.inCodTransp'              , 'inCodRedesp'             , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRedesp')            , 'Redesp.chNome'                   , 'chNomeRedesp'            , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoFreteRedesp')    , 'TipoFreteRedesp.chDescricao'     , 'chDesTipoFreteRedesp'    , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCondPagtoVenda')     , 'CondPagtoVenda.chDescricao'      , 'chDesCondPagtoVenda'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCondicao')              , 'CondPagtoVenda.chCondicao'       , 'chCondicao'              , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatBase')               , 'PedVenda.daDatBase'              , 'daDatBase'               , enum_formatoColuna.data              , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTabPreco')           , 'TabPreco.chDescricao'            , 'chDesTabPreco'           , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValProduto')            , 'PedVenda.deValProduto'           , 'deValProduto'            , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValIPI')                , 'PedVenda.deValIPI'               , 'deValIPI'                , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValST')                 , 'PedVenda.deValST'                , 'deValST'                 , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValTotal')              , 'PedVenda.deValTotal'             , 'deValTotal'              , enum_formatoColuna.moeda             , false     , false , false      , 130));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValVenda')              , 'PedVenda.deValVenda'             , 'deValVenda'              , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValBonific')            , 'PedVenda.deValBonific'           , 'deValBonific'            , enum_formatoColuna.moeda             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesOrigemPedVen')       , 'OrigemPedVen.chDescricao'        , 'chDesOrigemPedVen'       , enum_formatoColuna.texto             , false     , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')         , 'PedVenda.chDesObservacao'        , 'chDesObservacao'         , enum_formatoColuna.texto             , false     , true  , false));

    return colunas;
  }

  private formatar_CPF_CNPJ(obj: any): string {
    let identificacao: string;

    if (obj.inNumIdentifCliente) {
      let qtde = obj.inNumIdentifCliente.toString().length;

      if (obj.inCodTipoDocumentoCliente == 1) {
        let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifCliente.toString();
        identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
      } else if (obj.inCodTipoDocumentoCliente == 2) {
        let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifCliente.toString();
        identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
      } else {
        identificacao = obj.inNumIdentifCliente.toString();
      }
    }
    return identificacao;
  }
}