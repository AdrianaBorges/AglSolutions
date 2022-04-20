import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelUsuariosGrupo } from '../models/model-usuarios-grupo';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';

@Injectable()
export class ApiGruposDoUsuarioService {


  private url: string = 'segur/api/UsuariosGrupo';
  private orderByColumnName: string = 'IDUsuariosGrupo';
  private sortType: string = 'asc';

  private chCodUsuario: string;
  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService

  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDUsuariosGrupo';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelUsuariosGrupo): Promise<ModelUsuariosGrupo> {
    return new Promise<ModelUsuariosGrupo>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelUsuariosGrupo>(this.url, objeto, true)
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

  public alterar(objeto: ModelUsuariosGrupo): Promise<ModelUsuariosGrupo> {
    return new Promise<ModelUsuariosGrupo>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelUsuariosGrupo>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelUsuariosGrupo> {
    return new Promise<ModelUsuariosGrupo>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelUsuariosGrupo>(url, true)
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



  public setCodUsuario(chCodUsuario: string) {
    this.chCodUsuario = chCodUsuario;
  }

  public getCodUsuario(): string {
    return this.chCodUsuario;
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelUsuariosGrupo>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de ususario
    if ((this.chCodUsuario != "") && (this.chCodUsuario != undefined)) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `UsuariosGrupo.chCodUsuario~eq~'${this.chCodUsuario}'`;
    }


    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelUsuariosGrupo>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelUsuariosGrupo>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-usuarios-grupo.service.ts');
    /* coluna: string                          , nomeCampo: string                , propriedade: string  , formatoColuna             , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDUsuariosGrupo'), 'UsuariosGrupo.IDUsuariosGrupo', 'IDUsuariosGrupo', enum_formatoColuna.numero, true, false, false, 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodGrupoUsuario'), 'UsuariosGrupo.chCodGrupoUsuario', 'chCodGrupoUsuario', enum_formatoColuna.texto, true, false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoUsuario'), 'GrupoUsuario.chDesGrupoUsuario', 'chDesGrupoUsuario', enum_formatoColuna.texto, true, false, false, 350));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodUsuario'), 'UsuariosGrupo.chCodUsuario', 'chCodUsuario', enum_formatoColuna.texto, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUsuario'), 'Usuario.chNomeUsuario', 'chNomeUsuario', enum_formatoColuna.texto, true, true));
    return colunas;
  }
}
