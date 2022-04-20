/**
 * Manutenção de Pedido de Venda disponíveis no Sistema.
 * Entidade Lógica com operações específicas de tratamento do PedVenda.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * O Número do Pedido (inNumPedVenda) será atribuído conforme parametrizado no "FVENDA.PedVenda"
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO PEDIDO DE VENDA DO MÓDULO FVENDA.
 */

 export class ModelPedVendaEL01 {

  /**
    Identificador Único da Tabela (Gerado Automaticamente)
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
    Lista de Códigos de Tipo de Pedido.
    Os Códigos estarão separados por virgula (,)
  */
  chLstTipoPedido: string;

  /**
    Código da Origem do Pedido de Venda
  */
  inCodOrigemPedVen: number;

  /**
    Descrição da Origem do Pedido de Venda
  */
  chDesOrigemPedVen: string;

  /**
    Código da Origem do Pedido de Venda
  */
  inCodSituacaoPedVen: number;

  /**
    Código da Origem do Pedido de Venda
  */
  chDesSituacaoPedVen: string;

  /**
    Identifica se o Pedido poderá retornar para Digitação antes de ter sido enviado para empresa
  */
  lgPermRedigitar: boolean;

  /**
    Identifica se o Pedido poderá retornar para Digitação depois de ter sido enviado para empresa
  */
  lgPermDevolver: boolean;

  /**
    Identifica se o Pedido poderá ser cancelado e não mais alterado
  */
  lgPermCancelar: boolean;

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
    Número da Ordem de Compra do Cliente
  */
  chNumOrdCompCli: string;

  /**
    Data de Emissão do Pedido de Venda
  */
  daDatEmissao: Date;

  /**
    Data de Entrada do Pedido de Venda
  */
  daDatEntrada: Date;

  /**
   Data Limite para o Faturamento do Pedido de Venda
  */
  daDatLimFatur: Date;

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
    Identificador Único da Tabela de Cliente de Venda
  */
  IDClienteVenda: number;

  /**
    Identificador Único da Tabela de Cliente
  */
  IDCliente: number;

  /**
    Identificador Único da Tabela de Cliente de Venda
  */
  IDPapelPessoaCliente: number;

  /**
    Identificador Único da Tabela de Pessoa
  */
  IDPessoaCliente: number;

  /**
    Código do Tipo de Pessoa como Cliente
  */
  inCodTipoPessoaCliente: number;

  /**
    Descrição do Tipo de Pessoa como Cliente
  */
  chDesTipoPessoaCliente: string;

  /**
    Código do Tipo de Documento de Identificação da Pessoa como Cliente
  */
  inCodTipoDocumentoCliente: number;

  /**
    Descrição do Tipo de Documento de Identificação da Pessoa como Cliente
  */
  chDesTipoDocumentoCliente: string;

  /**
    Documento de Identificação da Pessoa como Cliente
  */
  inNumIdentifCliente: number;

  /**
    Código do Cliente
  */
  inCodCliente: number;

  /**
    Nome Abreviado do Cliente
  */
  chNomAbrevCliente: string;

  /**
    Nome do Cliente
  */
  chNomeCliente: string;

  /**
    Identificador Único da Tabela de Endereço da Pessoa
  */
  IDPessoaEnderecoEntrega?: number;

  /**
    Nome do Comprador
  */
  chNomComprador: string;

  /**
    Identificador Único da Tabela de Representante
  */
  IDRepresentante: number;

  /**
    Identificador Único da Tabela PapelPessoa
    Identifica o Papel da Pessoa relacionada ao Representante
  */
  IDPapelPessoaRepresentante: number;

  /**
    Identificador Único da Tabela de Pessoa Identifica a qual Pessoa o Representante esta Relacionado
  */
  IDPessoaRepresentante: number;

  /**
    Código do Tipo de Pessoa Representante
  */
  inCodTipoPessoaRepresentante: number;

  /**
    Descrição do Tipo de Pessoa Representante
  */
  chDesTipoPessoaRepresentante: string;

  /**
    Código do Tipo de Documento de Identificação da Pessoa Representante
  */
  inCodTipoDocumentoRepresentante	: number;

  /**
    Descrição do Tipo de Documento de Identificação da Pessoa Representante
  */
  chDesTipoDocumentoRepresentante: string;

  /**
    Documento de Identificação da Pessoa Representante
  */
  inNumIdentifRepresentante: number;

  /**
    Código do Representante
  */
  inCodRepresentante: number;

  /**
    Nome Abreviado do Representante
  */
  chNomeAbrevRepresentante: string;

  /**
    Nome do Representante
  */
  chNomeRepresentante: string;

  /**
    Identificador Único da Tabela de Transportadora
  */
  IDTransp: number;

  /**
    Código da Transportadora
  */
  inCodTransp: number;

  /**
    Nome Abreviado da Transportadora
  */
  chNomAbrevTransp: string;

  /**
    Nome da Transportadora
  */
  chNomeTransp: string;

  /**
    Código do Tipo de Frete
  */
  inCodTipoFrete: number;

  /**
    Descrição do Tipo de Frete
  */
  chDesTipoFrete: string;

  /**
    Identificador Único da Tabela de Transportadora para Redespacho
  */
  IDRedesp?: number;

  /**
    Código da Transportadora de Redespacho
  */
  inCodRedesp: number;

  /**
    Nome Abreviado da Transportadora de Redespacho
  */
  chNomAbrevRedesp: string;

  /**
    Nome da Transportadora de Redespacho
  */
  chNomeRedesp: string;

  /**
    Código do Tipo de Frete para Redespacho
  */
  inCodTipoFreteRedesp?: number;

  /**
    Descrição do Tipo de Frete de Redespacho
  */
  chDesTipoFreteRedesp: string;

  /**
    Código da Condição de Pagamento de Venda
  */
  chCodCondPagtoVenda: string;

  /**
    Descrição da Condição de Pagamento
  */
  chDesCondPagtoVenda: string;

  /**
    Condição de Pagamento (Lista de Dias para Vencimento, separados por "/")
    Ex.: 05/35/65
  */
  chCondicao: string;

  /**
    Identificador Único da Tabela TabPreco
  */
  IDTabPreco?: number;

  /**
    Código da Tabela de Preços
  */
  chCodTabPreco: string;

  /**
    Descrição da Tabela de Preços
  */
  chDesTabPreco: string;

  /**
    Data Base para Calculo do Vencimento das Parcelas
  */
  daDatBase: Date;

  /**
    Somatório do Valor dos Produtos dos Itens do Pedido de Venda
  */
  deValProduto: number;

  /**
    Somatório do Valor do IPI dos Itens do Pedido de Venda
  */
  deValIPI: number;

  /**
    Somatório do Valor do ICMS por Substituição Tributária dos Itens do Pedido de Venda
  */
  deValST: number;

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
  deValBonific: number;

  /**
    Observação do Pedido
  */
  chDesObservacao: string;

  /**
    Descrição detalhada do Motivo de Não Aprovação do Pedido
  */
  chDesMotivoNaoAprov: string;

  /**
    Descrição detalhada do Motivo de Rejeição do Pedido
  */
  chDesMotivoRejeitado: string;

  /**
    Data/Hora de Inclusão do Registro
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
