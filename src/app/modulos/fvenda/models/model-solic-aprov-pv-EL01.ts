/**
 * Manutenção de Solicitação de Aprovação de Pedido de Venda disponíveis no sistema.
 * Entidade Lógica, com o objetivo de executar vários processos na criação ou atualização da Solicitação de Aprovação de Pedido de Venda.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE SOLICITAÇÃO DE APROVAÇÃO DE PEDIDO DE VENDA DO MÓDULO FVENDA.
 */
 import { ModelSolicAprovPVItens } from './model-solic-aprov-pv-itens';

export class ModelSolicAprovPVEL01 {
  /**
    Identificador Único da Tabela (Gerado Automaticamente)
  */
  IDSolicAprovPV: number;

  /**
    Data da Solicitação de Aprovação de Pedido de Venda
  */
  dtDatSolic: Date;

  /**
    Código do Usuário da Solicitação de Aprovação
  */
  chCodUsuarioSolic: string;

  /**
    Nome do Usuário
  */
  chNomeUsuarioSolic: string;

  /**
    E-Mail de Comunicação com o Usuário
  */
  chEMailUsuarioSolic: string;

  /**
    Código da Situação da Solicitação de Aprovação
  */
  inCodSituacaoSolAprPV: number;

  /**
    Código da Situação da Solicitação de Aprovação
  */
  chDesSituacaoSolAprPV	: string;

  /**
    Identificador Único da Tabela de Cliente de Venda
  */
  IDClienteVenda: number;

  /**
    Identificador Único da Tabela de Cliente
  */
  IDCliente: number;

  /**
    Identificador Único da Tabela PapelPessoa
    Identifica a qual Pessoa o Cliente esta Relacionado
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
  inCodTipoDocumentoRepresentante: number;

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
    Valor de Pedidos de Bonificações
  */
  deValBonific: number;

  /**
    Valor de Pedidos de Vendas
  */
  deValVenda: number;

  /**
    % de Pedidos de Bonificações sobre Vendas
  */
  dePercBonifXVenda: number;

  /**
    Observação da Solicitação de Aprovação
  */
  chDesObservacao: string;

  /**
    Código do Usuário de Aprovação da Solicitação
  */
  chCodUsuarioAprov: string;

  /**
    Nome do Usuário de Aprovação do Crédito
  */
  chNomeUsuarioAprov: string;

  /**
    E-Mail de Comunicação com o Usuário Aprovador do Crédito
  */
  chEMailUsuarioAprov: string;

  /**
    Código do Motivo da Rejeição da Solicitação
  */
  inCodMotRejSolAprPV: number;

  /**
    Descrição do Motivo de Rejeição
  */
  chDesMotRejSolAprPV: string;

  /**
    Detalhes do Motivo da Rejeição da Solicitação
  */
  chDesMotivo: string;

  /**
    Detalhes do Motivo da Rejeição da Solicitação
  */
  chLstTipoPedido: string;

  /**
    Data/Hora de Inclusão do Registro
  */
  dtDatInclusao: Date;

  /**
    Data/Hora da Última Alteração no Registro
  */
  dtDatUltAlteracao: Date;

  /**
   * Lista de Estruturas Dados dos Itens da Solicitação de Aprovação relacionados
   * Lista de Tipo Complexo
   * Estrutura de dados da Entidade SolicAprovPVItemEL01
   */
  itens: Array<ModelSolicAprovPVItens>;

  /**
   * Quantidade Total de Registros existentes na tabela.
   * Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}
