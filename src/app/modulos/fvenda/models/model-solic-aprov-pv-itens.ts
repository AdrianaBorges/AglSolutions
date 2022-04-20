/* Classe Model que será referenciado na definição da Classe Model model-solic-aprov-pv-EL01
 * o Atributo do Tipo Lista = itens
 * Lista de Estruturas Dados dos Itens da Solicitação de Aprovação relacionados
 * Lista de Tipo Complexo
 * Estrutura de dados da Entidade SolicAprovPVItemEL01 */

import { ModelPedVendaItemEL01 } from "./model-ped-venda-item-EL01"

export class ModelSolicAprovPVItens {
  /**
   Identificador Único da Tabela (Gerado Automaticamente)
  */
  IDSolicAprovPVItem: number;
  /**
   * Identificador Único da Tabela de Solicitação de Aprovação de Pedido de Venda (SolicAprovPVItem)
   */
  IDSolicAprovPV: number;
  /**
   * Código da Situação da Solicitação de Aprovação
   */
  inCodSituacaoSolAprPV: number;
  /**
   * Código da Situação da Solicitação de Aprovação
   */
  chDesSituacaoSolAprPV: string;
  /**
   * Identificador Único da Tabela de Pedido de Venda (PedVenda)
   */
  IDPedVenda: number;
  /**
   * Identificador do Estabelecimento Interno da Empresa Responsável pelo Pedido de Venda
   */
  IDEstabelec: number;
  /**
   * Código do Estabelecimento
   */
  chCodEstabelec: string;
  /**
   * Nome Abreviado do Estabelecimento
   */
  chNomAbrevEstabelec: string;
  /**
   * Nome do Estabelecimento
   */
  chNomeEstabelec: string;
  /**
   * Número do Pedido de Venda
   */
  inNumPedVenda: number;
  /**
   * Código da Situação do Pedido de Venda
   */
  inCodSituacaoPedVen: number;
  /**
   * Descrição da Situação do Pedido de Venda
   */
  chDesSituacaoPedVen: string;
  /**
   * Número do Pedido do Representante
   */
  chNumPedRep: string;
  /**
   * Número do Pedido no Sistema da Empresa
   */
  chNumPedEmp: string;
  /**
   * Número do Pedido do Cliente
   */
  chNumPedCli: string;
  /**
   * Data de Emissão do Pedido de Venda
   */
  daDatEmissao: Date;
  /**
   * Data de Entrada do Pedido de Venda
   */
  daDatEntrada: Date;
  /**
   * Somatório do Valor dos Produtos dos Itens do Pedido de Venda
   */
  deValProduto: number;
  /**
   * Somatório do Valor Total dos Itens do Pedido de Venda, incluindo (Valor dos Produto + Valor do IPI + Valor do ICMS/ST)
   */
  deValTotal: number;
  /**
   * Somatório do Valor Total dos Itens do Pedido, considerados como Tipo de Venda
   */
  deValVenda: number;
  /**
   * Somatório do Valor Total dos Itens do Pedido, considerados como Tipo de Bonificação	decimal(14,2)
   */
  deValBonific: number;
  /**
   * Indicador se o Pedido de Venda é o principal para Solicitação de Aprovação
   */
  lgPedPrincipal: boolean;
  /**
   * Lista de Estruturas Dados dos Itens do Pedido de Venda Relacionado a Solicitação de Aprovação
   * Lista de Tipo Complexo
   * Estrutura de dados da Entidade PedVendaItemEL01
   */
  pedVendaItens: Array<ModelPedVendaItemEL01>;
}
