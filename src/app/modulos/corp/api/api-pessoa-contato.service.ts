import { Injectable } from '@angular/core';

//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

//Importe da entidade lógica desse serviço
import { ModelPessoaContato } from '../models/model-pessoa-contato';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable({
  providedIn: 'root'
})
export class ApiPessoaContatoService implements InterfaceColunasGrid {
  private IDPessoa: number;
  private url: string = 'corp/api/PessoaContato';
  private orderByColumnName: string = 'IDPessoaContato';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoaContato';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPessoaContato): Promise<ModelPessoaContato> {
    return new Promise<ModelPessoaContato>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPessoaContato>(this.url, objeto, true)
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

  public alterar(objeto: ModelPessoaContato): Promise<ModelPessoaContato> {
    return new Promise<ModelPessoaContato>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPessoaContato>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPessoaContato> {
    return new Promise<ModelPessoaContato>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPessoaContato>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaContato>> {

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

    return new Promise<Array<ModelPessoaContato>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaContato>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-contato.service.ts');
                                        /* coluna: string                             , nomeCampo: string                      , propriedade: string      , formatoColuna               , filterable , hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaContato')        , 'PessoaContato.IDPessoaContato'        , 'IDPessoaContato'        , enum_formatoColuna.numero   , true       , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')               , 'PessoaContato.IDPessoa'               , 'IDPessoaContato'        , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaContato') , 'PessoaContato.inCodTipoPessoaContato' , 'inCodTipoPessoaContato' , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaContato') , 'TipoPessoaContato.chDescricao'        , 'chDesTipoPessoaContato' , enum_formatoColuna.texto    , false      , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCPF')                  , 'PessoaContato.inCPF'                  , 'inCPF'                  , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNome')                 , 'PessoaContato.chNome'                 , 'chNome'                 , enum_formatoColuna.texto    , true       , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDDDTelefone')          , 'PessoaContato.chDDDTelefone'          , 'chDDDTelefone'          , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumTelefone')          , 'PessoaContato.chNumTelefone'          , 'chNumTelefone'          , enum_formatoColuna.texto    , false      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumRamal')             , 'PessoaContato.chNumRamal'             , 'chNumRamal'             , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDDDCelular')           , 'PessoaContato.chDDDCelular'           , 'chDDDCelular'           , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumCelular')           , 'PessoaContato.chNumCelular'           , 'chNumCelular'           , enum_formatoColuna.texto    , false      , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chEMail')                , 'PessoaContato.chEMail'                , 'chEMail'                , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inAniverDia')            , 'PessoaContato.inAniverDia'            , 'inAniverDia'            , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inAniverMes')            , 'PessoaContato.inAniverMes'            , 'inAniverMes'            , enum_formatoColuna.numero   , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCargo')             , 'PessoaContato.chDesCargo'             , 'chDesCargo'             , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesDepartamento')      , 'PessoaContato.chDesDepartamento'      , 'chDesDepartamento'      , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesObservacao')        , 'PessoaContato.chDesObservacao'        , 'chDesObservacao'        , enum_formatoColuna.texto    , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')          , 'PessoaContato.dtDatInclusao'          , 'dtDatInclusao'          , enum_formatoColuna.dataHora , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')      , 'PessoaContato.dtDatUltAlteracao'      , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora , false      , true));

    return colunas;
  }
}