import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { GridPesquisaColumnFormat } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column-format';
import { ModelSolicAprovPVEL01 } from '../models/model-solic-aprov-pv-EL01';
import { ModelSolicAprovPVItens } from '../models/model-solic-aprov-pv-itens';
import { ModelPedVendaItemEL01 } from "../models/model-ped-venda-item-EL01"

@Injectable()
export class ApiSolicAprovPVEL01Service {
  private url: string = 'fvenda/api/SolicAprovPVEL01';
  private orderByColumnName: string = 'IDSolicAprovPV';
  private sortType: string = 'asc';
  public IDSolicAprovPV: number = undefined;
  private inCodSituacaoSolAprPV: number = undefined;
  private chCodUsuarioSolic: string = undefined;

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void {
    if (orderByColumnName == null) {
      this.orderByColumnName = 'IDSolicAprovPV';
      this.sortType = 'asc';
    } else {
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  public criar(objeto: ModelSolicAprovPVEL01): Promise<ModelSolicAprovPVEL01> {
    return new Promise<ModelSolicAprovPVEL01>(
      (resolve, reject) => {

        this.apiGatewayService.post<ModelSolicAprovPVEL01>(this.url, objeto, true)
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

  public alterar(objeto: ModelSolicAprovPVEL01): Promise<ModelSolicAprovPVEL01> {
    return new Promise<ModelSolicAprovPVEL01>(
      (resolve, reject) => {

        this.apiGatewayService.put<ModelSolicAprovPVEL01>(this.url, objeto, true)
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

  public solicitarAprova(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/SolicitarAprova/${id}`;

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

  public atualizarInfo(id: number): Promise<boolean> {
    return new Promise<boolean>(
      (resolve, reject) => {

        let url: string = `${this.url}/AtualizarInformacao/${id}`;

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

  public obter(id: number): Promise<ModelSolicAprovPVEL01> {
    return new Promise<ModelSolicAprovPVEL01>(
      (resolve, reject) => {

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelSolicAprovPVEL01>(url, true)
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

  public getInCodSituacaoSolAprPV() {
    return this.inCodSituacaoSolAprPV;
  }

  public setInCodSituacaoSolAprPV(_inCodSituacaoSolAprPV: number) {
    this.inCodSituacaoSolAprPV = _inCodSituacaoSolAprPV;
  }

  public getchCodUsuarioSolic() {
    return this.chCodUsuarioSolic;
  }

  public setchCodUsuarioSolic(_chCodUsuarioSolic: string) {
    this.chCodUsuarioSolic = _chCodUsuarioSolic;
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelSolicAprovPVEL01>> {
    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0) {
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (this.inCodSituacaoSolAprPV) {
      if (filter != '') {
        filter += `~and~`;
      }
      filter += `SolicAprovPV.inCodSituacaoSolAprPV~eq~${this.inCodSituacaoSolAprPV}`;
    }

    if (filter) {
      url += `&filter=${filter}`;
    } else {
      url += `&filter=`;
    }

    url += `&moverUltimaPagina=false&incluirJsonFilho=true`

    return new Promise<Array<ModelSolicAprovPVEL01>>(
      (resolve, reject) => {

        this.apiGatewayService.get<Array<ModelSolicAprovPVEL01>>(url, true)
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
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-solic-aprov-pv-EL01.service.ts');
                                                                /* coluna: string            , nomeCampo: string                 , propriedade: string       , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDSolicAprovPV')          , 'SolicAprovPV.IDSolicAprovPV'     , 'IDSolicAprovPV'          , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatSolic')              , 'SolicAprovPV.dtDatSolic'         , 'dtDatSolic'              , enum_formatoColuna.data              , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioSolic')      , 'UsuarioSolic.chNomeUsuario'      , 'chNomeUsuarioSolic'      , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoSolAprPV')   , 'SituacaoSolAprPV.chDescricao'    , 'chDesSituacaoSolAprPV'   , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente')     , 'PessoaCliente.inNumIdentificacao', 'inNumIdentifCliente'     , enum_formatoColuna.numero_sem_formato, false     , true  , 180        , this.formatar_CPF_CNPJ));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')            , 'Cliente.inCodCliente'            , 'inCodCliente'            , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomAbrevCliente')       , 'Cliente.chNomeAbreviado'         , 'chNomAbrevCliente'       , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')           , 'PessoaCliente.chNomePessoa'      , 'chNomeCliente'           , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')      , 'Representante.inCodRepresentante', 'inCodRepresentante'      , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentante'), 'Representante.chNomeAbreviado'   , 'chNomeAbrevRepresentante', enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')     , 'PessoaRepresentante.chNomePessoa', 'chNomeRepresentante'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chLstTipoPedido')         , 'PedVenda.chLstTipoPedido'        , 'chLstTipoPedido'         , enum_formatoColuna.texto             , false     , false , false      , 90));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValBonific')            , 'SolicAprovPV.deValBonific'       , 'deValBonific'            , enum_formatoColuna.moeda             , false     , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValVenda')              , 'SolicAprovPV.deValVenda'         , 'deValVenda'              , enum_formatoColuna.moeda             , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dePercBonifXVenda')       , 'SolicAprovPV.dePercBonifXVenda'  , 'dePercBonifXVenda'       , enum_formatoColuna.decimal_2         , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')         , 'SolicAprovPV.chDesObservacao'    , 'chDesObservacao'         , enum_formatoColuna.texto             , false     , false , false      , 400));

    return colunas;
  }

  public getColunasGridSolicAproPedBonif(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-solic-aprov-pv-EL01.service.ts');
                                                                /* coluna: string            , nomeCampo: string                 , propriedade: string       , formatoColuna                        , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('IDSolicAprovPV')          , 'SolicAprovPV.IDSolicAprovPV'     , 'IDSolicAprovPV'          , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dtDatSolic')              , 'SolicAprovPV.dtDatSolic'         , 'dtDatSolic'              , enum_formatoColuna.data              , true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioSolic')      , 'UsuarioSolic.chNomeUsuario'      , 'chNomeUsuarioSolic'      , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumnFormat(localeFile.traducao('inNumIdentifCliente')     , 'PessoaCliente.inNumIdentificacao', 'inNumIdentifCliente'     , enum_formatoColuna.numero_sem_formato, false     , true  , 180        , this.formatar_CPF_CNPJ));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodCliente')            , 'Cliente.inCodCliente'            , 'inCodCliente'            , enum_formatoColuna.numero_sem_formato, true      , false , false      , 100));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomAbrevCliente')       , 'Cliente.chNomeAbreviado'         , 'chNomAbrevCliente'       , enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeCliente')           , 'PessoaCliente.chNomePessoa'      , 'chNomeCliente'           , enum_formatoColuna.texto             , true      , false , false      , 400));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('inCodRepresentante')      , 'Representante.inCodRepresentante', 'inCodRepresentante'      , enum_formatoColuna.numero_sem_formato, false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeAbrevRepresentante'), 'Representante.chNomeAbreviado'   , 'chNomeAbrevRepresentante', enum_formatoColuna.texto             , true      , false , false      , 200));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeRepresentante')     , 'PessoaRepresentante.chNomePessoa', 'chNomeRepresentante'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValBonific')            , 'SolicAprovPV.deValBonific'       , 'deValBonific'            , enum_formatoColuna.moeda             , false     , false , false      , 180));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('deValVenda')              , 'SolicAprovPV.deValVenda'         , 'deValVenda'              , enum_formatoColuna.moeda             , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('dePercBonifXVenda')       , 'SolicAprovPV.dePercBonifXVenda'  , 'dePercBonifXVenda'       , enum_formatoColuna.decimal_2         , false     , false , false      , 150));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesObservacao')         , 'SolicAprovPV.chDesObservacao'    , 'chDesObservacao'         , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chNomeUsuarioAprov')      , 'UsuarioAprov.chNomeUsuario'      , 'chNomeUsuarioAprov'      , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMotRejSolAprPV')     , 'MotRejSolAprPV.chDescricao'      , 'chDesMotRejSolAprPV'     , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesMotivo')             , 'SolicAprovPV.chDesMotivo'        , 'chDesMotivo'             , enum_formatoColuna.texto             , false     , true  , false));
    colunas.push(new GridPesquisaColumn      (localeFile.traducao('chDesSituacaoSolAprPV')   , 'SituacaoSolAprPV.chDescricao'    , 'chDesSituacaoSolAprPV'   , enum_formatoColuna.texto             , false     , false , false      , 200));    

    return colunas;
  }

  public getColunasGridFilho(): Array<GridPesquisaColumn> {
    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.fvenda.api.api-solic-aprov-pv-EL01-filho.service.ts');
                                                          /* coluna: string   , nomeCampo: string, propriedade: string, formatoColuna           , filterable, hidden, detalheGrid, width */
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedEmp')    , 'chNumPedEmp'    , 'chNumPedEmp'      , enum_formatoColuna.texto, false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chNumPedRep')    , 'chNumPedRep'    , 'chNumPedRep'      , enum_formatoColuna.texto, false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodNatOper')   , 'chCodNatOper'   , 'chCodNatOper'     , enum_formatoColuna.texto, false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('chCodItem')      , 'chCodItem'      , 'chCodItem'        , enum_formatoColuna.texto, false     , false , false      , 100));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('deValTotLiquido'), 'deValTotLiquido', 'deValTotLiquido'  , enum_formatoColuna.moeda, false     , false , false      , 100));

    return colunas;
  }
  /**
   * Cria uma nova lista de itens baseada no array itens do
   * objeto ModelSolicAprovPVEL01 recebido
   * @param pedido 
   * @returns 
   */
  public mapListaItensSolicAprovPV(pedido: ModelSolicAprovPVEL01){
    const listagemMapeada = []
    pedido.itens.forEach((filho: ModelSolicAprovPVItens)=>{

      filho.pedVendaItens.forEach((item: ModelPedVendaItemEL01) => {
        if(!item.lgConsideraVenda && filho.lgPedPrincipal){
          let objMapeado = {
            chNumPedEmp: filho.chNumPedEmp,
            chNumPedRep: filho.chNumPedRep,
            chCodNatOper: item.chCodNatOper,
            chCodItem: item.chCodItem,
            deValTotLiquido: item.deValTotLiquido
          }
  
          listagemMapeada.push(objMapeado)
        }
      })
    })

    return listagemMapeada;
  }

  private formatar_CPF_CNPJ(obj: any): string {
    let identificacao: string;

    if (obj.inNumIdentifCliente) {
      let qtde = obj.inNumIdentifCliente.toString().length;

      if (obj.inCodTipoDocumentoCliente == 1) {
        let cpf = '0'.repeat(11 - qtde) + obj.inNumIdentifCliente.toString();
        identificacao = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
      } else if (obj.inCodTipoDocumentoCliente == 2) {
        let cnpj = '0'.repeat(14 - qtde) + obj.inNumIdentifCliente.toString();
        identificacao = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
      } else {
        identificacao = obj.inNumIdentifCliente.toString();
      }
    }
    return identificacao;
  }
}
