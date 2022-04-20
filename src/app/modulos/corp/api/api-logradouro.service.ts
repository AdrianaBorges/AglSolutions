import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnAgregada } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-agreagada';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelLogradouro } from '../models/model-logradouro';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable()
export class ApiLogradouroService implements InterfaceColunasGrid {
  private url: string = 'corp/api/Logradouro';
  private orderByColumnName: string = 'IDLogradouro';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDLogradouro';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelLogradouro): Promise<ModelLogradouro> {
    return new Promise<ModelLogradouro>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelLogradouro>(this.url, objeto, true)
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

  public alterar(objeto: ModelLogradouro): Promise<ModelLogradouro> {
    return new Promise<ModelLogradouro>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelLogradouro>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelLogradouro> {
    return new Promise<ModelLogradouro>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelLogradouro>(url, true)
          .then(
            objeto_retornado => {
              /**
               * Caso exista algum atributo, cujo nome, seja igual a parte do nome
               * de outro atributo, e ambos os atributos sejam exibidos no Grid,
               * com possibilidade de Filtro, precisamos criar um atributo novo (Fake),
               * com um nome mais completo (Único), para garantir que a busca pela string
               * do nome, não encontre o valor como parte do nome do outro atributo.
               * Exemplo: Atributo da API chNome e chNomeCidade
               *          Atributo Fake, chNomeLogradouro = chNome
               */
              objeto_retornado.chNomeLogradouro = objeto_retornado.chNome;
              resolve(objeto_retornado[0]);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }


  public obterPorCEP(cep: string): Promise<ModelLogradouro> {
    return new Promise<ModelLogradouro>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByCEP/${cep}`;

        this.apiGatewayService.get<ModelLogradouro>(url, true)
          .then(
            objeto_retornado => {
              /**
               * Caso exista algum atributo, cujo nome, seja igual a parte do nome
               * de outro atributo, e ambos os atributos sejam exibidos no Grid,
               * com possibilidade de Filtro, precisamos criar um atributo novo (Fake),
               * com um nome mais completo (Único), para garantir que a busca pela string
               * do nome, não encontre o valor como parte do nome do outro atributo.
               * Exemplo: Atributo da API chNome e chNomeCidade
               *          Atributo Fake, chNomeLogradouro = chNome
               */
              objeto_retornado.chNomeLogradouro = objeto_retornado.chNome;
              resolve(objeto_retornado[0]);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelLogradouro>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelLogradouro>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelLogradouro>>(url, true)
          .then(
            (lista_objetos) => {
              lista_objetos.map(logradouro => {
                /**
                 * Caso exista algum atributo, cujo nome, seja igual a parte do nome
                 * de outro atributo, e ambos os atributos sejam exibidos no Grid,
                 * com possibilidade de Filtro, precisamos criar um atributo novo (Fake),
                 * com um nome mais completo (Único), para garantir que a busca pela string
                 * do nome, não encontre o valor como parte do nome do outro atributo.
                 * Exemplo: Atributo da API chNome e chNomeCidade
                 *          Atributo Fake, chNomeLogradouro = chNome
                 */
                logradouro.chNomeLogradouro = logradouro.chNome;
                return logradouro;
              });
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-logradouro.service.ts');
                                                                  /* coluna: string       , nomeCampo: string               , propriedade: string   , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('IDLogradouro')       , 'Logradouro.IDLogradouro'       , 'IDLogradouro'        , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('IDPais')             , 'Pais.IDPais'                   , 'IDPais'              , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chCodPais')          , 'Pais.chCodPais'                , 'chCodPais'           , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chNomeAbreviadoPais'), 'Pais.chNomeAbreviado'          , 'chNomeAbreviadoPais' , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chNomePais')         , 'Pais.chNome'                   , 'chNomePais'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('IDUF')               , 'UF.IDUF'                       , 'IDUF'                , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chSiglaUF')          , 'UF.chSigla'                    , 'chSiglaUF'           , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chNomeUF')           , 'UF.chNome'                     , 'chNomeUF'            , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chSiglaUF')          , 'UF.chSigla'                    , 'chSiglaUF'           , enum_formatoColuna.texto , false     , false , false      , 80));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('IDCidade')           , 'Logradouro.IDCidade'           , 'IDCidade'            , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chNomeCidade')       , 'Cidade.chNome'                 , 'chNomeCidade'        , enum_formatoColuna.texto , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumnFormat  (localeFile.traducao('chLogradouro')       , 'Logradouro.chNome'             , 'chNomeLogradouroFake', enum_formatoColuna.texto, true      , false , 280, this.formatarLogradouro));
    //colunas.push(new GridPesquisaColumnAgregada(localeFile.traducao('chLogradouro')       , 280, 'chDesTipoLogradouro', ' ', 'chNomeLogradouro'));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('inCodTipoLogradouro'), 'Logradouro.inCodTipoLogradouro', 'inCodTipoLogradouro' , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chDesTipoLogradouro'), 'TipoLogradouro.chDescricao'    , 'chDesTipoLogradouro' , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chNomeLogradouro')   , 'Logradouro.chNome'             , 'chNomeLogradouro'    , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chCEP')              , 'Logradouro.chCEP'              , 'chCEP'               , enum_formatoColuna.texto , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chComplemento')      , 'Logradouro.chComplemento'      , 'chComplemento'       , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chNomeAbreviado')    , 'Logradouro.chNomeAbreviado'    , 'chNomeAbreviado'     , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn        (localeFile.traducao('chBairro')           , 'Logradouro.chBairro'           , 'chBairro'            , enum_formatoColuna.texto , true      , false,  false      , 200));
    
    return colunas;
  }

  public formatarLogradouro(logradouro: any): string{
    return logradouro.chDesTipoLogradouro.trim() + ' ' + logradouro.chNomeLogradouro.trim();
  }
}