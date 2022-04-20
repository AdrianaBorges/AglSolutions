import { Injectable } from '@angular/core';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ModelTipoPessoaContato } from '../models/model-tipo-pessoa-contato';

@Injectable()
export class ApiTipoPessoaContatoService {
  private url: string = 'corp/api/TipoPessoaContato';
  private orderByColumnName: string = 'inCodTipoPessoaContato';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoPessoaContato';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoPessoaContato): Promise<ModelTipoPessoaContato>{
    return new Promise<ModelTipoPessoaContato>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelTipoPessoaContato>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoPessoaContato): Promise<ModelTipoPessoaContato>{
    return new Promise<ModelTipoPessoaContato>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelTipoPessoaContato>(this.url, objeto, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoPessoaContato>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoPessoaContato>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelTipoPessoaContato>>(url, true)
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

  public obter(id: number): Promise<ModelTipoPessoaContato>{
    return new Promise<ModelTipoPessoaContato>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoPessoaContato>(url, true)
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
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn>{
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-tipo-pessoa-contato.service.ts');
                                     /* coluna: string                               , nomeCampo: string       , propriedade: string     , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaContato'), 'inCodTipoPessoaContato', 'inCodTipoPessoaContato', enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')           , 'chDescricao'           , 'chDescricao'           , enum_formatoColuna.texto , true      , false , false      , 500));
  
    return colunas;
  }
}