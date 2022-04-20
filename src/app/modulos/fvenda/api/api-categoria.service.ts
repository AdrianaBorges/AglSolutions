import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelCategoria } from '../models/model-categoria';

@Injectable()
export class ApiCategoriaService {

  private url: string = 'fvenda/api/Categoria';
  private orderByColumnName: string = 'chCodCategoria';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodCategoria';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCategoria): Promise<ModelCategoria> {
    return new Promise<ModelCategoria>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCategoria>(this.url, objeto, true)
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

  public alterar(objeto: ModelCategoria): Promise<ModelCategoria> {
    return new Promise<ModelCategoria>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCategoria>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelCategoria> {
    return new Promise<ModelCategoria>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCategoria>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCategoria>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCategoria>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCategoria>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-categoria.service.ts');
                                                          /* coluna: string     , nomeCampo: string            , propriedade: string, formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCategoria')      , 'Categoria.IDCategoria'      , 'IDCategoria'      , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCategoria')   , 'Categoria.chCodCategoria'   , 'chCodCategoria'   , enum_formatoColuna.texto             , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')      , 'Categoria.chDescricao'      , 'chDescricao'      , enum_formatoColuna.texto             , true      , false , false      , 350));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCategoriaPai')   , 'Categoria..IDCategoriaPai'  , 'IDCategoriaPai'   , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCategoriaPai'), 'CategoriaPai.chCodCategoria', 'chCodCategoriaPai', enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCategoriaPai'), 'CategoriaPai.chDescricao'   , 'chDesCategoriaPai', enum_formatoColuna.texto             , true      , false , false      , 350));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumNivel')       , 'Categoria.inNumNivel'       , 'inNumNivel'       , enum_formatoColuna.numero            , true      , true));
    
    return colunas;
  }
}
