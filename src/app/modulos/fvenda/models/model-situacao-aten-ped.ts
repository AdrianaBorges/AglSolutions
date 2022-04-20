import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Situações de Atendimento do Item do Pedido de Venda disponíveis no sistema.
 */


export class ModelSituacaoAtenPed extends ApiErrorCollection {

    /**
     * Código da Situação de Atendimento do Item do Pedido de Venda
     */
     inCodSituacaoAtenPed: number;

    /**
     * Descrição da Situação de Atendimento do Item do Pedido de Venda
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}