/**
 * Manutenção de Assistências Técnica disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento da AssTecnica.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * O Número da Assistência (inNumAssTecnica) será atribuído conforme parametrizado no "FVENDA.AssTecnica"
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DA ASSISTÊNCIA TÉCNICA DO MÓDULO FVENDA.
 */
export class ModelAssTecnicaEL01 {
  /**
    Identificador Único da Tabela (Gerado Automaticamente)
   */
  IDAssTecnica: number;

  /**
    Identificador do Estabelecimento Interno da Empresa Responsável pela Assistência Técnica
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
    Número da Assistência Técnica
   */
  inNumAssTecnica: number;

  /**
    Código do Tipo de Assistência Técnica
   */
  inCodTipoAssTec: number;

  /**
    Descrição do Tipo de Assistência Técnica
   */
  chDesTipoAssTec: string;

  /**
    Código da Origem da Assistência Técnica
   */
  inCodOrigemAssTec: number;

  /**
    Descrição da Origem da Assistência Técnica
   */
  chDesOrigemAssTec: string;

  /**
    Código da Situação da Assistência Técnica
   */
  inCodSituacaoAssTec: number;

  /**
    Descrição da Situação da Assistência Técnica
   */
  chDesSituacaoAssTec: string;

  /**
    Data de Abertura da Assistência Técnica
   */
  dtDatAbertura: Date;

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
    Nome do Cliente
   */
  chNomeCliente: string;

  /**
    Código do Cliente
   */
  inCodCliente: number;

  /**
    Nome Abreviado do Cliente
   */
  chNomAbrevCliente: string;

  /**
    Nome do Contato no Cliente responsável pela abertura da Assistência Técnica
   */
  chNomContatoCliente: string;

  /**
    Número do Pedido de Remessa do Cliente com os Itens para Assistência Técnica
   */
  chNumPedCliente: string;

  /**
    Identificador Único da Tabela de Representante
   */
  IDRepresentante: number;

  /**
    Identificador Único da Tabela PapelPessoa
    Identifica o Papel da Pessoa Representante relacionada ao cliente
   */
  IDPapelPessoaRepresentante: number;

  /**
    Identificador Único da Tabela de Pessoa
    Identifica a qual Pessoa Representante o Cliente esta Relacionado
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
    Nome do Representante
   */
  chNomeRepresentante: string;

  /**
    Código do Representante
   */
  inCodRepresentante: number;

  /**
    Nome Abreviado do Representante
   */
  chNomeAbrevRepresentante: string;

  /**
   * Identificador Único da Tabela de Técnico
   */
  IDTecnico: number;

  /**
    Código do Tipo do Técnico
   */
  inCodTipoTecnico: number | null;

  /**
    Descrição do Tipo de Técnico
   */
  chDesTipoTecnico: string;

  /**
   * Código do Técnico
   */
  inCodTecnico: number;

  /**
    * Nome Abreviado do Técnico
    */
  chNomAbrevTecnico: string;

  /**
    Identificador Único da Tabela de PapelPessoa, que identifica a Pessoa no Papel selecionado pelo Tipo de Técnico
   */
  IDPapelPessoaTecnico: number | null;

  /**
    Identificador Único da Tabela de Pessoa
   */
  IDPessoaTecnico: number | null;
  /**
    Código do Tipo de Pessoa como Técnico
   */

  inCodTipoPessoaTecnico: number | null;
  /**
    Descrição do Tipo de Pessoa como Técnico
   */
  chDesTipoPessoaTecnico: string;

  /**
    Código do Tipo de Documento de Identificação da Pessoa como Tecnico
   */
  inCodTipoDocumentoTecnico: number | null;

  /**
  Descrição do Tipo de Documento de Identificação da Pessoa como Tecnico
  */
  chDesTipoDocumentoTecnico: string;

  /**
    Documento de Identificação da Pessoa como Tecnico
   */
  inNumIdentifTecnico: number | null;

  /**
    Nome do Técnico
   */
  chNomeTecnico: string;

  /**
    Número do Atendimento ao Cliente gerado no Sistema Externo referente a Assistência Técnica
   */
  chNumAtendExt: string;

  /**
    Número da Nota Fiscal de Venda para o Consumidor final dos Itens da Assistência Técnica
   */
  chNumNFVendaFinal: string;

  /**
    Data da Venda dos Itens da Assistência Técnica para o Consumidor Final
   */
  daDatVendaFinal: Date;

  /**
    Série da Nota Fiscal de Entrada dos Itens da Assistência Técnica
   */
  chCodSerieNFEntrada: string;

  /**
    Número da Nota Fiscal de Entrada dos Itens da Assistência Técnica
   */
  chNumNFEntrada: string;

  /**
    Data de Emissão da Nota Fiscal de Entrada dos Itens da Assistência Técnica
   */
  daDatEmisNFEntrada: Date;

  /**
    Data/Hora de Recebimento dos Itens da Assistência Técnica
   */
  dtDatRecebItem: Date;

  /**
    Observação da Assistência Técnica
   */
  chDesObservacao: string;

  /**
    Descrição do Motivo de Cancelamento da Assistência Técnica
   */
  chDesMotivoCanc: string;

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
    Data/Hora do Encerramento (Atendimento/Cancelamento) da Assistência Técnica
   */
  dtDatEncerram: Date;

  /**
    Código do Usuário responsável pelo Encerramento (Atendimento/Cancelamento) da Assistência Técnica
   */
  chCodUsuarioEncerram: string;

  /**
   * Nome do Usuário responsável pelo Encerramento (Atendimento/Cancelamento) da Assistência Técnica
   */
  chNomeUsuarioEncerram: string;


  /**
   * Quantidade Total de Registros existentes na tabela.
   * Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}