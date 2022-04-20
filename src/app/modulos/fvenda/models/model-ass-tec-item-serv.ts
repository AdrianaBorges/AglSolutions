/**
 * Manutenção de Serviços Realizados no Item da Assistência Técnica disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelAssTecItemServ {

    /**
    Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDAssTecItemServ: number;

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
     * Descrição Complementar do Serviço
     */
    chDesComplem: string;

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