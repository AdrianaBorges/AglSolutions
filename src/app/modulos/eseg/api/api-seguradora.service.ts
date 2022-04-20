import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelSeguradora } from '../models/model-seguradora';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiSeguradoraService {
  private url: string = 'eseg/api/SeguradoraEL01';
  private orderByColumnName: string = 'IDSeguradora';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDSeguradora';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSeguradora): Promise<ModelSeguradora> {
    return new Promise<ModelSeguradora>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSeguradora>(this.url, objeto, true)
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

  public alterar(objeto: ModelSeguradora): Promise<ModelSeguradora> {
    return new Promise<ModelSeguradora>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSeguradora>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelSeguradora> {
    return new Promise<ModelSeguradora>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSeguradora>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSeguradora>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSeguradora>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSeguradora>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-seguradora.service.ts');
                                     /* coluna: string                                , nomeCampo: string                    , propriedade: string      , formatoColuna                        , filterable, hidden, detalheGrid, width */                    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSeguradora')           , 'Seguradora.IDSeguradora'            , 'IDSeguradora'           , enum_formatoColuna.numero            , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaSeguradora')     , 'PapelPessoaSeguradora.IDPessoa'     , 'IDPessoaSeguradora'     , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaSeguradora'), 'Seguradora.IDPapelPessoaSeguradora' , 'IDPapelPessoaSeguradora', enum_formatoColuna.numero            , false     , true));
    //colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJSeguradora')       , 'PessoaSeguradora.inNumIdentificacao', 'inCNPJSeguradora'       , enum_formatoColuna.numero_sem_formato, true      , false , false      , 180));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inCNPJSeguradora')       , 'PessoaSeguradora.inNumIdentificacao', 'inCNPJSeguradoraFormatado'       , enum_formatoColuna.texto, true      , false , 180,this.formatarCampo));

    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviado')        , 'Seguradora.chNomeAbreviado'         , 'chNomeAbreviado'        , enum_formatoColuna.texto             , true      , false , false      , 300));        
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeSeguradora')       , 'PessoaSeguradora.chNomePessoa'      , 'chNomeSeguradora'       , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumSusep')             , 'Seguradora.chNumSusep'              , 'chNumSusep'             , enum_formatoColuna.texto             , false     , true));        
    
    return colunas;
  }

  
  private formatarCampo(obj: any): string {

    let identificacao: string;
    let qtde = obj.inCNPJSeguradora.toString().length;
    let cnpj ='0'.repeat(14-qtde)+ obj.inCNPJSeguradora.toString();
    identificacao =cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    return identificacao;
  }
}