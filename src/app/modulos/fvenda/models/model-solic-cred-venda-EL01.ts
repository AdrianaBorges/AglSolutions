import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Situações da Solicitação de Crédito de Venda disponíveis no sistema.
 */


export class ModelSolicCredVendaEL01 extends ApiErrorCollection {

  /**
   * Identificador Único da Tabela (Gerado Automaticamente)
   */
  IDSolicCredVenda: number;

  /**
   * Data da Solicitação de Aprovação de Crédito
   */
  dtDatSolic: Date;

  /**
   * Código do Usuário de Solicitação de Aprovação
   */
  chCodUsuarioSolic: string;

  /**
   * Nome do Usuário
   */
  chNomeUsuarioSolic: string;

  /** 
   * E-Mail de Comunicação com o Usuário
   */
  chEMailUsuarioSolic: string;

  /** 
   * Código da Situação da Solicitação de Aprovação
   */
  inCodSituacaoSolicCred: number;

  /**
   * Descrição da Situação da Solicitação de Crédito
   */
  chDesSituacaoSolicCred: string;

  /**
   * Identificador Único da Tabela de Cliente de Venda
   */
  IDClienteVenda: number;  

  /**
   * Identificador Único da Tabela de Cliente
   */
  IDCliente: number;

  /**
   * Identificador Único da Tabela PapelPessoa
   * Identifica a qual Pessoa o Cliente esta Relacionado
   */
  IDPapelPessoaCliente: number;

  /**
   * Identificador Único da Tabela de Pessoa
   */
  IDPessoaCliente: number;

  /**
   * Código do Tipo de Pessoa
   */
  inCodTipoPessoa: number;

  /**
   * Descrição do Tipo de Pessoa como Cliente
   */
  chDesTipoPessoa: string;

  /**
   * Código do Tipo de Documento de Identificação da Pessoa
   */
  inCodTipoDocumento: number;

  /**
   * Descrição do Tipo de Documento de Identificação da Pessoa como Cliente
   */
  chDesTipoDocumento: string;

  /**
   * Documento de Identificação do Cliente de Venda
   */
  inNumIdentifCliente: number;

  /**
   * Código do Cliente
   */
  inCodCliente: number;

  /**
   * Nome Abreviado do Cliente
   */
  chNomeAbrevCliente: string;

  /**
    * Nome do Cliente
    */
  chNomeCliente: string;

  /**
    * Valor do Limite de Crédito para Vendas ao Cliente
    */
  deValLimCreditoCliente: number;

  /**
    * Data de Expiração do Valor do Limite de Crédito
    */
  daDatExpLimCreditoCliente: Date;

  /**
    * Código da Condição de Pagamento preferencial do cliente
    */
  chCodCondPagtoCliente: string;

  /**
   * Descrição da Condição de Pagamento
   */
  chDesCondPagtoCliente: string;

  /**
   * Condição de Pagamento (Lista de Dias para Vencimento, separados por "/")
   * Ex.: 05/35/65
   */
  chCondicaoCliente: string;

  /**
   * Identificador Único da Tabela de Representante
   */
  IDRepresentante: number;

  /**
   * Identificador Único da Tabela PapelPessoa
   * Identifica o Papel da Pessoa Representante relacionada ao cliente
   */
  IDPapelPessoaRepresentante: number;

  /**
   * Identificador Único da Tabela de Pessoa
   * Identifica a qual Pessoa Representante o Cliente esta Relacionado
   */
  IDPessoaRepresentante: number;

  /**
   * Código do Tipo de Pessoa Representante
   */
  inCodTipoPessoaRepresentante: number;

  /**
   * Descrição do Tipo de Pessoa Representante
   */
  chDesTipoPessoaRepresentante: number;

  /**
   * Código do Tipo de Documento de Identificação da Pessoa Representante
   */
  inCodTipoDocumentoRepresentante: number;

  /**
   * Descrição do Tipo de Documento de Identificação da Pessoa Representante
   */
  chDesTipoDocumentoRepresentante: string;

  /**
   * Documento de Identificação da Pessoa Representante
   */
  inNumIdentifRepresentante: number;

  /**
   * Nome do Representante
   */
  chNomeRepresentante: string;

  /**
   * Código do Representante
   */
  inCodRepresentante: number;

  /**
   * Nome Abreviado do Representante
   */
  chNomeAbrevRepresentante: string;

  /**
   * Código da Condição de Pagamento
   */
  chCodCondPagtoVenda: string;

  /**
   * Descrição da Condição de Pagamento
   */
  chDesCondPagtoVenda: string;

  /**
   * Condição de Pagamento (Lista de Dias para Vencimento, separados por "/")
   * Ex.: 05/35/65
   */
  chCondicao: string;

  /**
   * Valor de Crédito Solicitado para Aprovação
   */
  deValCredSolic: number;

  /**
   * Valor do Pedido de Venda
   */
  deValPedVenda: number;

  /**
   * Observação da Solicitação de Aprovação de Crédito
   */
  chDesObservacao: string;

  /**
   * Identificador Único da Tabela de InfoSerasa
   */
  IDInfoSerasa: number;

  /**
   * Data/Hora da Última Consulta no Serasa para o Cliente
   */
  dtDatUltConsultaSerasa: Date;

  /**
   * Informações Estruturadas oriundas do Sistema ERP, para ser exibida no Relatório de Análise para Aprovação do Crédito
   */
  chDesInfoERP: string;

  /**
   * Código do Usuário de Aprovação do Crédito
   */
  chCodUsuarioAprov: string;

  /**
* Nome do Usuário de Aprovação do Crédito
*/
  chNomeUsuarioAprov: string;

  /**
   * E-Mail de Comunicação com o Usuário Aprovador do Crédito
   */
  chEMailUsuarioAprov: string;

  /**
   * Valor do Crédito Aprovado
   */
  deValCredAprov: number;

  /**
   * Código do Motivo da Rejeição do Crédito
   */
  inCodMotivoRejeita: number;


  /**
   * Descrição do Motivo de Rejeição
   */
  chDesMotivoRejeita: string;

  /**
   * Detalhes do Motivo da Rejeição do Crédito
   */
  chDesMotivo: string;

  /**
   * Data/Hora de Inclusão do Registro
   */
  dtDatInclusao: Date;

  /**
   * Data/Hora da Última Alteração no Registr
   */
  dtDatUltAlteracao: Date;

  lgClienteNovo: boolean;
  /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
  inRecordCount: number;
}