import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Tipo de Técnico disponíveis no sistema.
 */


export class ModelTipoTecnico extends ApiErrorCollection {

    /**
     * Código da Tipo Técnico
     */
    inCodTipoTecnico: number;

    /**
     * Descrição da Tipo Técnico
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}