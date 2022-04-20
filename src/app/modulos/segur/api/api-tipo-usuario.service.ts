import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelTipoUsuario } from '../../segur/models/model-tipo-usuario';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ApiAutenticacaoService } from '../../segur/api/api-autenticacao.service';

@Injectable()
export class ApiTipoUsuarioService implements InterfaceColunasGrid {
  private url: string = 'segur/api/tipoUsuario';
  private orderByColumnName: string = 'inCodTipoUsuario';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService,
    private apiAutenticacaoService: ApiAutenticacaoService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'inCodTipoUsuario';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(tipoUsuario: ModelTipoUsuario): Promise<ModelTipoUsuario>{
    return new Promise<ModelTipoUsuario>(
      (resolve, reject)=>{

        this.apiGatewayService.post<ModelTipoUsuario>(this.url, tipoUsuario, true)
        .then(
          tipoUsuarios=> {
            resolve(tipoUsuarios);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public alterar(tipoUsuario: ModelTipoUsuario): Promise<ModelTipoUsuario>{
    return new Promise<ModelTipoUsuario>(
      (resolve, reject)=>{

        this.apiGatewayService.put<ModelTipoUsuario>(this.url, tipoUsuario, true)
        .then(
          tipoUsuarios=> {
            resolve(tipoUsuarios);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public excluir(id_tipo_usuario: number): Promise<boolean>{
    return new Promise<boolean>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id_tipo_usuario}`;

        this.apiGatewayService.delete<boolean>(url, true)
        .then(
          tipoUsuarios=> {
            resolve(tipoUsuarios);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public obter(id: number): Promise<ModelTipoUsuario>{
    return new Promise<ModelTipoUsuario>(
      (resolve, reject)=>{

        let url: string = this.url +'/'+id+'/';

        this.apiGatewayService.get<ModelTipoUsuario>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTipoUsuario>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelTipoUsuario>>(
      (resolve, reject)=>{

        if(this.apiAutenticacaoService.getUsuarioLogado() == null){
          reject();
        }else
        this.apiGatewayService.get<Array<ModelTipoUsuario>>(url, true)
        .then(
          (tipoUsuarios) => {
            resolve(tipoUsuarios);
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-tipo-usuario.service.ts');
                                     /* coluna: string                         , nomeCampo: string             , propriedade: string, formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoUsuario'), 'TipoUsuario.inCodTipoUsuario', 'inCodTipoUsuario' , enum_formatoColuna.numero, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoUsuario'), 'TipoUsuario.chDesTipoUsuario', 'chDesTipoUsuario' , enum_formatoColuna.texto , true      , false , false      , 500));

    return colunas;
  }
}