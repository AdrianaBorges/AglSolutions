import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { ModelPapelPessoa } from '../models/model-papel-pessoa';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { FormatarCpfCnpjService } from '../../../services/formatar-cpf-cnpj.service';

@Injectable({
  providedIn: 'root'
})
export class ApiPapelPessoaService {
  private inCodTipoPapel: number[];
  private url: string = 'corp/api/PapelPessoa';
  private orderByColumnName: string = 'IDPapelPessoa';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService,
    private formatarCpfCnpjService: FormatarCpfCnpjService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDPapelPessoa';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelPapelPessoa): Promise<ModelPapelPessoa> {
    return new Promise<ModelPapelPessoa>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelPapelPessoa>(this.url, objeto, true)
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

  public alterar(objeto: ModelPapelPessoa): Promise<ModelPapelPessoa> {
    return new Promise<ModelPapelPessoa>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelPapelPessoa>(this.url, objeto, true)
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
  public setInCodTipoPapel(inCodTipoPapel: number[]) {
    this.inCodTipoPapel = inCodTipoPapel;
  }

  public getInCodTipoPapel(): number[] {
    return this.inCodTipoPapel;
  }
  public obter(id: number): Promise<ModelPapelPessoa> {
    return new Promise<ModelPapelPessoa>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelPapelPessoa>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelPapelPessoa>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    //Aplicando filtro de pessoa por padrão
    if (this.inCodTipoPapel != undefined && this.inCodTipoPapel.length > 0) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `PapelPessoa.inCodTipoPapel~in~(${this.inCodTipoPapel.join(",")})`;
    } else {
      console.error('O inCodTipoPapel deve ser passado para o grid antes de executar a pesquisa')
    }


    //Aplicando filtro de pessoa por padrão
    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelPapelPessoa>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPapelPessoa>>(url, true)
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

  public obterFiltro(id: any): Promise<ModelPapelPessoa> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;
    url += `&page=1&pageSize=999999999`;

    let filter = "";
    if (id == "" || id == undefined || id == null) {
      filter = `PapelPessoa.IDPapelPessoa~eq~0`;
    } else {
      filter = `PapelPessoa.IDPapelPessoa~eq~${Number(id)}`;
    }

    //Aplicando filtro de pessoa por padrão
    if (this.inCodTipoPapel.length > 0) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `PapelPessoa.inCodTipoPapel~in~(${this.inCodTipoPapel.join(",")})`;
    } else {
      console.error('O inCodTipoPapel deve ser passado para o grid antes de executar a pesquisa')
    }


    if (filter) {
      url += `&filter=${filter} `;
    } else {
      url += `&filter=`;
    }

    return new Promise<ModelPapelPessoa>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelPapelPessoa>>(url, true)
          .then(
            (lista_objetos) => {
              resolve(lista_objetos[0]);
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.corp.api.api-papel-pessoa.service.ts');
    /* coluna: string                           , nomeCampo: string                 , propriedade: string , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoa'), 'PapelPessoa.IDPapelPessoa', 'IDPapelPessoa', enum_formatoColuna.numero, true, false, false, 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoa'), 'PapelPessoa.IDPessoa', 'IDPessoa', enum_formatoColuna.numero, true, true));

    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao', 'inNumIdentificacao', enum_formatoColuna.numero_sem_formato, true, false, 180, this.formatar_CPF_CNPJ));
    //colunas.push(new GridPesquisaColumn(localeFile.traducao('inNumIdentificacao'), 'Pessoa.inNumIdentificacao'       , 'inNumIdentificacao', enum_formatoColuna.numero_sem_formato, true      , false , false      , 180));

    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoa'), 'Pessoa.chNomePessoa', 'chNomePessoa', enum_formatoColuna.texto, true, false, false, 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPessoa'), 'Pessoa.inCodTipoPessoa', 'inCodTipoPessoa', enum_formatoColuna.numero, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPessoa'), 'TipoPessoa.chDesTipoPessoa', 'chDesTipoPessoa', enum_formatoColuna.texto, true, false, false, 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoDocumento'), 'Pessoa.inCodTipoDocumento', 'inCodTipoDocumento', enum_formatoColuna.numero, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoDocumento'), 'TipoDocumento.chDesTipoDocumento', 'chDesTipoDocumento', enum_formatoColuna.texto, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoPapel'), 'PapelPessoa.inCodTipoPapel', 'inCodTipoPapel', enum_formatoColuna.numero, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoPapel'), 'TipoPapel.chDesTipoPapel', 'chDesTipoPapel', enum_formatoColuna.texto, true, false, false, 200));

    return colunas;
  }


  private formatar_CPF_CNPJ(obj: any): string {

    let identificacao: string;
    let qtde = obj.inNumIdentificacao.toString().length;

    if (obj.inCodTipoDocumento == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentificacao.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumento == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentificacao.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    else {
      identificacao = obj.inNumIdentificacao.toString();
    }
    return identificacao;
  }



}
