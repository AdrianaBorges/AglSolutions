import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Grupos de Seguro
 */


export class ModelGrupoSeguro extends ApiErrorCollection {

    /**
     * Código do Grupo de Seguro
     */
    inCodGrupoSeguro: number;

    /**
     * Descrição do Grupo de Seguro
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}