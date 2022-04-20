import { Injectable } from '@angular/core';

//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

//Importe da entidade lógica desse serviço
import { ModelPessoaEmail } from '../models/model-pessoa-email';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable({
  providedIn: 'root'
})
export class ApiPessoaEmailService implements InterfaceColunasGrid {
  private IDPessoa: number;
  private url: string = 'corp/api/PessoaEmail';
  private orderByColumnName: string = 'IDPessoaEmail';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoaEmail';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPessoaEmail): Promise<ModelPessoaEmail> {
    return new Promise<ModelPessoaEmail>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPessoaEmail>(this.url, objeto, true)
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

  public alterar(objeto: ModelPessoaEmail): Promise<ModelPessoaEmail> {
    return new Promise<ModelPessoaEmail>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPessoaEmail>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPessoaEmail> {
    return new Promise<ModelPessoaEmail>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPessoaEmail>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaEmail>> {

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

    return new Promise<Array<ModelPessoaEmail>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaEmail>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-email.service.ts');
                                     /* coluna: string                              , nomeCampo: string                  , propriedade: string     , formatoColuna               , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaEmail')        , 'PessoaEmail.IDPessoaEmail'        , 'IDPessoaEmail'         , enum_formatoColuna.numero   , true       , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')             , 'PessoaEMail.IDPessoa'             , 'IDPessoa'              , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaEmail') , 'PessoaEmail.inCodTipoPessoaEmail' , 'inCodTipoPessoaEmail'  , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaEmail') , 'TipoPessoaEmail.chDescricao'      , 'chDesTipoPessoaEmail'  , enum_formatoColuna.texto    , false      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chEmail')              , 'PessoaEmail.chEmail'              , 'chEmail'               , enum_formatoColuna.texto    , false      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')        , 'PessoaEmail.dtDatInclusao'        , 'dtDatInclusao'         , enum_formatoColuna.dataHora , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')    , 'PessoaEmail.dtDatUltAlteracao'    , 'dtDatUltAlteracao'     , enum_formatoColuna.dataHora , false      , true));

    return colunas;
  }
}