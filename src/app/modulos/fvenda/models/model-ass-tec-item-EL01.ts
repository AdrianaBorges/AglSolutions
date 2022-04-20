/**
 * Manutenção de Itens da Assistência Técnica disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento da AssTecItem.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO ITEM DA ASSISTÊNCIA TÉCNICA DO MÓDULO FVENDA.
 */
export class ModelAssTecItemEL01 {
  /**
    Identificador Único da Tabela (Gerado Automaticamente)
   */
  IDAssTecItem: number;

  /**
    Identificador Único da Tabela de AssTecnica
   */
  IDAssTecnica: number;

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
   * Código da Unidade de Medida do Item
   */
  chCodUMItem: string;

  /**
   * Identificador Único da Tabela ItemLoteSerie
   */
  IDItemLoteSerie: number;

  /**
   * Código do Modelo do Item
   */
  chCodModelo: string;

  /**
   * Número de Série do Item
   */
  chNumSerie: string;

  /**
   * Número do Lote do Item
   */
  chNumLote: string;

  /**
   * Concatenação do valor dos campos Mod: chCodModelo + Serie: chNumSerie + Lote: chNumLote
   */
  chDesLoteSerie: string;

  /**
   * Número da Série do Item
   */
  chNumSerieItem: string;


  /**
   * Descrição complementar do Item da Assistência Técnica
   */
  chDesComplem: string;

  /**
   * Quantidade do Item da Assistência Técnica
   */
  deQtdItem: number;

  /**
   * Código da Situação do Item da Assistência Técnica
   */
  inCodSituacaoAssTec: number;

  /**
   * Descrição da Situação do Item da Assistência Técnica
   */
  chDesSituacaoAssTec: string;

  /**
   * Código da Solução aplicada no Item da Assistência Técnica
   */
  inCodSolucAssTec: number;

  /**
   * Descrição da Situação da Assistência Técnica
   */
  chDesSolucAssTec: string;

  /**
   * Descrição da Solução aplicada no Item da Assistência Técnica
   */
  chDesSolucao: string;

  /**
   * Descrição do Motivo de Cancelamento do Item da Assistência Técnica
   */
  chDesMotivoCanc: string;

  /**
   * Série da Nota Fiscal de Saída dos Itens da Assistência Técnica para devolução ao cliente
   */
  chCodSerieNFSaida: string;

  /**
   * Número da Nota Fiscal de Saída dos Itens da Assistência Técnica para devolução ao cliente
   */
  chNumNFSaida: string;

  /**
   * Data de Emissão da Nota Fiscal de Saída dos Itens da Assistência Técnica para devolução ao cliente
   */
  daDatEmisNFSaida: Date;

  /**
   * Quantidade Atendida do Item da Assistência Técnica
   */
  deQtdAtend: number;

  /**
   * Data/Hora de Inclusão do Registro
   */
  dtDatInclusao: Date;

  /**
   * Código do Usuário responsável pela inclusão do Registro
   */
  chCodUsuarioInclusao: string;

  /**
   * Nome do Usuário responsável pela inclusão do Registro
   */
  chNomeUsuarioInclusao: string;

  /**
   * Data/Hora da Última Alteração no Registro
   */
  dtDatUltAlteracao: Date;

  /**
   * Código do Usuário responsável pela Última Alteração no Registro
   */
  chCodUsuarioAlteracao: string;

  /**
   * Nome do Usuário responsável pela Última Alteração do Registro
   */
  chNomeUsuarioAlteracao: string;

  /**
   * Data/Hora do Encerramento (Atendimento/Cancelamento) da Assistência Técnica
   */
  dtDatEncerram: Date;

  /**
   * Código do Usuário responsável pelo Encerramento (Atendimento/Cancelamento) da Assistência Técnica
   */
  chCodUsuarioEncerram: string;

  /**
   * Nome do Usuário responsável pelo Encerramento (Atendimento/Cancelamento) da Assistência Técnica
   */
  chNomeUsuarioEncerram: string;

  /**
  Quantidade Total de Registros existentes na tabela.
  Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}