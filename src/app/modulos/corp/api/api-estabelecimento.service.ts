import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { ModelEstabelecimento } from '../models/model-estabelecimento';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';

@Injectable()
export class ApiEstabelecimentoService {
  private IDEmpresa: number;
  private url: string = 'corp/api/EstabelecEL01';
  private orderByColumnName: string = 'IDEstabelec';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDEstabelec';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelEstabelecimento): Promise<ModelEstabelecimento> {
    return new Promise<ModelEstabelecimento>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelEstabelecimento>(this.url, objeto, true)
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

  public alterar(objeto: ModelEstabelecimento): Promise<ModelEstabelecimento> {
    return new Promise<ModelEstabelecimento>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelEstabelecimento>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelEstabelecimento> {
    return new Promise<ModelEstabelecimento>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelEstabelecimento>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelEstabelecimento>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //Aplicando filtro de pessoa por padrão
    if (this.IDEmpresa != 0 && this.IDEmpresa != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `Estabelec.IDEmpresa~eq~${this.IDEmpresa}`;
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelEstabelecimento>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelEstabelecimento>>(url, true)
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

  public getIDEmpresa() {
    return this.IDEmpresa;
  }

  public setIDEmpresa(IDEmpresa: number) {
    this.IDEmpresa = IDEmpresa;
  }
  
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-estabelecimento.service.ts');
                                                                /* coluna: string         , nomeCampo: string                 , propriedade: string       , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDEstabelec')          , 'Estabelec.IDEstabelec'           , 'IDEstabelec'             , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoa')             , 'PapelEstabel.IDPessoa'           , 'IDPessoa'                , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoa')        , 'Estabelec.IDPapelPessoa'         , 'IDPapelPessoa'           , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDEmpresa')            , 'Estabelec.IDEmpresa'             , 'IDEmpresa'               , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodEstabelec')       , 'Estabelec.chCodEstabelec'        , 'chCodEstabelec'          , enum_formatoColuna.texto             , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbreviado')      , 'Estabelec.chNomeAbreviado'       , 'chNomeAbreviado'         , enum_formatoColuna.texto             , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inCNPJEstabelec')      , 'PessoaEstabel.inNumIdentificacao', 'inCNPJEstabelecFormatado', enum_formatoColuna.texto             , true      , false , 150, this.formatarCampo));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNome')               , 'Estabelec.chNome'                , 'chNome'                  , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoaEstabelec'), 'PessoaEstabel.chNomePessoa'      , 'chNomePessoaEstabelec'   , enum_formatoColuna.texto             , true      , false , false      , 500));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCNPJEmpresa')        , 'PessoaEmpresa.inNumIdentificacao', 'inNumIdentificacao'      , enum_formatoColuna.numero_sem_formato, false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoaEmpresa')  , 'PessoaEmpresa.chNomePessoa'      , 'chNomePessoaEmpresa'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodGrupoEstab')      , 'Estabelec.inCodGrupoEstab'       , 'inCodGrupoEstab'         , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesGrupoEstab')      , 'GrupoEstab.chDescricao'          , 'chDesGrupoEstab'         , enum_formatoColuna.texto             , false     , true));

    return colunas;
  }


  private formatarCampo(obj: any): string {
    let identificacao: string;
    let qtde = obj.inCNPJEstabelec.toString().length;
    let document = '0'.repeat(14 - qtde) + obj.inCNPJEstabelec.toString();
    identificacao = document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    return identificacao;
  }

}