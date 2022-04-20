import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelCidade } from '../models/model-cidade';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable()
export class ApiCidadeService implements InterfaceColunasGrid {

  private url: string = 'corp/api/Cidade';
  private orderByColumnName: string = 'IDCidade';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  
  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'IDCidade';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCidade): Promise<ModelCidade> {
    return new Promise<ModelCidade>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCidade>(this.url, objeto, true)
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

  public alterar(objeto: ModelCidade): Promise<ModelCidade> {
    return new Promise<ModelCidade>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCidade>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelCidade> {
    return new Promise<ModelCidade>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCidade>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCidade>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCidade>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCidade>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-cidade.service.ts');
                                     /* coluna: string                            , nomeCampo: string       , propriedade: string  , formatoColuna,             filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCidade')           , 'Cidade.IDCidade'       , 'IDCidade'           , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDUF')               , 'Cidade.IDUF'           , 'IDUF'               , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviadoPais'), 'Pais.chNomeAbreviado'  , 'chNomeAbreviadoPais', enum_formatoColuna.texto , false     , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chSiglaUF')          , 'UF.chSigla'            , 'chSiglaUF'          , enum_formatoColuna.texto , false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNome')             , 'Cidade.chNome'         , 'chNome'             , enum_formatoColuna.texto , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviado')    , 'Cidade.chNomeAbreviado', 'chNomeAbreviado'    , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCEPUnico')         , 'Cidade.chCEPUnico'     , 'chCEPUnico'         , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodIBGE')          , 'Cidade.chCodIBGE'      , 'chCodIBGE'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPais')             , 'Pais.IDPais'           , 'IDPais'             , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPais')          , 'Pais.chCodPais'        , 'chCodPais'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePais')         , 'Pais.chNome'           , 'chNomePais'         , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUF')           , 'UF.chNome'             , 'chNomeUF'           , enum_formatoColuna.texto , true      , true));

    return colunas;
  }
}
