import { Injectable } from '@angular/core';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ModelSegurancaPrograma } from '../models/model-seguranca-programa';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

@Injectable()
export class ApiSegurancaProgramaService {

  private url: string = 'segur/api/SegurancaPrograma';
  private orderByColumnName: string = 'SegurancaPrograma.IDSegurancaPrograma';
  private sortType: string = 'asc';
  private IDProgramaNivel: number;


  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public getIDProgramaNivel(): number {
    return this.IDProgramaNivel;
  }
  public setIDProgramaNivel(value: number) {
    this.IDProgramaNivel = value;
  }
  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'SegurancaPrograma.IDSegurancaPrograma';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSegurancaPrograma): Promise<ModelSegurancaPrograma> {
    return new Promise<ModelSegurancaPrograma>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSegurancaPrograma>(this.url, objeto, true)
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

  public alterar(objeto: ModelSegurancaPrograma): Promise<ModelSegurancaPrograma> {
    return new Promise<ModelSegurancaPrograma>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSegurancaPrograma>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelSegurancaPrograma> {
    return new Promise<ModelSegurancaPrograma>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSegurancaPrograma>(url, true)
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
  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSegurancaPrograma>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de Chgrupo
    if ((this.IDProgramaNivel != 0) && (this.IDProgramaNivel != undefined)) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `SegurancaPrograma.IDProgramaNivel~eq~'${this.IDProgramaNivel}'`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSegurancaPrograma>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSegurancaPrograma>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.segur.api.api-seguranca-programa.service.ts');
                                      /* coluna: string                             , nomeCampo: string                      , propriedade: string   , formatoColuna              , filterable  , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSegurancaPrograma')  , 'SegurancaPrograma.IDSegurancaPrograma', 'IDSegurancaPrograma' , enum_formatoColuna.numero  , true        , false, false, 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodGrupoUsuario')    , 'SegurancaPrograma.chCodGrupoUsuario'  , 'chCodGrupoUsuario'   , enum_formatoColuna.texto   , true        , false, false, 120));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoUsuario')    , 'GrupoUsuario.chDesGrupoUsuario'       , 'chDesGrupoUsuario'   , enum_formatoColuna.texto   , true        , false, false, 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDProgramaNivel')      , 'SegurancaPrograma.IDProgramaNivel'    , 'IDProgramaNivel'     , enum_formatoColuna.numero  , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPrograma')        , 'ProgramaNivel.chCodPrograma'          , 'chCodPrograma'       , enum_formatoColuna.texto   , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodNivel')           , 'ProgramaNivel.inCodNivel'             , 'inCodNivel'          , enum_formatoColuna.numero  , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTitPrograma')     , 'Programa.chDesTitPrograma'            , 'chDesTitPrograma'    , enum_formatoColuna.texto   , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProgramaNivel')   , 'ProgramaNivel.chDesProgramaNivel'     , 'chDesProgramaNivel'  , enum_formatoColuna.texto   , false       , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesOperacao')        , 'ProgramaNivel.chDesOperacao'          , 'chDesOperacao'       , enum_formatoColuna.texto   , false       , true));
    return colunas;
  }}
