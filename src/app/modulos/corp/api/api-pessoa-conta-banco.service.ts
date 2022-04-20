import { Injectable } from '@angular/core';

//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

//Importe da entidade lógica desse serviço
import { ModelPessoaContaBanco } from '../models/model-pessoa-conta-banco';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable({
  providedIn: 'root'
})
export class ApiPessoaContaBancoService implements InterfaceColunasGrid {
  private IDPessoa: number;
  private url: string = 'finan/api/PessoaContaBanco';
  private orderByColumnName: string = 'IDPessoaContaBanco';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoaContaBanco';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPessoaContaBanco): Promise<ModelPessoaContaBanco> {
    return new Promise<ModelPessoaContaBanco>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPessoaContaBanco>(this.url, objeto, true)
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

  public alterar(objeto: ModelPessoaContaBanco): Promise<ModelPessoaContaBanco> {
    return new Promise<ModelPessoaContaBanco>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPessoaContaBanco>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPessoaContaBanco> {
    return new Promise<ModelPessoaContaBanco>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPessoaContaBanco>(url, true)
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

  public setIdPessoa(IDPessoa: number) {
    this.IDPessoa = IDPessoa;
  }

  public getIdPessoa(): number {
    return this.IDPessoa;
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaContaBanco>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de pessoa por padrão
    if (this.IDPessoa > 0) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `IDPessoa~eq~'${this.IDPessoa}'`;
    } else {
      console.error('O IDPessoa deve ser passado para o grid antes de executar a pesquisa')
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPessoaContaBanco>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaContaBanco>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-conta-banco.service.ts');
                                        /* coluna: string                                 , nomeCampo: string                              , propriedade: string          , formatoColuna                , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaContaBanco')         , 'PessoaContaBanco.IDPessoaContaBanco'          , 'IDPessoaContaBanco'         , enum_formatoColuna.numero    , true       , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')                   , 'PessoaContaBanco.IDPessoa'                    , 'IDPessoa'                   , enum_formatoColuna.numero    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodBanco')                 , 'PessoaContaBanco.inCodBanco'                  , 'inCodBanco'                 , enum_formatoColuna.numero    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeBanco')                , 'Banco.chNome'                                 , 'chNomeBanco'                , enum_formatoColuna.texto     , false      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chAgencia')                  , 'PessoaContaBanco.chAgencia'                   , 'chAgencia'                  , enum_formatoColuna.texto     , false      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDVAgencia')                , 'PessoaContaBanco.chDVAgencia'                 , 'chDVAgencia'                , enum_formatoColuna.texto     , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chConta')                    , 'PessoaContaBanco.chConta'                     , 'chConta'                    , enum_formatoColuna.texto     , false      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDVConta')                  , 'PessoaContaBanco.chDVConta'                   , 'chDVConta'                  , enum_formatoColuna.texto     , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoContaBanco')        , 'PessoaContaBanco.inCodTipoContaBanco'         , 'inCodTipoContaBanco'        , enum_formatoColuna.numero    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoContaBanco')        , 'TipoContaBanco.chDescricao'                   , 'chDesTipoContaBanco'        , enum_formatoColuna.texto     , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeTitular')              , 'PessoaContaBanco.chNomeTitular'               , 'chNomeTitular'              , enum_formatoColuna.texto     , false      , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumento')         , 'PessoaContaBanco.inCodTipoDocumento'          , 'inCodTipoDocumento'         , enum_formatoColuna.numero    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumento')         , 'TipoDocumento.chDesTipoDocumento'             , 'chDesTipoDocumento'         , enum_formatoColuna.texto     , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentificacaoTitular')  , 'PessoaContaBanco.inNumIdentificacaoTitular'   , 'inNumIdentificacaoTitular'  , enum_formatoColuna.numero    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')              , 'PessoaContaBanco.dtDatInclusao'               , 'dtDatInclusao'              , enum_formatoColuna.dataHora  , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')          , 'PessoaContaBanco.dtDatUltAlteracao'           , 'dtDatUltAlteracao'          , enum_formatoColuna.dataHora  , false      , true));

    return colunas;
  }
}