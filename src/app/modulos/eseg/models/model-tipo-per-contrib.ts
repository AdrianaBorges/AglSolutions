import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Periodicidade de Contribuição de Seguro
 */


export class ModelTipoPerContrib extends ApiErrorCollection {

    /**
     * Código do Tipo de Contribuição
     */
    inCodTipoPerContrib: number;

    /**
     * Descrição do Tipo de Contribuição
     */
    chDescricao: string;

    /**
     * Número de Meses a serem somados da última contribuição
     */
    inNumSomaMes: number;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}