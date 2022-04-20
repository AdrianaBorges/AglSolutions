import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelEmpresa } from '../models/model-empresa';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiEmpresaService {
  private url: string = 'corp/api/EmpresaEL01';
  private orderByColumnName: string = 'IDEmpresa';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDEmpresa';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelEmpresa): Promise<ModelEmpresa> {
    return new Promise<ModelEmpresa>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelEmpresa>(this.url, objeto, true)
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

  public alterar(objeto: ModelEmpresa): Promise<ModelEmpresa> {
    return new Promise<ModelEmpresa>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelEmpresa>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelEmpresa> {
    return new Promise<ModelEmpresa>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelEmpresa>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelEmpresa>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelEmpresa>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelEmpresa>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-empresa.service.ts');
                                     /* coluna: string                      , nomeCampo: string          , propriedade: string, formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDEmpresa')    , 'Empresa.IDEmpresa'        , 'IDEmpresa'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')     , 'PapelPessoa.IDPessoa'     , 'IDPessoa'         , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoa'), 'Empresa.IDPapelPessoa'    , 'IDPapelPessoa'    , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEmpresa') , 'Empresa.chCodEmpresa'     , 'chCodEmpresa'     , enum_formatoColuna.texto             , true      , false , false      , 100));
    //colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJEmpresa'), 'Pessoa.inNumIdentificacao', 'inCNPJEmpresa'    , enum_formatoColuna.numero_sem_formato, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inCNPJEmpresa'), 'Pessoa.inNumIdentificacao', 'inCNPJEmpresaFormatado'    , enum_formatoColuna.texto, true      , false , 150,this.formatarCampo));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeEmpresa'), 'Pessoa.chNomePessoa'      , 'chNomeEmpresa'    , enum_formatoColuna.texto             , true      , false , false      , 500));

    return colunas;
  }

  
  private formatarCampo(obj: any): string {

     let identificacao: string;
     let qtde = obj.inCNPJEmpresa.toString().length;
     let document = '0'.repeat(14-qtde)+ obj.inCNPJEmpresa.toString();
     identificacao = document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5"); //    `${document.substr(0, 2)}.${document.substr(2, 3)}.${document.substr(5, 3)}/${document.substr(8, 4)}-${document.substr(12, 2)}`
    return identificacao;
  }
  
}