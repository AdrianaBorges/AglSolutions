/**
 * Manutenção de Defeitos Alegados do Item da Assistência Técnica disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelAssTecItemDefAleg {

  /**
  Identificador Único da Tabela (Gerado Automaticamente)
   */
  IDAssTecItemDefAleg: number;

  /**
Identificador Único da Tabela de AssTecItem
*/
  IDAssTecItem: number;

  /**
Identificador Único da Tabela de Defeito
*/
  IDDefeito: number;

  /**
Código do Defeito
*/
  chCodDefeito: string;

  /**
    Descrição do Defeito
   */
  chDesDefeito: string;

  /**
     Descrição do Problema Alegado
   */
  chDesProblema: string;

  /**
    Descrição da provável solução para o Problema Alegado
   */
  chDesSolucao: string;

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
   * Código da Situação do Item da Assistência Técnica
   */
  inCodSituacaoAssTecItem: number;
  
  /**
   * Descrição da Situação do Item da Assistência Técnica
   */
  chDesSituacaoAssTecItem: string;

  /**
  Quantidade Total de Registros existentes na tabela.
  Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}