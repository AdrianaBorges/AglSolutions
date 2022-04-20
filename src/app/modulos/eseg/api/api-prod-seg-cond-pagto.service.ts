import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelProdSegCondPagto } from '../models/model-prod-seg-cond-pagto';
import { ModelProdSeg } from '../models/model-prod-seg';

@Injectable()
export class ApiProdSegCondPagtoService {



  private url: string = 'eseg/api/ProdSegCondPagto';
  private orderByColumnName: string = 'IDProdSegCondPagto';
  private sortType: string = 'asc';


  private prodSeg: ModelProdSeg;


  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService

  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDProdSegCondPagto';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelProdSegCondPagto): Promise<ModelProdSegCondPagto> {
    return new Promise<ModelProdSegCondPagto>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelProdSegCondPagto>(this.url, objeto, true)
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

  public alterar(objeto: ModelProdSegCondPagto): Promise<ModelProdSegCondPagto> {
    return new Promise<ModelProdSegCondPagto>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelProdSegCondPagto>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelProdSegCondPagto> {
    return new Promise<ModelProdSegCondPagto>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelProdSegCondPagto>(url, true)
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
  public setProdSeg(IDProdSeg: ModelProdSeg) {
    this.prodSeg = IDProdSeg;
  }

  public getProdSeg(): ModelProdSeg {
    return this.prodSeg;
  }


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelProdSegCondPagto>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de Chgrupo
   //Aplicando filtro de Chgrupo
   if ((this.prodSeg != null) && (this.prodSeg != undefined)) {
    if (filter != '') {
      filter += `~and~`;
    }
    filter += `ProdSeg.IDProdSeg~eq~'${this.prodSeg.IDProdSeg}'`;

  }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelProdSegCondPagto>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelProdSegCondPagto>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-prod-seg-cond-pagto.service.ts');
                                                          /* coluna: string      , nomeCampo: string                    , propriedade: string , formatoColuna            , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSegCondPagto'), 'ProdSegCondPagto.IDProdSegCondPagto', 'IDProdSegCondPagto', enum_formatoColuna.numero, true       , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSeg')         , 'ProdSegCondPagto.IDProdSeg'         , 'IDProdSeg'         , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodProdSeg')      , 'ProdSeg.chCodProdSeg'               , 'chCodProdSeg'      , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProdSeg')      , 'ProdSeg.chDescricao'                , 'chDesProdSeg'      , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCondPagto')    , 'ProdSegCondPagto.chCodCondPagto'    , 'chCodCondPagto'    , enum_formatoColuna.texto , true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCondPagto')    , 'CondPagto.chDescricao'              , 'chDesCondPagto'    , enum_formatoColuna.texto , true       , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatIniVig')       , 'ProdSegCondPagto.daDatIniVig'       , 'daDatIniVig'       , enum_formatoColuna.data  , true       , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFimVig')       , 'ProdSegCondPagto.daDatFimVig'       , 'daDatFimVig'       , enum_formatoColuna.data  , true       , false , false      , 120));
    
    return colunas;
  }

}
