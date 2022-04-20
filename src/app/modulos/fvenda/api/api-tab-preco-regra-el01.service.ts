import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelTabPrecoRegraEL01 } from '../models/model-tab-preco-regra-EL01';

@Injectable()
export class ApiTabPrecoRegraEL01Service {

  private url: string = 'fvenda/api/TabPrecoRegraEL01';
  private orderByColumnName: string = 'IDTabPrecoRegra';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDTabPrecoRegra';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTabPrecoRegraEL01): Promise<ModelTabPrecoRegraEL01> {
    return new Promise<ModelTabPrecoRegraEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTabPrecoRegraEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelTabPrecoRegraEL01): Promise<ModelTabPrecoRegraEL01> {
    return new Promise<ModelTabPrecoRegraEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTabPrecoRegraEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelTabPrecoRegraEL01> {
    return new Promise<ModelTabPrecoRegraEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTabPrecoRegraEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTabPrecoRegraEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTabPrecoRegraEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTabPrecoRegraEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-tab-preco-regra-el01.service.ts');
                                                                /* coluna: string     , nomeCampo: string                , propriedade: string, formatoColuna                         , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDTabPrecoRegra')  , 'TabPrecoRegra.IDTabPrecoRegra'  , 'IDTabPrecoRegra'  , enum_formatoColuna.numero_sem_formato , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodTabPreco')    , 'TabPreco.chCodTabPreco'         , 'chCodTabPreco'    , enum_formatoColuna.texto              , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTabPreco')    , 'TabPreco.chDescricao'           , 'chDesTabPreco'    , enum_formatoColuna.texto              , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatValidIni')    , 'TabPrecoRegra.dtDatValidIni'    , 'dtDatValidIni'    , enum_formatoColuna.dataHora           , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatValidFim')    , 'TabPrecoRegra.dtDatValidFim'    , 'dtDatValidFim'    , enum_formatoColuna.dataHora           , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodPais')        , 'Pais.chCodPais'                 , 'chCodPais'        , enum_formatoColuna.texto              , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevPais')  , 'Pais.chNomeAbreviado'           , 'chNomeAbrevPais'  , enum_formatoColuna.texto              , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chSiglaUF')        , 'UF.chSigla'                     , 'chSiglaUF'        , enum_formatoColuna.texto              , false     , false , false      , 60));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCidade')     , 'Cidade.chNome'                  , 'chNomeCidade'     , enum_formatoColuna.texto              , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodRegiao')      , 'TabPrecoRegra.chCodRegiao'      , 'chCodRegiao'      , enum_formatoColuna.texto              , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesRegiao')      , 'Regiao.chDescricao'             , 'chDesRegiao'      , enum_formatoColuna.texto              , false     , false , false      , 280));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodMicrorregiao'), 'Microrregiao.chCodMicrorregiao' , 'chCodMicrorregiao', enum_formatoColuna.texto              , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMicrorregiao'), 'Regiao.chDescricao'             , 'chDesMicrorregiao', enum_formatoColuna.texto              , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodGrupoCliente'), 'TabPrecoRegra.chCodGrupoCliente', 'chCodGrupoCliente', enum_formatoColuna.texto              , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesGrupoCliente'), 'GrupoCliente.chDescricao'       , 'chDesGrupoCliente', enum_formatoColuna.texto              , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCanalVenda')  , 'TabPrecoRegra.chCodCanalVenda'  , 'chCodCanalVenda'  , enum_formatoColuna.texto              , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCanalVenda')  , 'CanalVenda.chDesCanalVenda'     , 'chDesCanalVenda'  , enum_formatoColuna.texto              , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodClientePai')  , 'ClientePai.inCodCliente'        , 'inCodClientePai'  , enum_formatoColuna.numero_sem_formato , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeClientePai') , 'PessoaClientePai.chNomePessoa'  , 'chNomeClientePai' , enum_formatoColuna.texto              , true      , false , false      , 350));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')     , 'Cliente.inCodCliente'           , 'inCodCliente'     , enum_formatoColuna.numero_sem_formato , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')    , 'PessoaCliente.chNomePessoa'     , 'chNomeCliente'    , enum_formatoColuna.texto              , true      , false , false      , 350));

    return colunas;
  }
}
