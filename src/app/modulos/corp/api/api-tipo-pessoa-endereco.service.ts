import { Injectable } from '@angular/core';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelTipoPessoaEndereco } from '../models/model-tipo-pessoa-endereco';

@Injectable()
export class ApiTipoDocumentoPessoaEnderecoService implements InterfaceColunasGrid {
  private url: string = 'corp/api/TipoPessoaEndereco';
  private orderByColumnName: string = 'inCodTipoPessoaEndereco';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoPessoaEndereco';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTipoPessoaEndereco): Promise<ModelTipoPessoaEndereco>{
    return new Promise<ModelTipoPessoaEndereco>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelTipoPessoaEndereco>(this.url, objeto, true)
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

  public alterar(objeto: ModelTipoPessoaEndereco): Promise<ModelTipoPessoaEndereco>{
    return new Promise<ModelTipoPessoaEndereco>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelTipoPessoaEndereco>(this.url, objeto, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoPessoaEndereco>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoPessoaEndereco>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelTipoPessoaEndereco>>(url, true)
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

  public obter(id: number): Promise<ModelTipoPessoaEndereco>{
    return new Promise<ModelTipoPessoaEndereco>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTipoPessoaEndereco>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-tipo-pessoa-endereco.service.ts');
                                     /* coluna: string                                , nomeCampo: string        , propriedade: string      , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaEndereco'), 'inCodTipoPessoaEndereco', 'inCodTipoPessoaEndereco', enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')            , 'chDescricao'            , 'chDescricao'            , enum_formatoColuna.texto , true      , false , false      , 500));
  
    return colunas;
  }
}