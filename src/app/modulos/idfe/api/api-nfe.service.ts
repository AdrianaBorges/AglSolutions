import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../../../api-data-access/api-gateway.service';
import { ApiErrorCollection } from '../../../api-error/api-error-collection';
import { GridPesquisaColumn } from '../../../componentes/camada-logica/KendoUi/Grid/grid-pesquisa-column';
import { enum_formatoColuna } from '../../../componentes/camada-logica/KendoUi/Grid/enum-formato-coluna';
import { InterfaceColunasGrid } from '../../../componentes/interfaces/interface-get-colunas-grid';
import { AssetsLocaleService } from '../../../assets-locale/assets-locale.service';
import { LocaleDataFile } from '../../../assets-locale/locale-data-file';
import { ModelNfe } from '../models/model-nfe';

@Injectable({
  providedIn: 'root'
})
export class ApiNfeService implements InterfaceColunasGrid {
  private url: string = 'idfe/api/NFeEL02';
  private orderByColumnName: string = 'IDNFe';
  private sortType: string = 'asc';

  constructor(
    private apiGatewayService: ApiGatewayService,
    private assetsLocaleService: AssetsLocaleService
  ) { }

  public mudarOrdenacao(orderByColumnName: string, sortType: string): void{
    if(orderByColumnName == null){
      this.orderByColumnName = 'IDNFe';
      this.sortType = 'asc';
    }else{
      this.orderByColumnName = orderByColumnName;
      this.sortType = sortType;
    }
  }

  /**
   * Por meio deste método da API é possível realizar o Manifesto do Destinatário de Ciência da Emissão da NFe.
   * 
   * @param chave chChaveNFe
   */
  public ciencia_da_emissao(chave: string): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/SetCienciaEmissao/${chave}`;

        this.apiGatewayService.put<ModelNfe>(url, null, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  /**
   * Por meio deste método da API é possível realizar o Manifesto do Destinatário de Confirmação da Operação da NFe.
   * 
   * @param chave chChaveNFe
   */
  public confirmacao_de_operacao(chave: string): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/SetOperConf/${chave}`;

        this.apiGatewayService.put<ModelNfe>(url, null, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  /**
   * Por meio deste método da API é possível realizar o Manifesto do Destinatário de Operação Não Realizada da NFe.
   * 
   * @param chave chChaveNFe
   * @param justificativa Texto descrevendo a justificativa pela não realização da operação
   */
  public operacao_nao_realizada(chave: string, justificativa: string): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/SetOperNaoReal/${chave}/${justificativa}`;

        this.apiGatewayService.put<ModelNfe>(url, null, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  /**
   * Por meio deste método da API é possível realizar o Manifesto do Destinatário de Operação Desconhecida da NFe.
   * 
   * @param chave chChaveNFe
   */
  public operacao_desconhecida(chave: string): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/SetOperDesconhecida/${chave}`;

        this.apiGatewayService.put<ModelNfe>(url, null, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  /**
   * Por meio deste método da API é possível carregar o XML da NFe, buscando o mesmo dos Webservices do Sefaz.
   * 
   * @param chave chChaveNFe
   * @param idempresa IDEmpresaDFe
   */
  public carregar_XML_da_NFe__pelo_Sefaz(chave: string, idempresa: number): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/LoadXMLNFeSefaz/{chave}/{idempresa}/${chave}/${idempresa}`;

        this.apiGatewayService.put<ModelNfe>(url, null, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  /**
   * Por meio deste método da API é possível obter os dados de NFeEL02, pelo Identificador Único da tabela.
   * 
   * @param id 
   */
  public obter(id: number): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/${id}`;

        this.apiGatewayService.get<ModelNfe>(url, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  /**
   * Por meio deste método da API é possível obter os dados de NFeEL02, pela Chave do DFe.
   * 
   * @param chave campo chChaveNFe
   */
  public obter_pela_chave_da_NFe(chave: string): Promise<ModelNfe>{
    return new Promise<ModelNfe>(
      (resolve, reject)=>{

        let url: string = `${this.url}/GetByChave/${chave}`;

        this.apiGatewayService.get<ModelNfe>(url, true)
        .then(
          objeto_retornado=> {
            resolve(objeto_retornado[0]);
          },
          erro => {
            reject(erro);
          }
        );
      }
    );
  }

  public listar(page: number, pageSize: number, filter: string): Promise<Array<ModelNfe>>{

    let url: string = `${this.url}?sort=${this.orderByColumnName}-${this.sortType}`;

    if (page > 0 && pageSize > 0){
      url += `&page=${page}&pageSize=${pageSize}`;
    }

    if (filter){
      url += `&filter=${filter}`;
    }else{
      url += `&filter=`;
    }

    return new Promise<Array<ModelNfe>>(
      (resolve, reject)=>{

        this.apiGatewayService.get<Array<ModelNfe>>(url, true)
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
  public getColunasGrid(): Array<GridPesquisaColumn>{

    var colunas: GridPesquisaColumn[];
    colunas = [];

    var localeFile: LocaleDataFile;
    localeFile = this.assetsLocaleService.getLocaleFile('modulos.idfe.api.api-nfe.service.ts');

    //Colunas do Grid
    colunas.push(new GridPesquisaColumn(localeFile.traducao('ID'), 'NFe.IDNFe', 'IDNFe', enum_formatoColuna.numero, true, false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Código'), 'Estabelec.chCodEstabelec', 'chCodEstabelec', enum_formatoColuna.numero, true, false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Nome do Estabelecimento'), 'Estabelec.chNomeEstabelec', 'chNomeEstabelec', enum_formatoColuna.numero, true, false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Série'), 'NFe.inNumSerie', 'inNumSerie', enum_formatoColuna.numero, true, false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Número'), 'NFe.inNumDocto', 'inNumDocto', enum_formatoColuna.numero, true, false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Emissão'), 'NFe.dtDatEmissao', 'dtDatEmissao', enum_formatoColuna.dataHora, true, false));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Num.Identificação'), 'NFe.inNumIdentifEmit', 'inNumIdentifEmit', enum_formatoColuna.numero, true, false));

    //Colunas de detalhes do grid
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Nome do Emitente'), 'NFe.chNomeEmit', 'chNomeEmit', enum_formatoColuna.numero, true, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Chave do DFe'), 'NFe.chChaveNFe', 'chChaveNFe', enum_formatoColuna.numero, true, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Situação'), 'SituacaoNFe.chDescricao', 'chDesSituacaoNFe', enum_formatoColuna.numero, true, true, true));
    colunas.push(new GridPesquisaColumn(localeFile.traducao('Status de Confirmação'), 'StatusConfNFe.chDescricao', 'chDesStatusConfNFe', enum_formatoColuna.numero, true, true, true));
    

    return colunas;
  }
}
