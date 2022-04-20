/**
 * Manutenção de Itens Substituídos no Item da Assistência Técnica disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelAssTecItemSubs {

  /**
  Identificador Único da Tabela (Gerado Automaticamente)
   */
  IDAssTecItemSubs: number;

  /**
Identificador Único da Tabela de AssTecItem
*/
  IDAssTecItem: number;

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
   * Descrição Complementar do Item Substituído
   */
  chDesComplem: string;

  /**
   * Quantidade Substituída do Item
   */
  deQtdSubs: number;

  /**
   * Número da Solicitação do Item Substituído no Estoque
   */
  chNumSolicEstoque: string;

  /**
   * Data da Solicitação do Item Substituído no Estoque
   */
  dtDatSolicEstoque: Date;

  /**
   * Data de Recebimento do Item Substituído do Estoque
   */
   dtDatRecebEstoque: Date;

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
Código da Situação do Item da Assistência Técnica
*/
  inCodSituacaoAssTecItem: number;

  /**
Código da Situação do Item da Assistência Técnica
*/
  chDesSituacaoAssTecItem: string;

  /**
  Quantidade Total de Registros existentes na tabela.
  Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}
