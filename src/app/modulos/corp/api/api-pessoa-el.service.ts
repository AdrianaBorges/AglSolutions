import { Injectable } from '@angular/core';
//Imports comuns a todas APIs
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
//Importe da entidade lógica desse serviço
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
//import { forEach } from '@angular/router/src/utils/collection';
import { ModelPessoaEL } from '../models/model-pessoa-el';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiPessoaElService implements InterfaceColunasGrid {
  private url: string = 'corp/api/PessoaEL';
  private orderByColumnName: string = 'Pessoa.IDPessoa';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'Pessoa.IDPessoa';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPessoaEL): Promise<ModelPessoaEL> {
    return new Promise<ModelPessoaEL>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPessoaEL>(this.url, objeto, true)
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

  public alterar(objeto: ModelPessoaEL): Promise<ModelPessoaEL> {
    return new Promise<ModelPessoaEL>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPessoaEL>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelPessoaEL> {
    return new Promise<ModelPessoaEL>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPessoaEL>(url, true)
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
  public getByCnpj(cnpj: number): Promise<ModelPessoaEL> {
    return new Promise<ModelPessoaEL>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByCNPJ/${cnpj}`;

        this.apiGatewayService.get<ModelPessoaEL>(url, true)
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
  public getByCpf(cpf: number): Promise<ModelPessoaEL> {
    return new Promise<ModelPessoaEL>(
      (resolve, reject) => {

        let url: string = `${this.url}/GetByCPF/${cpf}`;

        this.apiGatewayService.get<ModelPessoaEL>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaEL>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }


    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPessoaEL>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaEL>>(url, true)
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

  public listarJuridicas(page: number, pageSize: number, filter: string): Promise<Array<ModelPessoaEL>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=Pessoa.inCodTipoPessoa~eq~2~AND~${filter}`;
    } else {
      url += `&filter=Pessoa.inCodTipoPessoa~eq~2`;
    }

    return new Promise<Array<ModelPessoaEL>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPessoaEL>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-el.service.ts');
                                           /* coluna: string                           , nomeCampo: string                 , propriedade: string , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoa')          , 'Pessoa.IDPessoa'                 , 'IDPessoa'          , enum_formatoColuna.numero  , true      , false , false      , 80));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacao', enum_formatoColuna.numero  , true      , false              , 180, this.formatarNumIdentif));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoa')      , 'Pessoa.chNomePessoa'             , 'chNomePessoa'      , enum_formatoColuna.texto   , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoa')   , 'Pessoa.inCodTipoPessoa'          , 'inCodTipoPessoa'   , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')   , 'TipoPessoa.chDesTipoPessoa'      , 'chDesTipoPessoa'   , enum_formatoColuna.texto   , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumento'), 'Pessoa.inCodTipoDocumento'       , 'inCodTipoDocumento', enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumento'), 'TipoDocumento.chDesTipoDocumento', 'chDesTipoDocumento', enum_formatoColuna.texto   , false     , true));     
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaFisica')    , 'PessoaFisica.IDPessoaFisica'     , 'IDPessoaFisica'    , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatNascim')       , 'PessoaFisica.daDatNascim'        , 'daDatNascim'       , enum_formatoColuna.data    , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeMae')         , 'PessoaFisica.chNomeMae'          , 'chNomeMae'         , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePai')         , 'PessoaFisica.chNomePai'          , 'chNomePai'         , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesNacionalidade'), 'PessoaFisica.chDesNacionalidade' , 'chDesNacionalidade', enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValorRendaMensal'), 'PessoaFisica.deValorRendaMensal' , 'deValorRendaMensal', enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaJuridica')  , 'PessoaJuridica.IDPessoaJuridica' , 'IDPessoaJuridica'  , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeFantasia')    , 'PessoaJuridica.chNomeFantasia'   , 'chNomeFantasia'    , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIM')              , 'PessoaJuridica.chIM'             , 'chIM'              , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIE')              , 'PessoaJuridica.chIE'             , 'chIE'              , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodEstadoCivil')  , 'PessoaFisica.inCodEstadoCivil'   , 'inCodEstadoCivil'  , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesEstadoCivil')  , 'EstadoCivil.chDescricao'         , 'chDesEstadoCivil'  , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSexo')         , 'PessoaFisica.inCodSexo'          , 'inCodSexo'         , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSexo')         , 'Sexo.chDescricao'                , 'chDesSexo'         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodProfissao')    , 'PessoaFisica.inCodProfissao'     , 'inCodProfissao'    , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesProfissao')    , 'Profissao.chDescricao'           , 'chDesProfissao'    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRacaCor')      , 'PessoaFisica.inCodRacaCor'       , 'inCodRacaCor'      , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesRacaCor')      , 'RacaCor.chDescricao'             , 'chDesRacaCor'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodGrauInst')     , 'PessoaFisica.inCodGrauInst'      , 'inCodGrauInst'     , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesGrauInst')     , 'GrauInst.chDescricao'            , 'chDesGrauInst'     , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')     , 'Pessoa.dtDatInclusao'            , 'dtDatInclusao'     , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao') , 'Pessoa.dtDatUltAlteracao'        , 'dtDatUltAlteracao' , enum_formatoColuna.dataHora, false     , true));

    return colunas;
  }

  public getColunasGridDialog(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-el.service.ts');
                                          /* coluna: string                           , nomeCampo: string                 , propriedade: string , formatoColuna              , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoa')          , 'Pessoa.IDPessoa'                 , 'IDPessoa'          , enum_formatoColuna.numero  , true      , false , false      , 80));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacao', enum_formatoColuna.numero  , true      , false              , 180, this.formatarNumIdentif));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoa')      , 'Pessoa.chNomePessoa'             , 'chNomePessoa'      , enum_formatoColuna.texto   , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoa')   , 'Pessoa.inCodTipoPessoa'          , 'inCodTipoPessoa'   , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')   , 'TipoPessoa.chDesTipoPessoa'      , 'chDesTipoPessoa'   , enum_formatoColuna.texto   , true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumento'), 'Pessoa.inCodTipoDocumento'       , 'inCodTipoDocumento', enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumento'), 'TipoDocumento.chDesTipoDocumento', 'chDesTipoDocumento', enum_formatoColuna.texto   , false     , true));     
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaFisica')    , 'PessoaFisica.IDPessoaFisica'     , 'IDPessoaFisica'    , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('daDatNascim')       , 'PessoaFisica.daDatNascim'        , 'daDatNascim'       , enum_formatoColuna.data    , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeMae')         , 'PessoaFisica.chNomeMae'          , 'chNomeMae'         , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePai')         , 'PessoaFisica.chNomePai'          , 'chNomePai'         , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesNacionalidade'), 'PessoaFisica.chDesNacionalidade' , 'chDesNacionalidade', enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValorRendaMensal'), 'PessoaFisica.deValorRendaMensal' , 'deValorRendaMensal', enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaJuridica')  , 'PessoaJuridica.IDPessoaJuridica' , 'IDPessoaJuridica'  , enum_formatoColuna.numero  , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeFantasia')    , 'PessoaJuridica.chNomeFantasia'   , 'chNomeFantasia'    , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIM')              , 'PessoaJuridica.chIM'             , 'chIM'              , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIE')              , 'PessoaJuridica.chIE'             , 'chIE'              , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodEstadoCivil')  , 'PessoaFisica.inCodEstadoCivil'   , 'inCodEstadoCivil'  , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesEstadoCivil')  , 'EstadoCivil.chDescricao'         , 'chDesEstadoCivil'  , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSexo')         , 'PessoaFisica.inCodSexo'          , 'inCodSexo'         , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSexo')         , 'Sexo.chDescricao'                , 'chDesSexo'         , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodProfissao')    , 'PessoaFisica.inCodProfissao'     , 'inCodProfissao'    , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesProfissao')    , 'Profissao.chDescricao'           , 'chDesProfissao'    , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRacaCor')      , 'PessoaFisica.inCodRacaCor'       , 'inCodRacaCor'      , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesRacaCor')      , 'RacaCor.chDescricao'             , 'chDesRacaCor'      , enum_formatoColuna.texto   , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodGrauInst')     , 'PessoaFisica.inCodGrauInst'      , 'inCodGrauInst'     , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesGrauInst')     , 'GrauInst.chDescricao'            , 'chDesGrauInst'     , enum_formatoColuna.texto   , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')     , 'Pessoa.dtDatInclusao'            , 'dtDatInclusao'     , enum_formatoColuna.dataHora, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao') , 'Pessoa.dtDatUltAlteracao'        , 'dtDatUltAlteracao' , enum_formatoColuna.dataHora, false     , true));

    return colunas;
  }

  public getColunasJuridicaGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-pessoa-juridica.service.ts');
                                           /* coluna: string                           , nomeCampo: string              , propriedade: string , formatoColuna            , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoa')          , 'Pessoa.IDPessoa'              , 'IDPessoa'          , enum_formatoColuna.numero, true      , false , false      , 80));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'    , 'inNumIdentificacao', enum_formatoColuna.texto , true      , false              , 180, this.formatarNumIdentif));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoa')      , 'Pessoa.chNomePessoa'          , 'chNomePessoa'      , enum_formatoColuna.texto , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeFantasia')    , 'PessoaJuridica.chNomeFantasia', 'chNomeFantasia'    , enum_formatoColuna.texto , true      , false , false      , 300));

    return colunas;
  }

  private formatarNumIdentif(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentificacao.toString().length;

    if (obj.inCodTipoDocumento == 1) {
      let cpf =  '0'.repeat(11-qtde) +  obj.inNumIdentificacao.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumento == 2) {
      let cnpj = '0'.repeat(14-qtde) + obj.inNumIdentificacao.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    else {
      identificacao = obj.inNumIdentificacao.toString();
    }
    return identificacao;
  }
}