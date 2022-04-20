import { Injectable } from '@angular/core';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ModelProdSegCobertura } from '../models/model-prod-seg-cobertura';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelProdSeg } from '../models/model-prod-seg';

@Injectable()
export class ApiProdSegCoberturaService {


  private url: string = 'eseg/api/ProdSegCobertura';
  private orderByColumnName: string = 'IDProdSegCobertura';
  private sortType: string = 'asc';


  private prodSeg: ModelProdSeg;


  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService

  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDProdSegCobertura';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelProdSegCobertura): Promise<ModelProdSegCobertura> {
    return new Promise<ModelProdSegCobertura>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelProdSegCobertura>(this.url, objeto, true)
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

  public alterar(objeto: ModelProdSegCobertura): Promise<ModelProdSegCobertura> {
    return new Promise<ModelProdSegCobertura>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelProdSegCobertura>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelProdSegCobertura> {
    return new Promise<ModelProdSegCobertura>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelProdSegCobertura>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelProdSegCobertura>> {

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

    return new Promise<Array<ModelProdSegCobertura>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelProdSegCobertura>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-prod-seg-cobertura.service.ts');
                                                          /* coluna: string           , nomeCampo: string                    , propriedade: string      , formatoColuna            , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSegCobertura')     , 'ProdSegCobertura.IDProdSegCobertura', 'IDProdSegCobertura'     , enum_formatoColuna.numero, true       , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSeguradora')           , 'CoberturaSeg.IDSeguradora'          , 'IDSeguradora'           , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaSeguradora')     , 'PapelSeguradora.IDPessoa'           , 'IDPessoaSeguradora'     , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaSeguradora'), 'PapelSeguradora.IDPapelPessoa'      , 'IDPapelPessoaSeguradora', enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSeg')              , 'ProdSegCobertura.IDProdSeg'         , 'IDProdSeg'              , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodProdSeg')           , 'ProdSeg.chCodProdSeg'               , 'chCodProdSeg'           , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProdSeg')           , 'ProdSeg.chDescricao'                , 'chDesProdSeg'           , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCoberturaSeg')         , 'ProdSegCobertura.IDCoberturaSeg'    , 'IDCoberturaSeg'         , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCoberturaSeg')      , 'CoberturaSeg.chCodCoberturaSeg'     , 'chCodCoberturaSeg'      , enum_formatoColuna.texto , true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCoberturaSeg')      , 'CoberturaSeg.chDescricao'           , 'chDesCoberturaSeg'      , enum_formatoColuna.texto , true       , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesExtCoberturaSeg')   , 'CoberturaSeg.chDesExterna'          , 'chDesExtCoberturaSeg'   , enum_formatoColuna.texto , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatIniVig')            , 'ProdSegCobertura.daDatIniVig'       , 'daDatIniVig'            , enum_formatoColuna.data  , true       , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFimVig')            , 'ProdSegCobertura.daDatFimVig'       , 'daDatFimVig'            , enum_formatoColuna.data  , true       , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValCobertura')         , 'ProdSegCobertura.deValCobertura'    , 'deValCobertura'         , enum_formatoColuna.moeda , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValCoberturaMin')      , 'ProdSegCobertura.deValCoberturaMin' , 'deValCoberturaMin'      , enum_formatoColuna.moeda , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValCoberturaMax')      , 'ProdSegCobertura.deValCoberturaMax' , 'deValCoberturaMax'      , enum_formatoColuna.moeda , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValLimitePorCPF')      , 'ProdSegCobertura.deValLimitePorCPF' , 'deValLimitePorCPF'      , enum_formatoColuna.moeda , true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumDiaCarencia')       , 'ProdSegCobertura.inNumDiaCarencia'  , 'inNumDiaCarencia'       , enum_formatoColuna.numero, true       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumDiaFranquia')       , 'ProdSegCobertura.inNumDiaFranquia'  , 'inNumDiaFranquia'       , enum_formatoColuna.numero, true       , true));
    return colunas;
  }

}
