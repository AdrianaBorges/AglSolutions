import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { ModelCampanhaParamEL01 } from '../models/model-campanha-param-EL01';

@Injectable({
  providedIn: 'root'
})
export class ApiCampanhaParamEL01Service {

  private url: string = 'fvenda/api/CampanhaParamEL01';
  private orderByColumnName: string = 'IDCampanhaParam';
  private sortType: string = 'asc';

  public IDCampanha: number;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDCampanhaParam';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelCampanhaParamEL01): Promise<ModelCampanhaParamEL01> {
    return new Promise<ModelCampanhaParamEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelCampanhaParamEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelCampanhaParamEL01): Promise<ModelCampanhaParamEL01> {
    return new Promise<ModelCampanhaParamEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelCampanhaParamEL01>(this.url, objeto, true)
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

  public obter(id: number): Promise<ModelCampanhaParamEL01> {
    return new Promise<ModelCampanhaParamEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelCampanhaParamEL01>(url, true)
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

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelCampanhaParamEL01>> {

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (this.IDCampanha != 0 && this.IDCampanha != undefined) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `CampanhaParam.IDCampanha~eq~${this.IDCampanha}`;
    } else {
      console.error('O IDCampanha deve ser passado para o grid antes de executar a pesquisa')
    }

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    return new Promise<Array<ModelCampanhaParamEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelCampanhaParamEL01>>(url, true)
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
  public getColunasGridInstantaneo(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-campanha-param-el01.service.ts');
                                                          /* coluna: string          , nomeCampo: string                   , propriedade: string     , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCampanhaParam')       , 'CampanhaParam.IDCampanhaParam'     , 'IDCampanhaParam'       , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCampanha')            , 'CampanhaParam.IDCampanha'          , 'IDCampanha'            , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCampanha')         , 'Campanha.chCodCampanha'            , 'chCodCampanha'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCampanha')         , 'Campanha.chDescricao'              , 'chDesCampanha'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoCampanha')     , 'Campanha.inCodTipoCampanha'        , 'inCodTipoCampanha'     , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoCampanha')     , 'TipoCampanha.chDescricao'          , 'chDesTipoCampanha'     , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCamp')     , 'Campanha.inCodSituacaoCamp'        , 'inCodSituacaoCamp'     , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCamp')     , 'SituacaoCamp.chDescricao'          , 'chDesSituacaoCamp'     , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInicio')           , 'Campanha.dtDatInicio'              , 'dtDatInicio'           , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatFim')              , 'Campanha.dtDatFim'                 , 'dtDatFim'              , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodGrupoEstab')       , 'CampanhaParam.inCodGrupoEstab'     , 'inCodGrupoEstab'       , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoEstab')       , 'GrupoEstab.chDescricao'            , 'chDesGrupoEstab'       , enum_formatoColuna.texto             , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDEstabelec')           , 'CampanhaParam.IDEstabelec'         , 'IDEstabelec'           , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaEstabelec')     , 'PapelEstabel.IDPessoa'             , 'IDPessoaEstabelec'     , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaEstabelec'), 'Estabelec.IDPapelPessoa'           , 'IDPapelPessoaEstabelec', enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDEmpresa')             , 'Estabelec.IDEmpresa'               , 'IDEmpresa'             , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEstabelec')        , 'Estabelec.chCodEstabelec'          , 'chCodEstabelec'        , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevEstabelec')  , 'Estabelec.chNomeAbreviado'         , 'chNomeAbrevEstabelec'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeEstabelec')       , 'Estabelec.chNome'                  , 'chNomeEstabelec'       , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJEstabelec')       , 'PessoaEstabel.inNumIdentificacao'  , 'inCNPJEstabelec'       , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoaEstabelec') , 'PessoaEstabel.chNomePessoa'        , 'chNomePessoaEstabelec' , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJEmpresa')         , 'PessoaEmpresa.inNumIdentificacao'  , 'inCNPJEmpresa'         , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoaEmpresa')   , 'PessoaEmpresa.chNomePessoa'        , 'chNomePessoaEmpresa'   , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatVendaIni')         , 'CampanhaParam.dtDatVendaIni'       , 'dtDatVendaIni'         , enum_formatoColuna.dataHora          , true      , false, false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatVendaFim')         , 'CampanhaParam.dtDatVendaFim'       , 'dtDatVendaFim'         , enum_formatoColuna.dataHora          , true      , false, false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValVendaMinimo')      , 'CampanhaParam.deValVendaPremio'    , 'deValVendaMinimo'      , enum_formatoColuna.moeda             , false     , false, false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValPremio')           , 'CampanhaParam.deValPremio'         , 'deValPremio'           , enum_formatoColuna.moeda             , false     , false, false      , 150));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgPremioInstSorteado')  , 'CampanhaParam.lgPremioInstSorteado', 'lgPremioInstSorteado'  , enum_formatoColuna.booleano          , true      , false, false      , 150));

    return colunas;
  }
  /**
    * Retorna a coluna que será necessária para os grid de pesquisa.
    */
  public getColunasGrid(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-campanha-param-el01.service.ts');
                                                          /* coluna: string          , nomeCampo: string                   , propriedade: string     , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCampanhaParam')       , 'CampanhaParam.IDCampanhaParam'     , 'IDCampanhaParam'       , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDCampanha')            , 'CampanhaParam.IDCampanha'          , 'IDCampanha'            , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodCampanha')         , 'Campanha.chCodCampanha'            , 'chCodCampanha'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesCampanha')         , 'Campanha.chDescricao'              , 'chDesCampanha'         , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodTipoCampanha')     , 'Campanha.inCodTipoCampanha'        , 'inCodTipoCampanha'     , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesTipoCampanha')     , 'TipoCampanha.chDescricao'          , 'chDesTipoCampanha'     , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodSituacaoCamp')     , 'Campanha.inCodSituacaoCamp'        , 'inCodSituacaoCamp'     , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesSituacaoCamp')     , 'SituacaoCamp.chDescricao'          , 'chDesSituacaoCamp'     , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatInicio')           , 'Campanha.dtDatInicio'              , 'dtDatInicio'           , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatFim')              , 'Campanha.dtDatFim'                 , 'dtDatFim'              , enum_formatoColuna.dataHora          , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCodGrupoEstab')       , 'CampanhaParam.inCodGrupoEstab'     , 'inCodGrupoEstab'       , enum_formatoColuna.numero            , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chDesGrupoEstab')       , 'GrupoEstab.chDescricao'            , 'chDesGrupoEstab'       , enum_formatoColuna.texto             , true      , false , false      , 250));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDEstabelec')           , 'CampanhaParam.IDEstabelec'         , 'IDEstabelec'           , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPessoaEstabelec')     , 'PapelEstabel.IDPessoa'             , 'IDPessoaEstabelec'     , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDPapelPessoaEstabelec'), 'Estabelec.IDPapelPessoa'           , 'IDPapelPessoaEstabelec', enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('IDEmpresa')             , 'Estabelec.IDEmpresa'               , 'IDEmpresa'             , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodEstabelec')        , 'Estabelec.chCodEstabelec'          , 'chCodEstabelec'        , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeAbrevEstabelec')  , 'Estabelec.chNomeAbreviado'         , 'chNomeAbrevEstabelec'  , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomeEstabelec')       , 'Estabelec.chNome'                  , 'chNomeEstabelec'       , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJEstabelec')       , 'PessoaEstabel.inNumIdentificacao'  , 'inCNPJEstabelec'       , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoaEstabelec') , 'PessoaEstabel.chNomePessoa'        , 'chNomePessoaEstabelec' , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('inCNPJEmpresa')         , 'PessoaEmpresa.inNumIdentificacao'  , 'inCNPJEmpresa'         , enum_formatoColuna.numero_sem_formato, true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNomePessoaEmpresa')   , 'PessoaEmpresa.inNumIdentificacao'  , 'chNomePessoaEmpresa'   , enum_formatoColuna.texto             , true      , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatVendaIni')         , 'CampanhaParam.dtDatVendaIni'       , 'dtDatVendaIni'         , enum_formatoColuna.dataHora          , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('dtDatVendaFim')         , 'CampanhaParam.dtDatVendaFim'       , 'dtDatVendaFim'         , enum_formatoColuna.dataHora          , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValVendaMinimo')      , 'CampanhaParam.deValVendaPremio'    , 'deValVendaMinimo'      , enum_formatoColuna.moeda             , false     , false , false      , 200));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValPremio')           , 'CampanhaParam.deValPremio'         , 'deValPremio'           , enum_formatoColuna.moeda             , false     , true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('lgPremioInstSorteado')  , 'CampanhaParam.lgPremioInstSorteado', 'lgPremioInstSorteado'  , enum_formatoColuna.booleano          , false     , true));

    return colunas;
  }
}
