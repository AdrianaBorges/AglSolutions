import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelTecnicoEL01 } from '../models/model-tecnico-EL01';

@Injectable()
export class ApiTecnicoEL01Service {

  private url: string = 'fvenda/api/TecnicoEL01';
  private orderByColumnName: string = 'IDTecnico';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDTecnico';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelTecnicoEL01): Promise<ModelTecnicoEL01> {
    return new Promise<ModelTecnicoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelTecnicoEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelTecnicoEL01): Promise<ModelTecnicoEL01> {
    return new Promise<ModelTecnicoEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelTecnicoEL01>(this.url, objeto, true)
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


  public inativar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/inativar/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public reativar(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/reativar/${id}`;

        this.apiGatewayService.put<boolean>(url, null, true)
          .then(
            tipoUsuarios => {
              resolve(tipoUsuarios);
            },
            erro => {
              reject(erro);
            }
          );
      }
    );
  }

  public obter(id: number): Promise<ModelTecnicoEL01> {
    return new Promise<ModelTecnicoEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelTecnicoEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelTecnicoEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelTecnicoEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelTecnicoEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-tecnico-el01.service.ts');
                                                                /* coluna: string             , nomeCampo: string                        , propriedade: string        , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDTecnico')                , 'Tecnico.IDTecnico'                      , 'IDTecnico'                , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTecnico')             , 'Tecnico.inCodTecnico'                   , 'inCodTecnico'             , enum_formatoColuna.numero_sem_formato, true      , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomAbreviado')           , 'Tecnico.chNomAbreviado'                 , 'chNomAbreviado'           , enum_formatoColuna.texto             , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeTecnico')            , 'PessoaTecnico.chNomePessoa'             , 'chNomeTecnico'            , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoTecnico')         , 'Tecnico.inCodTipoTecnico'               , 'inCodTipoTecnico'         , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoTecnico')         , 'TipoTecnico.chDescricao'                , 'chDesTipoTecnico'         , enum_formatoColuna.texto             , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSituacaoCad')         , 'Tecnico.inCodSituacaoCad'               , 'inCodSituacaoCad'         , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCad')         , 'SituacaoCad.chDescricao'                , 'chDesSituacaoCad'         , enum_formatoColuna.texto             , false     , false , false      , 250));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaTecnico')     , 'Tecnico.IDPapelPessoaTecnico'           , 'IDPapelPessoaTecnico'     , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaTecnico')          , 'PapelPessoaTecnico.IDPessoa'            , 'IDPessoaTecnico'          , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoaTecnico')   , 'PessoaTecnico.inCodTipoPessoa'          , 'inCodTipoPessoaTecnico'   , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoaTecnico')   , 'TipoPessoaTecnico.chDesTipoPessoa'      , 'chDesTipoPessoaTecnico'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumentoTecnico'), 'PessoaTecnico.inCodTipoDocumento'       , 'inCodTipoDocumentoTecnico', enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumentoTecnico'), 'TipoDocumentoTecnico.chDesTipoDocumento', 'chDesTipoDocumentoTecnico', enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifTecnico')      , 'PessoaTecnico.inNumIdentificacao'       , 'inNumIdentifTecnico'      , enum_formatoColuna.numero            , false     , true  , 180, this.formatarCampoTecnico));    
    
    return colunas;
  }

  private formatarCampoTecnico(obj: any): string {
    let identificacao: string;
    let qtde = obj.inNumIdentifTecnico.toString().length;

    if (obj.inCodTipoDocumentoTecnico == 1) {
      let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifTecnico.toString();
      identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
    } else if (obj.inCodTipoDocumentoTecnico == 2) {
      let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifTecnico.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
    }
    return identificacao;
  }

}
