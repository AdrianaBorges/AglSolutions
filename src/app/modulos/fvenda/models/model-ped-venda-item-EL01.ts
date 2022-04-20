/**
 * Manutenção de Itens do Pedido de Venda disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do PedVendaItem.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO ITEM DO PEDIDO DE VENDA DO MÓDULO FVENDA.
 */

 export class ModelPedVendaItemEL01 {

  /**
    Identificador Único da Tabela (Gerado Automaticamente)
  */
  IDPedVendaItem: number;

  /**
    Identificador Único da Tabela de PedVenda
  */
  IDPedVenda: number;

  /**
    Sequência do Item no Pedido de Venda
  */
  inNumSeq: number;

  /**
    Identificador Único da Tabela TipoPedido
  */
  IDTipoPedido: number;

  /**
    Código do Tipo de Pedido de Venda
  */
  chCodTipoPedido: string;

  /**
    Descrição do Tipo de Pedido de Venda
  */
  chDesTipoPedido: string;

  /**
    Indicador se o Item do Pedido será considerados como Venda
  */
  lgConsideraVenda: Boolean;

  /**
    Identificador Único da Tabela de Item
  */
  IDItem: number;

  /**
    Código do Item
  */
  chCodItem: string;

  /**
    Descrição do Item
  */
  chDesItem: string;

  /**
    Código da Unidade de Medida do Item
  */
  chCodUMItem: string;

  /**
    Descrição complementar do Item do Pedido de Venda
  */
  chDesCompl: string;

  /**
    Identificador Único da Tabela TabPreco
  */
  IDTabPreco: number;

  /**
    Código da Tabela de Preços
  */
  chCodTabPreco: string;

  /**
    Descrição da Tabela de Preços
  */
  chDesTabPreco: string;

  /**
    Descrição da Tabela de Preços
  */
  deQtdItem: number;

  /**
    Preço do Item na Tabela de Preços
  */
  dePrecoTabela: number;

  /**
    Valor Unitário Bruto do Item
  */
  deValUnitBruto: number;

  /**
    Lista de Desconto Cascata que será aplicado no valor unitário bruto para gerar o valor unitário líquido
    Exemplo: 10+5,5+1
  */
  chDescCascata: string;

   /**
    Valor Unitário Liquido do Item
  */
  deValUnitLiquido: number;

  /**
    Valor Total Líquido do Item
  */
  deValTotLiquido: number;

  /**
    % do IPI do Item
  */
  dePercIPI: number;

  /**
    Valor do IPI do Item
  */
  deValIPI: number;

  /**
    % do ICMS/ST do Item
  */
  dePercST: number;

  /**
    Valor do ICMS/ST do Item
  */
  deValST: number;

  /**
    Data de Entrega Solicitada
  */
  daDatEntregaSolic: Date;

  /**
    Data de Entrega Prevista
  */
  daDatEntregaPrev: Date;

  /**
    Data de Faturamento Previsto
  */
  daDatFaturPrev: Date;

  /**
    Código da Natureza de Operação do Item do Pedido
  */
  chCodNatOper: string;

  /**
    Código da Situação de Atendimento do Item do Pedido de Venda
  */
  inCodSituacaoAtenPed: number;

  /**
    Código da Situação do Pedido de Venda
  */
  inCodSituacaoPedVen: number;

  /**
    Descrição da Situação de Atendimento do Item do Pedido de Venda
  */
  chDesSituacaoAtenPed: string;

  /**
    Descrição detalhada do Motivo de Cancelamento do Item do Pedido
  */
  chDesMotivoCancel: string;

  /**
    Data/Hora de Inclusão do Registroa
  */
  dtDatInclusao: Date;

  /**
    Código do Usuário responsável pela inclusão do Registro
  */
  chCodUsuarioInclusao: string;

  /**
    Nome do Usuário responsável pela inclusão do Registro
  */
  chNomeUsuarioInclusao: string;

  /**
    Data/Hora da Última Alteração no Registro
  */
  dtDatUltAlteracao: Date;

  /**
    Código do Usuário responsável pela Última Alteração no Registro
  */
  chCodUsuarioAlteracao: string;

  /**
    Nome do Usuário responsável pela Última Alteração do Registro
  */
  chNomeUsuarioAlteracao: string;

  /**
   * Quantidade Total de Registros existentes na tabela.
   * Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}
