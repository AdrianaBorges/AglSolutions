import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelProdSegValor } from '../models/model-prod-seg-valor';
import { ModelProdSeg } from '../models/model-prod-seg';

@Injectable()
export class ApiProdSegValorService {
  private url: string = 'eseg/api/ProdSegValor';
  private orderByColumnName: string = 'IDProdSegValor';
  private sortType: string = 'asc';
  private prodSeg: ModelProdSeg;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService

  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDProdSegValor';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelProdSegValor): Promise<ModelProdSegValor> {
    return new Promise<ModelProdSegValor>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelProdSegValor>(this.url, objeto, true)
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

  public alterar(objeto: ModelProdSegValor): Promise<ModelProdSegValor> {
    return new Promise<ModelProdSegValor>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelProdSegValor>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelProdSegValor> {
    return new Promise<ModelProdSegValor>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelProdSegValor>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelProdSegValor>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

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

    return new Promise<Array<ModelProdSegValor>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelProdSegValor>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-prod-seg-valor.service.ts');
                                                          /* coluna: string      , nomeCampo: string                , propriedade: string , formatoColuna            , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSegValor')    , 'ProdSegValor.IDProdSegValor'    , 'IDProdSegValor'    , enum_formatoColuna.numero, true       , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSeg')         , 'ProdSegValor.IDProdSeg'         , 'IDProdSeg'         , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodProdSeg')      , 'ProdSeg.chCodProdSeg'           , 'chCodProdSeg'      , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProdSeg')      , 'ProdSeg.chDescricao'            , 'chDesProdSeg'      , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValCapital')      , 'ProdSegValor.deValCapital'      , 'deValCapital'      , enum_formatoColuna.moeda , true       , false , false      , 160));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValPremioBruto')  , 'ProdSegValor.deValPremioBruto'  , 'deValPremioBruto'  , enum_formatoColuna.moeda , true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValIOF')          , 'ProdSegValor.deValIOF'          , 'deValIOF'          , enum_formatoColuna.moeda , false      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValServico')      , 'ProdSegValor.deValServico'      , 'deValServico'      , enum_formatoColuna.moeda , false      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValPremioLiquido'), 'ProdSegValor.deValPremioLiquido', 'deValPremioLiquido', enum_formatoColuna.moeda , false      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatIniVig')       , 'ProdSegValor.daDatIniVig'       , 'daDatIniVig'       , enum_formatoColuna.data  , true       , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFimVig')       , 'ProdSegValor.daDatFimVig'       , 'daDatFimVig'       , enum_formatoColuna.data  , true       , false , false      , 120));

    return colunas;
  }
}
