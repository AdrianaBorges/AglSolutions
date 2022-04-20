import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Situações do Pedido de Venda disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */


export class ModelSituacaoPedVen extends ApiErrorCollection {

    /**
     * Código da Situação do Pedido de Venda
     */
    inCodSituacaoPedVen: number;

    /**
     * Descrição da Situação do Pedido de Venda
     */
    chDescricao: string;

    /**
     * Indicador se Permite que Pedidos de Venda nesta situação, podem retornar para situação de digitação, antes de serem enviados para empresa
     */
    lgPermRedigitar: Boolean;

    /**
     * Indicador se Permite que Pedidos de Venda nesta situação, podem retornar para situação de digitação, depois de serem enviados para empresa
     */
    lgPermDevolver: Boolean;

    /**
     * Indicador se Permite que Pedidos de Venda nesta situação, possam ser cancelados, sem possibilidade de retornar para situação de digitação
     */
    lgPermCancelar: Boolean;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}
