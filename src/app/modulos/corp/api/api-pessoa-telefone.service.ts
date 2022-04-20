import { Injectable } from '@angular/core';

//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

//Importe da entidade lógica desse serviço
import { ModelPessoaTelefone } from '../models/model-pessoa-telefone';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable({
  providedIn: 'root'
})
export class ApiPessoaTelefoneService implements InterfaceColunasGrid {
  private IDPessoa: number;
  private url: string = 'corp/api/PessoaTelefone';
  private orderByColumnName: string = 'IDPessoaTelefone';
  private sortType: string = 'asc';
  
  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoaTelefone';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPessoaTelefone): Promise<ModelPessoaTelefone> {
    return new Promise<ModelPessoaTelefone>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPessoaTelefone>(this.url, objeto, true)
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

  public alterar(objeto: ModelPessoaTelefone): Promise<ModelPessoaTelefone> {
    return new Promise<ModelPessoaTelefone>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPessoaTelefone>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPessoaTelefone> {
    return new Promise<ModelPessoaTelefone>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPessoaTelefone>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaTelefone>> {

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
      //url += `&filter=Pessoa.IDPessoa~gte~0`;
      url += `&filter=`;
    }

    return new Promise<Array<ModelPessoaTelefone>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaTelefone>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-telefone.service.ts');
                                     /* coluna: string                                , nomeCampo: string        , propriedade: string      , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaTelefone')       , 'IDPessoaTelefone'       , 'IDPessoaTelefone'       , enum_formatoColuna.numero  , true      , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')               , 'IDPessoa'               , 'IDPessoa'               , enum_formatoColuna.numero  , false     , true ));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaTelefone'), 'inCodTipoPessoaTelefone', 'inCodTipoPessoaTelefone', enum_formatoColuna.numero  , true      , true ));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaTelefone'), 'chDesTipoPessoaTelefone', 'chDesTipoPessoaTelefone', enum_formatoColuna.texto   , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDDI')                  , 'chDDI'                  , 'chDDI'                  , enum_formatoColuna.texto   , false     , false , false      , 60));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDDD')                  , 'chDDD'                  , 'chDDD'                  , enum_formatoColuna.texto   , false     , false , false      , 60));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumero')               , 'chNumero'               , 'chNumero'               , enum_formatoColuna.texto   , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')          , 'dtDatInclusao'          , 'dtDatInclusao'          , enum_formatoColuna.dataHora, false     , true ));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')      , 'dtDatUltAlteracao'      , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora, false     , true ));

    return colunas;
  }
}
