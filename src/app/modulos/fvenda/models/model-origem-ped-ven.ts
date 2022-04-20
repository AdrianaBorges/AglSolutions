import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Origens dos Pedidos de Venda disponíveis no sistema.
 */


export class ModelOrigemPedVen extends ApiErrorCollection {

    /**
     * Código da Origem do Pedido de Venda
     */
    inCodOrigemPedVen: number;

    /**
     * Descrição da Origem do Pedido de Venda
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}