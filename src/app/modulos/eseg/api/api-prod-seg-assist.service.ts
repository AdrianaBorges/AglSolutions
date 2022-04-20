import { Injectable } from '@angular/core';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ModelProdSegAssist } from '../models/model-prod-seg-assist';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelProdSeg } from '../models/model-prod-seg';

@Injectable()
export class ApiProdSegAssistService {


  private url: string = 'eseg/api/ProdSegAssist';
  private orderByColumnName: string = 'IDProdSegAssist';
  private sortType: string = 'asc';


  private prodSeg: ModelProdSeg;


  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService

  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDProdSegAssist';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelProdSegAssist): Promise<ModelProdSegAssist> {
    return new Promise<ModelProdSegAssist>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelProdSegAssist>(this.url, objeto, true)
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

  public alterar(objeto: ModelProdSegAssist): Promise<ModelProdSegAssist> {
    return new Promise<ModelProdSegAssist>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelProdSegAssist>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelProdSegAssist> {
    return new Promise<ModelProdSegAssist>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelProdSegAssist>(url, true)
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


  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelProdSegAssist>> {

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

    return new Promise<Array<ModelProdSegAssist>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelProdSegAssist>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-prod-seg-assist.service.ts');
                                                          /* coluna: string           , nomeCampo: string               , propriedade: string      , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSegAssist')        , 'ProdSegAssist.IDProdSegAssist' , 'IDProdSegAssist'        , enum_formatoColuna.numero, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSeguradora')           , 'AssistSeg.IDSeguradora'        , 'IDSeguradora'           , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaSeguradora')     , 'PapelSeguradora.IDPessoa'      , 'IDPessoaSeguradora'     , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaSeguradora'), 'PapelSeguradora.IDPapelPessoa' , 'IDPapelPessoaSeguradora', enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSeg')              , 'ProdSegAssist.IDProdSeg'       , 'IDProdSeg'              , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodProdSeg')           , 'ProdSeg.chCodProdSeg'          , 'chCodProdSeg'           , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProdSeg')           , 'ProdSeg.chDescricao'           , 'chDesProdSeg'           , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDAssistSeg')            , 'ProdSegAssist.IDAssistSeg'     , 'IDAssistSeg'            , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodAssistSeg')         , 'AssistSeg.chCodAssistSeg'      , 'chCodAssistSeg'         , enum_formatoColuna.texto , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesAssistSeg')         , 'AssistSeg.chDescricao'         , 'chDesAssistSeg'         , enum_formatoColuna.texto , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesExtAssistSeg')      , 'AssistSeg.chDesExterna'        , 'chDesExtAssistSeg'      , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatIniVig')            , 'ProdSegAssist.daDatIniVig'     , 'daDatIniVig'            , enum_formatoColuna.data  , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFimVig')            , 'ProdSegAssist.daDatFimVig'     , 'daDatFimVig'            , enum_formatoColuna.data  , true      , false , false      , 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValLimite')            , 'ProdSegAssist.deValLimite'     , 'deValLimite'            , enum_formatoColuna.moeda , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inQtdEventos')           , 'ProdSegAssist.inQtdEventos'    , 'inQtdEventos'           , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumDiaCarencia')       , 'ProdSegAssist.inNumDiaCarencia', 'inNumDiaCarencia'       , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumDiaFranquia')       , 'ProdSegAssist.inNumDiaFranquia', 'inNumDiaFranquia'       , enum_formatoColuna.numero, true      , true));    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCoberturaSeg')         , 'ProdSegAssist.IDCoberturaSeg'  , 'IDCoberturaSeg'         , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCoberturaSeg')      , 'CoberturaSeg.chCodCoberturaSeg', 'chCodCoberturaSeg'      , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCoberturaSeg')      , 'CoberturaSeg.chDescricao'      , 'chDesCoberturaSeg'      , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesExtCoberturaSeg')   , 'CoberturaSeg.chDesExterna'     , 'chDesExtCoberturaSeg'   , enum_formatoColuna.texto , true      , true));

    return colunas;
  }

}
