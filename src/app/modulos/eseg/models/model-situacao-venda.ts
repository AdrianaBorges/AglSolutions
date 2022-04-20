import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Situações de Vendas
 */

export class ModelSituacaoVenda extends ApiErrorCollection {

    /**
     * Código da Situação da Venda
     */
    inCodSituacaoVenda: number;

    /**
     * Descrição da Situação da Venda
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}