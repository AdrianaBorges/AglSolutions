import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { ModelParamCorp } from '../models/model-param-corp';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiParamCorpService implements InterfaceColunasGrid {
  private url: string = 'corp/api/ParamCorp';
  private orderByColumnName: string = 'chCodParamCorp';
  private sortType: string = 'asc';
  
  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'chCodParamCorp';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelParamCorp): Promise<ModelParamCorp>{
    return new Promise<ModelParamCorp>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelParamCorp>(this.url, objeto, true)
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

  public alterar(objeto: ModelParamCorp): Promise<ModelParamCorp>{
    return new Promise<ModelParamCorp>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelParamCorp>(this.url, objeto, true)
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

  public excluir(id: any): Promise<boolean>{
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelParamCorp>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelParamCorp>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelParamCorp>>(url, true)
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

  public obter(id: string): Promise<ModelParamCorp>{
    return new Promise<ModelParamCorp>(
      (resolve, reject)=>{

        let url: string = this.url +'/'+id+'/';

        this.apiGatewayService.get<ModelParamCorp>(url, true)
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
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): GridPesquisaColumn[] {
    var colunas: GridPesquisaColumn[];
    colunas = [];
   
    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-param-corp.service.ts');
   
                                     /* coluna: string                        , nomeCampo: string, propriedade: string, formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodParamCorp') , 'chCodParamCorp' , 'chCodParamCorp'   , enum_formatoColuna.texto , true      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')    , 'chDescricao'    , 'chDescricao'      , enum_formatoColuna.texto , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao'), 'chDesObservacao', 'chDesObservacao'  , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Valor')          , 'chValor'        , 'chValor'          , enum_formatoColuna.texto , true      , true));

    return colunas;
  }
}
