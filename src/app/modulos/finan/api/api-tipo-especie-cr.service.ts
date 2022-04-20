import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelTipoEspecieCR } from '../models/model-tipo-especie-cr';

@Injectable()
export class ApiTipoEspecieCrService implements InterfaceColunasGrid {
  private url: string = 'finan/api/TipoEspecieCR';
  private orderByColumnName: string = 'inCodTipoEspecieCR';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoEspecieCR';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoEspecieCR): Promise<ModelTipoEspecieCR> {
    return new Promise<ModelTipoEspecieCR>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTipoEspecieCR>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoEspecieCR): Promise<ModelTipoEspecieCR> {
    return new Promise<ModelTipoEspecieCR>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTipoEspecieCR>(this.url, objeto, true)
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

  public pesquisarPorId(id: number): Promise<ModelTipoEspecieCR> {
    return new Promise<ModelTipoEspecieCR>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoEspecieCR[]>(url, true)
          .then(
          objeto_retornado => {
            if (objeto_retornado.length > 0) {
              resolve(objeto_retornado[0]);
            } else {
              resolve(null);
            }
          },
          erro => {
            reject(erro);
          }
          );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoEspecieCR>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoEspecieCR>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTipoEspecieCR>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.finan.api.api-tipo-especie-cr.service.ts');
                                     /* coluna: string                           , nomeCampo: string                 , propriedade: string , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoEspecieCR'), 'TipoEspecieCR.inCodTipoEspecieCR', 'inCodTipoEspecieCR', enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')       , 'TipoEspecieCR.chDescricao'       , 'chDescricao'       , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}

