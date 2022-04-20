/**
 * Manutenção de Parâmetros de Campanha de Venda disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento de Parâmetros da Campanha.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE PARÂMETROS DA CAMPANHA DO MÓDULO FVENDA.
 */
export class ModelCampanhaParamEL01 {

  /**
  Identificador Único da Tabela (Gerado Automaticamente)
   */
  IDCampanhaParam: number;

  /**
Identificador Único da Tabela Campanha
Identifica a qual Campanha o Parâmetro esta Relacionado
*/
  IDCampanha: number;

  /**
   * Código da Campanha de Venda
   */
  chCodCampanha: string;

  /**
   * Descrição da Campanha
   */
  chDesCampanha: string;

  /**
   * Código do Tipo de Campanha
   */
  inCodTipoCampanha: number;

  /**
   * Descrição do Tipo de Campanha
   */
  chDesTipoCampanha: string;


  /**
   * Código da Situação da Campanha
   */
  inCodSituacaoCamp: number;

  /**
   * Descrição da Situação da Campanha
   */
  chDesSituacaoCamp: string;

  /**
   * Data/Hora de Inicio da Campanha
   */
  dtDatInicio: Date;

  /**
   * Data/Hora de Inicio da Campanha
   */
  dtDatFim: Date;

  /**
Descrição do Grupo de Estabelecimento
*/
  inCodGrupoEstab: number;

  /**
    Descrição do Defeito
   */
  chDesGrupoEstab: string;

  /**
   * Identificador Único da Tabela Estabelec
   */
  IDEstabelec: number;

  /**
    Identificador Único da Tabela de Pessoa a qual o Estabelecimento esta relacionado
   */
  IDPessoaEstabelec: number;

  /**
   * Identificador Único da Tabela PapelPessoa
   * Identifica a qual Pessoa o Estabelecimento esta Relacionado
  */
  IDPapelPessoaEstabelec: number;

  /**
   * Identificador Único da Tabela Empresa
   */
  IDEmpresa: number;

  /**
   * Código do Estabelecimento
   */
  chCodEstabelec: string;

  /**
   * Nome Abreviado do Estabelecimento
   */
  chNomeAbrevEstabelec: string;

  /**
   * Código do Usuário responsável pela Última Alteração no Registro
   */
  chCodUsuarioAlteracao: string;

  /**
   * Nome do Estabelecimento
   */
  chNomeEstabelec: string;

  /**
   * Número de Identificação Lógica da Pessoa do Tipo Estabelecimento
   * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
   */
  inCNPJEstabelec: number;

  /**
   * Nome da Pessoa relacionada ao Estabelecimento
   */
  chNomePessoaEstabelec: string;

  /**
   * Número de Identificação Lógica da Pessoa do Tipo Empresa
   * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
   */
  inCNPJEmpresa: number;

  /**
   * Nome da Pessoa relacionada a Empresa
   */
  chNomePessoaEmpresa: string;

  /**
   * Data/Hora de Inicio das Vendas para participação na campanha
   */
  dtDatVendaIni: Date;

  /**
   *  Data/Hora de Fim das Vendas para participação na campanha
   */
  dtDatVendaFim: Date;

  /**
   * Valor Mínimo da Venda para participação na campanha
   */
  deValVendaMinimo: number;

  /**
   * Valor do Prêmio para o tipo de campanha Prêmio Instantâneo
   */
  deValPremio: number;

  /**
   * Identificador se o Prêmio Instantâneo foi sorteado
   */
  lgPremioInstSorteado: boolean;

  /**
  Quantidade Total de Registros existentes na tabela.
  Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}