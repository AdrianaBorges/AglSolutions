import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { ModelTipoSeguro } from '../models/model-tipo-seguro';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiTipoSeguroService implements InterfaceColunasGrid  {  
  private url: string = 'eseg/api/TipoSeguro';
  private orderByColumnName: string = 'inCodTipoSeguro';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoSeguro';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoSeguro): Promise<ModelTipoSeguro>{
    return new Promise<ModelTipoSeguro>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelTipoSeguro>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoSeguro): Promise<ModelTipoSeguro>{
    return new Promise<ModelTipoSeguro>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelTipoSeguro>(this.url, objeto, true)
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

        let url: string = `${this.url}/${id}`;

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

  public obter(id: number): Promise<ModelTipoSeguro>{
    return new Promise<ModelTipoSeguro>(
      (resolve, reject)=>{

        let url: string = this.url +'/'+id+'/';

        this.apiGatewayService.get<ModelTipoSeguro>(url, true)
        .then(
          objeto_retornado=> {
            console.log(objeto_retornado[0]);
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoSeguro>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoSeguro>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelTipoSeguro>>(url, true)
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
  public getColunasGrid(): GridPesquisaColumn[] {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-tipo-seguro.service.ts');
                                     /* coluna: string                        , nomeCampo: string, propriedade: string, formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoSeguro'), 'inCodTipoSeguro', 'inCodTipoSeguro'  , enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')    , 'chDescricao'    , 'chDescricao'      , enum_formatoColuna.texto , true      , false , false      , 500));
    
    return colunas;
  }
}