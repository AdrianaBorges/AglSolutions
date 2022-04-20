import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Situações da Solicitação de Crédito de Venda disponíveis no sistema.
 */


export class ModelSituacaoSolicCred extends ApiErrorCollection {

    /**
     * Código da Situação da Solicitação de Crédito
     */
    inCodSituacaoSolicCred: number;

    /**
     * Descrição da Situação da Solicitação de Crédito
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}