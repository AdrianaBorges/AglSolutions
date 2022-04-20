import { Injectable } from "@angular/core";
import { ApiGatewayService } from "../../../api-data-access/api-gateway.service";
import { AssetsLocaleService } from "../../../assets-locale/assets-locale.service";
import { ModelSorteioSeg } from "../models/model-sorteio-seg";
import { GridPesquisaColumn } from "../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column";
import { LocaleDataFile } from "../../../assets-locale/locale-data-file";
import { enum_formatoColuna } from "../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna";

@Injectable()
export class ApiSorteioSegService {
  private url: string = 'eseg/api/SorteioSeg';
  private orderByColumnName: string = 'IDSorteioSeg';
  private sortType: string = 'asc';
  private IDSeguradora: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDSorteioSeg';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSorteioSeg): Promise<ModelSorteioSeg> {
    return new Promise<ModelSorteioSeg>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSorteioSeg>(this.url, objeto, true)
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

  public alterar(objeto: ModelSorteioSeg): Promise<ModelSorteioSeg> {
    return new Promise<ModelSorteioSeg>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSorteioSeg>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelSorteioSeg> {
    return new Promise<ModelSorteioSeg>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSorteioSeg>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSorteioSeg>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    //Aplicando filtro de pessoa por padrão
    if (this.IDSeguradora != 0) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `SorteioSeg.IDSeguradora~eq~${this.IDSeguradora}`;
    } else {
      console.error('O IDSeguradora deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelSorteioSeg>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSorteioSeg>>(url, true)
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

  public setIDSeguradora(IDSeguradora: number) {
    this.IDSeguradora = IDSeguradora;
  }

  public getIDSeguradora() {
    return this.IDSeguradora;
  }
  /**
   * Retorna a coluna que será necessária para os grid de pesquisa.
   */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.eseg.api.api-sorteio-seg.service.ts');
                                     /* coluna: string                                  , nomeCampo: string                    , propriedade: string        , formatoColuna                        , filterable , hidden, detalheGrid, width */        
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSorteioSeg')             , 'IDSorteioSeg'                       , 'IDSorteioSeg'             , enum_formatoColuna.numero            , true       , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDSeguradora')             , 'SorteioSeg.IDSeguradora'            , 'IDSeguradora'             , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaSeguradora')       , 'PapelSeguradora.IDPessoa'           , 'IDPessoaSeguradora'       , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaSeguradora')  , 'PapelSeguradora.IDPapelPessoa'      , 'IDPapelPessoaSeguradora'  , enum_formatoColuna.numero            , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJSeguradora')         , 'PessoaSeguradora.inNumIdentificacao', 'inCNPJSeguradora'         , enum_formatoColuna.numero_sem_formato, false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeSeguradora')         , 'PessoaSeguradora.chNomePessoa'      , 'chNomeSeguradora'         , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodSorteioSeg')          , 'chCodSorteioSeg'                    , 'chCodSorteioSeg'          , enum_formatoColuna.texto             , true       , false , false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDescricao')              , 'chDescricao'                        , 'chDescricao'              , enum_formatoColuna.texto             , true       , false , false      , 500));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesExterna')             , 'chDesExterna'                       , 'chDesExterna'             , enum_formatoColuna.texto             , false      , true));    
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValSorteio')             , 'deValSorteio'                       , 'deValSorteio'             , enum_formatoColuna.moeda             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumTitCap')              , 'chNumTitCap'                        , 'chNumTitCap'              , enum_formatoColuna.texto             , false      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesDetalhe')             , 'chDesDetalhe'                       , 'chDesDetalhe'             , enum_formatoColuna.texto             , false      , true));

    return colunas;
  }
}