import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Cidades disponíveis no sistema.
 */
export class ModelSequencia extends ApiErrorCollection {

    /**
     * Código da Sequência
     */
    chCodSequencia: string;
    /**
     * Descrição da Sequência
     */
    chDescricao: string;
    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}