
import { Injectable } from '@angular/core';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ModelTipoPessoaEmail } from '../models/model-tipo-pessoa-email';

@Injectable()
export class ApiTipoDocumentoPessoaEmailService implements InterfaceColunasGrid {
  private url: string = 'corp/api/TipoPessoaEmail';
  private orderByColumnName: string = 'inCodTipoPessoaEmail';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoPessoaEmail';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoPessoaEmail): Promise<ModelTipoPessoaEmail>{
    return new Promise<ModelTipoPessoaEmail>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelTipoPessoaEmail>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoPessoaEmail): Promise<ModelTipoPessoaEmail>{
    return new Promise<ModelTipoPessoaEmail>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelTipoPessoaEmail>(this.url, objeto, true)
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

  public excluir(id: number): Promise<boolean>{
    return new Promise<boolean>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.delete<boolean>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoPessoaEmail>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoPessoaEmail>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelTipoPessoaEmail>>(url, true)
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

  public obter(id: number): Promise<ModelTipoPessoaEmail>{
    return new Promise<ModelTipoPessoaEmail>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoPessoaEmail>(url, true)
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
  /**
   * Retorna a coluna que ser?? necess??ria para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn>{
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-tipo-pessoa-email.service.ts');
                                     /* coluna: string                             , nomeCampo: string     , propriedade: string   , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaEmail'), 'inCodTipoPessoaEmail', 'inCodTipoPessoaEmail', enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')         , 'chDescricao'         , 'chDescricao'         , enum_formatoColuna.texto , true      , false , false      , 500));
  
    return colunas;
  }
}