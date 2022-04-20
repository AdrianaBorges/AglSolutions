import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Grupo de Cliente disponíveis no sistema.
 */
export class ModelRegiao extends ApiErrorCollection {

    /**
     * Código da Região
     */
    chCodRegiao: string;

    /**
     * Descrição da Região
     */
    chDescricao: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}