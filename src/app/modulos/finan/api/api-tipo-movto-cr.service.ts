import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelTipoMovtoCR } from '../models/model-tipo-movto-cr';

@Injectable()
export class ApiTipoMovtoCrService implements InterfaceColunasGrid  {
  private url: string = 'finan/api/TipoMovtoCR';
  private orderByColumnName: string = 'inCodTipoMovtoCR';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoMovtoCR';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoMovtoCR): Promise<ModelTipoMovtoCR>{
    return new Promise<ModelTipoMovtoCR>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelTipoMovtoCR>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoMovtoCR): Promise<ModelTipoMovtoCR>{
    return new Promise<ModelTipoMovtoCR>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelTipoMovtoCR>(this.url, objeto, true)
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
  public obter(id: number): Promise<ModelTipoMovtoCR>{
    return new Promise<ModelTipoMovtoCR>(
      (resolve, reject)=>{

        let url: string = this.url +'/'+id+'/';

        this.apiGatewayService.get<ModelTipoMovtoCR>(url, true)
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


  public pesquisarPorId(id: number): Promise<ModelTipoMovtoCR> {
    return new Promise<ModelTipoMovtoCR>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoMovtoCR[]>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoMovtoCR>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoMovtoCR>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelTipoMovtoCR>>(url, true)
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

    localeFile = this.assetsLocaleService.getLocaleFile('modulos.finan.api.api-tipo-movto-cr.service.ts');
                                     /* coluna: string                             , nomeCampo: string                  , propriedade: string   , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoMovtoCR')   , 'TipoMovtoCR.inCodTipoMovtoCR'   , 'inCodTipoMovtoCR'   , enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')        , 'TipoMovtoCR.chDescricao'        , 'chDescricao'        , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}
