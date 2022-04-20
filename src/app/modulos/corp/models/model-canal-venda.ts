import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Canal de Venda disponíveis no sistema.
 */
export class ModelCanalVenda extends ApiErrorCollection {

    /**
     * Código do Canal de Venda
     */
    chCodCanalVenda: string;

    /**
     * Descrição do Canal de Venda
     */
    chDescricao: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}