import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelSequencia } from '../models/model-sequencia';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiSequeciaService {
  private url: string = 'corp/api/Sequencia';
  private orderByColumnName: string = 'chCodSequencia';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'chCodSequencia';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSequencia): Promise<ModelSequencia>{
    return new Promise<ModelSequencia>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelSequencia>(this.url, objeto, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public alterar(objeto: ModelSequencia): Promise<ModelSequencia>{
    return new Promise<ModelSequencia>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelSequencia>(this.url, objeto, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public excluir(id: string): Promise<boolean>{
    return new Promise<boolean>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.delete<boolean>(url, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public obter(id: string): Promise<ModelSequencia>{
    return new Promise<ModelSequencia>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}/`;

        this.apiGatewayService.get<ModelSequencia>(url, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSequencia>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelSequencia>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelSequencia>>(url, true)
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
  public getColunasGrid(): Array<GridPesquisaColumn>{
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-sequencia.service.ts');
                                     /* coluna: string                       , nomeCampo: string, propriedade: string, formatoColuna           , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSequencia'), 'chCodSequencia' , 'chCodSequencia'   , enum_formatoColuna.texto, true       , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')   , 'chDescricao'    , 'chDescricao'      , enum_formatoColuna.texto, true       , false , false      , 500));
  
    return colunas;
  }
}