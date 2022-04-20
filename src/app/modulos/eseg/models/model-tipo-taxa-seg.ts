import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Taxa de Seguro
 */


export class ModelTipoTaxaSeg extends ApiErrorCollection {

    /**
     * Código do Tipo da Taxa
     */
    inCodTipoTaxaSeg: number;

    /**
     * Descrição do Tipo da Taxa
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}