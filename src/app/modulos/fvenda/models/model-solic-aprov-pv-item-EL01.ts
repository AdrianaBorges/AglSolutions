/**
 * Manutenção do Pedido de Venda Relacionado a Solicitação de Aprovação disponíveis no sistema.
 * Entidade Lógica, com o objetivo de executar vários processos na criação do Pedido de Venda relacionado a Solicitação de Aprovação.
 * Esta API permite a inclusão, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE PEDIDO DE VENDA RELACIONADO A SOLICITAÇÃO DE APROVAÇÃO DO MÓDULO FVENDA.
 */
 export class ModelSolicAprovPVItemEL01 {

  /**
    Identificador Único da Tabela (Gerado Automaticamente)
  */
  IDSolicAprovPVItem: number;

  /**
    Identificador Único da Tabela de Solicitação de Aprovação de Pedido de Venda (SolicAprovPVItem)
  */
  IDSolicAprovPV: number;

  /**
    Código da Situação da Solicitação de Aprovação
  */
  inCodSituacaoSolAprPV: number;

  /**
    Código da Situação da Solicitação de Aprovação
  */
  chDesSituacaoSolAprPV: string;

  /**
    Identificador Único da Tabela de Pedido de Venda (PedVenda)
  */
  IDPedVenda: number;

  /**
    Identificador do Estabelecimento Interno da Empresa Responsável pelo Pedido de Venda
  */
  IDEstabelec: number;

  /**
    Código do Estabelecimento
  */
  chCodEstabelec: string;

  /**
    Nome Abreviado do Estabelecimento
  */
  chNomAbrevEstabelec: string;

  /**
    Nome do Estabelecimento
  */
  chNomeEstabelec: string;

  /**
    Número do Pedido de Venda
  */
  inNumPedVenda: number;

  /**
    Código da Situação do Pedido de Venda
  */
  inCodSituacaoPedVen	: number;

  /**
    Descrição da Situação do Pedido de Venda
  */
  chDesSituacaoPedVen: string;

  /**
    Número do Pedido do Representante
  */
  chNumPedRep: string;

  /**
    Número do Pedido no Sistema da Empresa
  */
  chNumPedEmp: string;

  /**
    Número do Pedido do Cliente
  */
  chNumPedCli: string;

  /**
    Data de Emissão do Pedido de Venda
  */
  daDatEmissao: Date;

  /**
    Data de Entrada do Pedido de Venda
  */
  daDatEntrada: Date;

  /**
    Somatório do Valor dos Produtos dos Itens do Pedido de Venda
  */
  deValProduto: number;

  /**
    Somatório do Valor Total dos Itens do Pedido de Venda, incluindo (Valor dos Produto + Valor do IPI + Valor do ICMS/ST)
  */
  deValTotal: number;

  /**
    Somatório do Valor Total dos Itens do Pedido, considerados como Tipo de Venda
  */
  deValVenda: number;

  /**
    Somatório do Valor Total dos Itens do Pedido, considerados como Tipo de Bonificação
  */
  deValBonific	: number;

  /**
    Indicador se o Pedido de Venda é o principal para Solicitação de Aprovação
  */
  lgPedPrincipal: Boolean;

  /**
   * Quantidade Total de Registros existentes na tabela.
   * Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}
