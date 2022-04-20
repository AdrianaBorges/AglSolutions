import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Parâmetros  Corporativo
 */

export class ModelParamCorp extends ApiErrorCollection {

    /**
     * Código Único do Parâmetro
     */
    chCodParamCorp: string;

    /**
     * Descrição do Parâmetro
     */
    chDescricao: string;

    /**
     * Descrição detalhada do Parâmetro
     */
    chDesObservacao: string;

    /**
     * Valor do Parâmetro
     */
    chValor: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;

}