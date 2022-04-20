import { Injectable } from '@angular/core';

//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';

//Importe da entidade lógica desse serviço
import { ModelPessoaEndereco } from '../models/model-pessoa-endereco';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';

@Injectable({
  providedIn: 'root'
})
export class ApiPessoaEnderecoService implements InterfaceColunasGrid {
  private IDPessoa: number;
  private url: string = 'corp/api/PessoaEndereco';
  private orderByColumnName: string = 'IDPessoaEndereco';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoaEndereco';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPessoaEndereco): Promise<ModelPessoaEndereco> {
    return new Promise<ModelPessoaEndereco>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPessoaEndereco>(this.url, objeto, true)
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

  public alterar(objeto: ModelPessoaEndereco): Promise<ModelPessoaEndereco> {
    return new Promise<ModelPessoaEndereco>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPessoaEndereco>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPessoaEndereco> {
    return new Promise<ModelPessoaEndereco>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPessoaEndereco>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaEndereco>> {

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

    return new Promise<Array<ModelPessoaEndereco>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaEndereco>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-endereco.service.ts');
                                     /* coluna: string                                , nomeCampo: string                   , propriedade: string      , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaEndereco')       , 'IDPessoaEndereco'                  , 'IDPessoaEndereco'       , enum_formatoColuna.numero  , true      , false , false      , 80));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')               , 'IDPessoa'                          , 'IDPessoa'               , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoaEndereco'), 'inCodTipoPessoaEndereco'           , 'inCodTipoPessoaEndereco', enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoaEndereco'), 'chDesTipoPessoaEndereco'           , 'chDesTipoPessoaEndereco', enum_formatoColuna.texto   , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCEP')                  , 'chCEP'                             , 'chCEP'                  , enum_formatoColuna.texto   , false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chSiglaUF')              , 'UF.chSigla'                        , 'chSiglaUF'              , enum_formatoColuna.texto   , false     , false , false      , 50));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeCidade')           , 'chNomeCidade'                      , 'chNomeCidade'           , enum_formatoColuna.texto   , false     , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeLogradouro')       , 'chNomeLogradouro'                  , 'chNomeLogradouro'       , enum_formatoColuna.texto   , false     , false , false      , 300));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chBairro')               , 'chBairro'                          , 'chBairro'               , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPais')                 , 'Pais.IDPais'                       , 'IDPais'                 , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodPais')              , 'Pais.chCodPais'                    , 'chCodPais'              , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbreviadoPais')    , 'Pais.chNomeAbreviado'              , 'chNomeAbreviadoPais'    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePais')             , 'Pais.chNome'                       , 'chNomePais'             , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDUF')                   , 'UF.IDUF'                           , 'IDUF'                   , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeUF')               , 'UF.chNome'                         , 'chNomeUF'               , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCidade')               , 'PessoaEndereco.IDCidade'           , 'IDCidade'               , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeCidade')           , 'Cidade.chNome'                     , 'chNomeCidade'           , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoLogradouro')    , 'PessoaEndereco.inCodTipoLogradouro', 'inCodTipoLogradouro'    , enum_formatoColuna.numero  , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoLogradouro')    , 'TipoLogradouro.chDescricao'        , 'chDesTipoLogradouro'    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumeroLogradouro')     , 'chNumeroLogradouro'                , 'chNumeroLogradouro'     , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chComplemento')          , 'chComplemento'                     , 'chComplemento'          , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chBairro')               , 'chBairro'                          , 'chBairro'               , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')          , 'dtDatInclusao'                     , 'dtDatInclusao'          , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao')      , 'dtDatUltAlteracao'                 , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora, false     , true));

    return colunas;
  }
}