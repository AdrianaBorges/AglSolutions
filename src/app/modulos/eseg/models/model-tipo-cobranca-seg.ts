import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Cobrança do Seguro
 */


export class ModelTipoCobrancaSeg extends ApiErrorCollection {

    /**
     * Código do Tipo de Cobrança do Seguro
     */
    inCodTipoCobrancaSeg: number;

    /**
     * Descrição do Tipo de Cobrança de Seguro
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}