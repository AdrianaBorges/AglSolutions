import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelGrupoUsuario } from '../models/model-grupo-usuario';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable()
export class ApiGrupoUsuarioService {

  private url: string = 'segur/api/GrupoUsuario';
  private orderByColumnName: string = 'chCodGrupoUsuario';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'chCodGrupoUsuario';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelGrupoUsuario): Promise<ModelGrupoUsuario> {
    return new Promise<ModelGrupoUsuario>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelGrupoUsuario>(this.url, objeto, true)
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

  public alterar(objeto: ModelGrupoUsuario): Promise<ModelGrupoUsuario> {
    return new Promise<ModelGrupoUsuario>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelGrupoUsuario>(this.url, objeto, true)
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

  public excluir(id: string): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

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

  public obter(id: string): Promise<ModelGrupoUsuario> {
    return new Promise<ModelGrupoUsuario>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelGrupoUsuario>(url, true)
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
  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelGrupoUsuario>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelGrupoUsuario>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelGrupoUsuario>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-grupo-usuario.service.ts');
                                     /* coluna: string                            , nomeCampo: string   , propriedade: string, formatoColuna           , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodGrupoUsuario')  , 'chCodGrupoUsuario' , 'chCodGrupoUsuario', enum_formatoColuna.texto, true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoUsuario')  , 'chDesGrupoUsuario' , 'chDesGrupoUsuario', enum_formatoColuna.texto, true       , false , false      , 350));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')    , 'chDesObservacao'   , 'chDesObservacao'  , enum_formatoColuna.texto, false      , true));
    
    return colunas;
  }
}