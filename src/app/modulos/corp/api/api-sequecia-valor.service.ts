import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelSequenciaValor } from '../models/model-sequencia-valor';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiSequeciaValorService {
  private chCodSequencia: string;
  private url: string = 'corp/api/SequenciaValor';
  private orderByColumnName: string = 'IDSequenciaValor';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDSequenciaValor';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSequenciaValor): Promise<ModelSequenciaValor> {
    return new Promise<ModelSequenciaValor>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSequenciaValor>(this.url, objeto, true)
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

  public alterar(objeto: ModelSequenciaValor): Promise<ModelSequenciaValor> {
    return new Promise<ModelSequenciaValor>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSequenciaValor>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelSequenciaValor> {
    return new Promise<ModelSequenciaValor>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSequenciaValor>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSequenciaValor>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //Aplicando filtro de pessoa por padrão
    if (this.chCodSequencia != "") {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `chCodSequencia~eq~'${this.chCodSequencia}'`;
    } else {
      console.error('O chCodSequencia deve ser passado para o grid antes de executar a pesquisa')
    }


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }


    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSequenciaValor>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSequenciaValor>>(url, true)
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

  public getChCodSequencia() {
    return this.chCodSequencia;
  }

  public setChCodSequencia(chCodSequencia: string) {
    this.chCodSequencia = chCodSequencia;
  }
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-sequencia-valor.service.ts');
                                     /* coluna: string                         , nomeCampo: string , propriedade: string, formatoColuna              , filterable , hidden, detalheGrid, width */    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSequenciaValor'), 'IDSequenciaValor', 'IDSequenciaValor' , enum_formatoColuna.numero  , true       , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSequencia')  , 'chCodSequencia'  , 'chCodSequencia'   , enum_formatoColuna.texto   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumLimInferior'), 'inNumLimInferior', 'inNumLimInferior' , enum_formatoColuna.numero  , false      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumLimSuperior'), 'inNumLimSuperior', 'inNumLimSuperior' , enum_formatoColuna.numero  , false      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumUltimo')     , 'inNumUltimo'     , 'inNumUltimo'      , enum_formatoColuna.numero  , false      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIncremento') , 'inNumIncremento' , 'inNumIncremento'  , enum_formatoColuna.numero  , false      , false , false      , 100));    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltNum')     , 'dtDatUltNum'     , 'dtDatUltNum'      , enum_formatoColuna.dataHora, false      , true));

    return colunas;
  }
}