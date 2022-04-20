import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Seguro
 */


export class ModelTipoSeguro extends ApiErrorCollection {

    /**
     * Código do Tipo de Seguro
     */
    inCodTipoSeguro: number;

    /**
     * Descrição do Tipo de Seguro
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}