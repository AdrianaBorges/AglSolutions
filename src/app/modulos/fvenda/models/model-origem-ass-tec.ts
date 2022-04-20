import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Origem Assistência Técnica disponíveis no sistema.
 */


export class ModelOrigemAssTec extends ApiErrorCollection {

    /**
     * Código da Origem Assistência Técnica
     */
    inCodOrigemAssTec: number;

    /**
     * Descrição da Origem Assistência Técnica
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}