import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Condições de Pagamento de Venda disponíveis no sistema.
 */


export class ModelCondPagtoVenda extends ApiErrorCollection {

    /**
     * Código da Condição de Pagamento de Venda
     */
    chCodCondPagtoVenda: string;

    /**
     * Descrição da Condição de Pagamento
     */
    chDescricao: string;

    /**
     * Condição de Pagamento (Lista de Dias para Vencimento, separados por "/") Ex.: 05/35/65
     */
    chCondicao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}