import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelPagador } from '../models/model-pagador';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiPagadorService {
  private url: string = 'eseg/api/PagadorEL01';
  private orderByColumnName: string = 'IDPessoa';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPessoa';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPagador): Promise<ModelPagador> {
    return new Promise<ModelPagador>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPagador>(this.url, objeto, true)
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

  public alterar(objeto: ModelPagador): Promise<ModelPagador> {
    return new Promise<ModelPagador>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPagador>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPagador> {
    return new Promise<ModelPagador>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPagador>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPagador>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPagador>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPagador>>(url, true)
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

  public listarJuridicas(page: number, pageSize: number, filter: string): Promise<Array<ModelPagador>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=Pessoa.inCodTipoPessoa~eq~2~AND~${filter}`;
    } else {
      url += `&filter=Pessoa.inCodTipoPessoa~eq~2`;
    }

    return new Promise<Array<ModelPagador>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPagador>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-pagador.service.ts');
                                     /* coluna: string                           , nomeCampo: string                 , propriedade: string , formatoColuna                          , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa')          , 'Pessoa.IDPessoa'                 , 'IDPessoa'          , enum_formatoColuna.numero_sem_formato  , true      , false , false      , 100));
    //colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacao', enum_formatoColuna.numero_sem_formato  , true      , false , false      , 180));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacaoFormatado', enum_formatoColuna.texto  , true      , false ,  180,this.formatarCampo));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoa')      , 'Pessoa.chNomePessoa'             , 'chNomePessoa'      , enum_formatoColuna.texto               , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaFisica')    , 'PessoaFisica.IDPessoaFisica'     , 'IDPessoaFisica'    , enum_formatoColuna.numero_sem_formato  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('daDatNascim')       , 'PessoaFisica.daDatNascim'        , 'daDatNascim'       , enum_formatoColuna.data                , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeMae')         , 'PessoaFisica.chNomeMae'          , 'chNomeMae'         , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePai')         , 'PessoaFisica.chNomePai'          , 'chNomePai'         , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesNacionalidade'), 'PessoaFisica.chDesNacionalidade' , 'chDesNacionalidade', enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValorRendaMensal'), 'PessoaFisica.deValorRendaMensal' , 'deValorRendaMensal', enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaJuridica')  , 'PessoaJuridica.IDPessoaJuridica' , 'IDPessoaJuridica'  , enum_formatoColuna.numero_sem_formato  , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeFantasia')    , 'PessoaJuridica.chNomeFantasia'   , 'chNomeFantasia'    , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chIM')              , 'PessoaJuridica.chIM'             , 'chIM'              , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chIE')              , 'PessoaJuridica.chIE'             , 'chIE'              , enum_formatoColuna.texto               , true      , true));
    // Tipo pessoa
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoa')   , 'Pessoa.inCodTipoPessoa'          , 'inCodTipoPessoa'   , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoa')   , 'TipoPessoa.chDesTipoPessoa'      , 'chDesTipoPessoa'   , enum_formatoColuna.texto               , false     , false , false      , 150));
    // Tipo documento
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumento'), 'Pessoa.inCodTipoDocumento'       , 'inCodTipoDocumento', enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumento'), 'TipoDocumento.chDesTipoDocumento', 'chDesTipoDocumento', enum_formatoColuna.texto               , false     , true));
    // Estado civil
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodEstadoCivil')  , 'PessoaFisica.inCodEstadoCivil'   , 'inCodEstadoCivil'  , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesEstadoCivil')  , 'EstadoCivil.chDescricao'         , 'chDesEstadoCivil'  , enum_formatoColuna.texto               , false     , true));
    // Sexo
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSexo')         , 'PessoaFisica.inCodSexo'          , 'inCodSexo'         , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSexo')         , 'Sexo.chDescricao'                , 'chDesSexo'         , enum_formatoColuna.texto               , false     , true));
    // inCodProfissao
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodProfissao')    , 'PessoaFisica.inCodProfissao'     , 'inCodProfissao'    , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesProfissao')    , 'Profissao.chDescricao'           , 'chDesProfissao'    , enum_formatoColuna.texto               , false     , true));
    // Raça/Cor
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodRacaCor')      , 'PessoaFisica.inCodRacaCor'       , 'inCodRacaCor'      , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesRacaCor')      , 'RacaCor.chDescricao'             , 'chDesRacaCor'      , enum_formatoColuna.texto               , false     , true));
    // Grau de instrução
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodGrauInst')     , 'PessoaFisica.inCodGrauInst'      , 'inCodGrauInst'     , enum_formatoColuna.texto               , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrauInst')     , 'GrauInst.chDescricao'            , 'chDesGrauInst'     , enum_formatoColuna.texto               , true      , true));
    //Outros dados
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInclusao')     , 'Pessoa.dtDatInclusao'            , 'dtDatInclusao'     , enum_formatoColuna.dataHora            , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatUltAlteracao') , 'Pessoa.dtDatUltAlteracao'        , 'dtDatUltAlteracao' , enum_formatoColuna.data                , false     , true));

    return colunas;
  }

  
  private formatarCampo(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentificacao.toString().length;

    if (obj.inCodTipoDocumento == 1) {
      let cpf =  '0'.repeat(11-qtde) +  obj.inNumIdentificacao.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumento == 2) {
      let cnpj = '0'.repeat(14-qtde) + obj.inNumIdentificacao.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }
}
