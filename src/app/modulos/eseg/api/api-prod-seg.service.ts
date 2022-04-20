import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelProdSeg } from '../models/model-prod-seg';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiProdSegService {
  private url: string = 'eseg/api/ProdSeg';
  private orderByColumnName: string = 'IDProdSeg';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoa';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelProdSeg): Promise<ModelProdSeg> {
    return new Promise<ModelProdSeg>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelProdSeg>(this.url, objeto, true)
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

  public alterar(objeto: ModelProdSeg): Promise<ModelProdSeg> {
    return new Promise<ModelProdSeg>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelProdSeg>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelProdSeg> {
    return new Promise<ModelProdSeg>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelProdSeg>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelProdSeg>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelProdSeg>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelProdSeg>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-prod-seg.service.ts');
                                     /* coluna: string                              , nomeCampo: string               , propriedade: string     , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProdSeg')            , 'ProdSeg.IDProdSeg'             , 'IDProdSeg'             , enum_formatoColuna.numero, true      , false   , false, 70));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodProdSeg')         , 'ProdSeg.chCodProdSeg'          , 'chCodProdSeg'          , enum_formatoColuna.texto , true      , false   ,false , 90));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSeguradora')         , 'ProdSeg.IDSeguradora'          , 'IDSeguradora'          , enum_formatoColuna.numero, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeSeguradora')     , 'PessoaSeguradora.chNomePessoa' , 'chNomeSeguradora'      , enum_formatoColuna.texto , false     , false, false, 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDRamoSeguro')         , 'ProdSeg.IDRamoSeguro'          , 'IDRamoSeguro'          , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodGrupoSeguro')     , 'RamoSeguro.inCodGrupoSeguro'   , 'inCodGrupoSeguro'      , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoSeguro')     , 'GrupoSeguro.chDescricao'       , 'chDesGrupoSeguro'      , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRamoSeguro')      , 'RamoSeguro.inCodRamoSeguro'    , 'inCodRamoSeguro'       , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesRamoSeguro')      , 'RamoSeguro.chDescricao'        , 'chDesRamoSeguro'       , enum_formatoColuna.texto , true      , true));    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoCobrancaSeg') , 'ProdSeg.inCodTipoCobrancaSeg'  , 'inCodTipoCobrancaSeg'  , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoCobrancaSeg') , 'TipoCobranca.chDescricao'      , 'chDesTipoCobrancaSeg'  , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoSeguro')      , 'ProdSeg.inCodTipoSeguro'       , 'inCodTipoSeguro'       , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')          , 'ProdSeg.chDescricao'           , 'chDescricao'           , enum_formatoColuna.texto , true      , false ,false , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoSeguro')      , 'TipoSeguro.chDescricao'        , 'chDesTipoSeguro'       , enum_formatoColuna.texto , false     , false ,false , 180));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatIniVenda')        , 'ProdSeg.daDatIniVenda'         , 'daDatIniVenda'         , enum_formatoColuna.data  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatFimVenda')        , 'ProdSeg.daDatFimVenda'         , 'daDatFimVenda'         , enum_formatoColuna.data  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPerContrib')  , 'ProdSeg.inCodTipoPerContrib'   , 'inCodTipoPerContrib'   , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPerContrib')  , 'TipoPerContrib.chDescricao'    , 'chDesTipoPerContrib'   , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCoberturaSeg')       , 'ProdSeg.IDCoberturaSeg'        , 'IDCoberturaSeg'        , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCoberturaSeg')    , 'CoberturaSeg.chCodCoberturaSeg', 'chCodCoberturaSeg'     , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCoberturaSeg')    , 'CoberturaSeg.chDescricao'      , 'chDesCoberturaSeg'     , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSeqPropSeg')      , 'ProdSeg.chCodSeqPropSeg'       , 'chCodSeqPropSeg'       , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inPrefNumPropSeg')     , 'ProdSeg.inPrefNumPropSeg'      , 'inPrefNumPropSeg'      , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumDigSeqPropSeg')   , 'ProdSeg.inNumDigSeqPropSeg'    , 'inNumDigSeqPropSeg'    , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesDetalhe')         , 'ProdSeg.chDesDetalhe'          , 'chDesDetalhe'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodProdExt')         , 'ProdSeg.chCodProdExt'          , 'chCodProdExt'          , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSusep')           , 'ProdSeg.chNumSusep'            , 'chNumSusep'            , enum_formatoColuna.texto , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdadeMin')        , 'ProdSeg.inNumIdadeMin'         , 'inNumIdadeMin'         , enum_formatoColuna.numero, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdadeMax')        , 'ProdSeg.inNumIdadeMax'         , 'inNumIdadeMax'         , enum_formatoColuna.numero, true      , true));
    return colunas;
  }
}
