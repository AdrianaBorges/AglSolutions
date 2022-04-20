import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Tipos de Frete disponíveis no sistema.
 */


export class ModelTipoFrete extends ApiErrorCollection {

    /**
     * Código do Tipo de Frete
     */
     inCodTipoFrete: number;

    /**
     * Descrição do Tipo de Frete
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}