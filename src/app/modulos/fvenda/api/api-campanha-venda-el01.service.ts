import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelCampanhaVendaEL01 } from '../models/model-campanha-venda-EL01';

@Injectable({
  providedIn: 'root'
})
export class ApiCampanhaVendaEL01Service {

  private url: string = 'fvenda/api/CampanhaVendaEL01';
  private orderByColumnName: string = 'IDCampanhaVenda';
  private sortType: string = 'asc';

  public IDCampanhaParam: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDCampanhaVenda';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCampanhaVendaEL01): Promise<ModelCampanhaVendaEL01> {
    return new Promise<ModelCampanhaVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCampanhaVendaEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelCampanhaVendaEL01): Promise<ModelCampanhaVendaEL01> {
    return new Promise<ModelCampanhaVendaEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCampanhaVendaEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelCampanhaVendaEL01> {
    return new Promise<ModelCampanhaVendaEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCampanhaVendaEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCampanhaVendaEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;


    if (this.IDCampanhaParam != 0 && this.IDCampanhaParam != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `CampanhaVenda.IDCampanhaParam~eq~${this.IDCampanhaParam}`;
    } else {
      console.error('O IDCampanhaParam deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCampanhaVendaEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCampanhaVendaEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-campanha-venda-el01.service.ts');
                                                                /* coluna: string           , nomeCampo: string                      , propriedade: string      , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCampanhaVenda')        , 'CampanhaVenda.IDCampanhaVenda'        , 'IDCampanhaVenda'        , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCampanhaVenda')        , 'CampanhaVenda.IDCampanhaVenda'        , 'IDCampanhaVenda'        , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDCampanha')             , 'CampanhaParam.IDCampanha'             , 'IDCampanha'             , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodCampanha')          , 'Campanha.chCodCampanha'               , 'chCodCampanha'          , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesCampanha')          , 'Campanha.chDescricao'                 , 'chDesCampanha'          , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoCampanha')      , 'Campanha.inCodTipoCampanha'           , 'inCodTipoCampanha'      , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoCampanha')      , 'TipoCampanha.chDescricao'             , 'chDesTipoCampanha'      , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodSituacaoCamp')      , 'Campanha.inCodSituacaoCamp'           , 'inCodSituacaoCamp'      , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoCamp')      , 'SituacaoCamp.chDescricao'             , 'chDesSituacaoCamp'      , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInicio')            , 'Campanha.dtDatInicio'                 , 'dtDatInicio'            , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatFim')               , 'Campanha.dtDatFim'                    , 'dtDatFim'               , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDEstabelec')            , 'CampanhaVenda.IDEstabelec'            , 'IDEstabelec'            , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPessoaEstabelec')      , 'PapelEstabel.IDPessoa'                , 'IDPessoaEstabelec'      , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDPapelPessoaEstabelec') , 'Estabelec.IDPapelPessoa'              , 'IDPapelPessoaEstabelec' , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDEmpresa')              , 'Estabelec.IDEmpresa'                  , 'IDEmpresa'              , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodEstabelec')         , 'Estabelec.chCodEstabelec'             , 'chCodEstabelec'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevEstabelec')   , 'Estabelec.chNomeAbreviado'            , 'chNomeAbrevEstabelec'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeEstabelec')        , 'Estabelec.chNome'                     , 'chNomeEstabelec'        , enum_formatoColuna.texto             , true      , false , false, 400));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inCNPJEstabelec')        , 'PessoaEstabel.inNumIdentificacao'     , 'inCNPJEstabelec'        , enum_formatoColuna.numero            , false     , true  , 200, this.formatarCampoCNPJEstab));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoaEstabelec')  , 'PessoaEstabel.chNomePessoa'           , 'chNomePessoaEstabelec'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inCNPJEmpresa')          , 'PessoaEmpresa.inNumIdentificacao'     , 'inCNPJEmpresa'          , enum_formatoColuna.numero            , false     , true  , 200, this.formatarCampoCNPJEmpresa));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomePessoaEmpresa')    , 'PessoaEmpresa.chNomePessoa'           , 'chNomePessoaEmpresa'    , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatVenda')             , 'CampanhaVenda.dtDatVenda'             , 'dtDatVenda'             , enum_formatoColuna.dataHora          , true      , false , false, 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumTerminal')          , 'CampanhaVenda.chNumTerminal'          , 'chNumTerminal'          , enum_formatoColuna.texto             , true      , false , false, 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumContadorReinicio')  , 'CampanhaVenda.chNumContadorReinicio'  , 'chNumContadorReinicio'  , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumSeqOperacaoEntrada'), 'CampanhaVenda.chNumSeqOperacaoEntrada', 'chNumSeqOperacaoEntrada', enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumSeqOperacao')       , 'CampanhaVenda.chNumSeqOperacao'       , 'chNumSeqOperacao'       , enum_formatoColuna.texto             , true      , false , false, 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNumDocto')             , 'CampanhaVenda.chNumDocto'             , 'chNumDocto'             , enum_formatoColuna.texto             , true      , false , false, 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValVenda')             , 'CampanhaVenda.deValVenda'             , 'deValVenda'             , enum_formatoColuna.moeda             , false     , false , false, 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoPessoa')        , 'CampanhaVenda.inCodTipoPessoa'        , 'inCodTipoPessoa'        , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoPessoa')        , 'TipoPessoa.chDesTipoPessoa'           , 'chDesTipoPessoa'        , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodTipoDocumento')     , 'CampanhaVenda.inCodTipoDocumento'     , 'inCodTipoDocumento'     , enum_formatoColuna.numero            , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesTipoDocumento')     , 'TipoDocumento.chDesTipoDocumento'     , 'chDesTipoDocumento'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentificacao')     , 'CampanhaVenda.inNumIdentificacao'     , 'inNumIdentificacao'     , enum_formatoColuna.numero            , false     , false , 200, this.formatarCampoDocCliente));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chCodFormaCobranca')     , 'CampanhaVenda.chCodFormaCobranca'     , 'chCodFormaCobranca'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesAbrevFormaCobranca'), 'FormaCobranca.chDesAbreviada'         , 'chDesAbrevFormaCobranca', enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesFormaCobranca')     , 'FormaCobranca.chDescricao'            , 'chDesFormaCobranca'     , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValPremioGanho')       , 'CampanhaVenda.deValPremioGanho'       , 'deValPremioGanho'       , enum_formatoColuna.moeda             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValPremioUtilizado')   , 'CampanhaVenda.deValPremioUtilizado'   , 'deValPremioUtilizado'   , enum_formatoColuna.moeda             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValPremioSaldo')       , 'CampanhaVenda.deValPremioSaldo'       , 'deValPremioSaldo'       , enum_formatoColuna.moeda             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatInclusao')          , 'CampanhaVenda.dtDatInclusao'          , 'dtDatInclusao'          , enum_formatoColuna.dataHora          , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatUltAlteracao')      , 'CampanhaVenda.dtDatUltAlteracao'      , 'dtDatUltAlteracao'      , enum_formatoColuna.dataHora          , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('lgIntegradoDestino')     , 'CampanhaVenda.lgIntegradoDestino'     , 'lgIntegradoDestino'     , enum_formatoColuna.booleano          , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chIDDestino')            , 'CampanhaVenda.chIDDestino'            , 'chIDDestino'            , enum_formatoColuna.texto             , false     , true));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatIntegradoDestino')  , 'CampanhaVenda.dtDatIntegradoDestino'  , 'dtDatIntegradoDestino'  , enum_formatoColuna.dataHora          , false     , true));

    return colunas;
  }

  private formatarCampoCNPJEmpresa(obj: any): string {
    let identificacao: string;

    if (obj.inCNPJEmpresa) {
      let qtde = obj.inCNPJEmpresa.toString().length;
      let cnpj = '0'.repeat(14 - qtde) + obj.inCNPJEmpresa.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");      
    }
    return identificacao;
  }

  private formatarCampoCNPJEstab(obj: any): string {
    let identificacao: string;

    if (obj.inCNPJEstabelec) {
      let qtde = obj.inCNPJEstabelec.toString().length;
      let cnpj = '0'.repeat(14 - qtde) + obj.inCNPJEstabelec.toString();
      identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");      
    }
    return identificacao;
  }

  private formatarCampoDocCliente(obj: any): string {
    let identificacao: string;

    if (obj.inNumIdentificacao) {
      let qtde = obj.inNumIdentificacao.toString().length;
      if (obj.inCodTipoDocumento == 1) {
        let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentificacao.toString();
        identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
      } else if (obj.inCodTipoDocumento == 2) {
        let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentificacao.toString();
        identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");        
      } else{
        identificacao = obj.inNumIdentificacao.toString();
      }
    }
    return identificacao;
  }  
}
