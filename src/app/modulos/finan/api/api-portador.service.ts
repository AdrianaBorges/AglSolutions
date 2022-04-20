import { Injectable } from '@angular/core';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelPortador } from '../models/model-portador';

@Injectable({
  providedIn: 'root'
})
export class ApiPortadorService implements InterfaceColunasGrid {
  
  private url: string = 'finan/api/Portador';
  private orderByColumnName: string = 'inCodPortador';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodPortador';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }  

  public criar(objeto: ModelPortador): Promise<ModelPortador> {
    return new Promise<ModelPortador>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPortador>(this.url, objeto, true)
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

  public alterar(objeto: ModelPortador): Promise<ModelPortador> {
    return new Promise<ModelPortador>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPortador>(this.url, objeto, true)
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

  public pesquisarPorId(id: number): Promise<ModelPortador> {
    return new Promise<ModelPortador>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPortador[]>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPortador>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPortador>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPortador>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.finan.api.api-portador.service.ts');
                                     /* coluna: string                              , nomeCampo: string              , propriedade: string     , formatoColuna               , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodPortador')        , 'Portador.inCodPortador'       , 'inCodPortador'         , enum_formatoColuna.numero   , true       , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomAbreviado')       , 'Portador.chNomAbreviado'      , 'chNomAbreviado'        , enum_formatoColuna.texto    , true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNome')               , 'Portador.chNome'              , 'chNome'                , enum_formatoColuna.texto    , true       , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodBanco')           , 'Portador.inCodBanco'          , 'inCodBanco'            , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chAgencia')            , 'Portador.chAgencia'           , 'chAgencia'             , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDVAgencia')          , 'Portador.chDVAgencia'         , 'chDVAgencia'           , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chConta')              , 'Portador.chConta'             , 'chConta'               , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDVConta')            , 'Portador.chDVConta'           , 'chDVConta'             , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chConvenioCobranca')   , 'Portador.chConvenioPortado'   , 'chConvenioCobranca'    , enum_formatoColuna.texto    , false      , true));    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSeqNossoNum')     , 'Portador.chCodSeqNossoNum'    , 'chCodSeqNossoNum'      , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSeqRemCob')       , 'Portador.chCodSeqRemCob'      , 'chCodSeqRemCob'        , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomPastaArqRem')     , 'Portador.chNomPastaArqRem'    , 'chNomPastaArqRem'      , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomArqRem')          , 'Portador.chNomArqRem'         , 'chNomArqRem'           , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodTransmissao')     , 'Portador.chCodTransmissao'    , 'chCodTransmissao'      , enum_formatoColuna.texto    , false      , true));

    return colunas;
  }
}