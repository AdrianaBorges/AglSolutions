import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Situação Assistência Técnica disponíveis no sistema.
 */


export class ModelSituacaoAssTec extends ApiErrorCollection {

    /**
     * Código da Situação Assistência Técnica
     */
    inCodSituacaoAssTec: number;

    /**
     * Descrição da Situação Assistência Técnica
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}