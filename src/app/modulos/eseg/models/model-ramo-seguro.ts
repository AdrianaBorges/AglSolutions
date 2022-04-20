import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Ramos de Seguro
 */


export class ModelRamoSeguro extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDRamoSeguro: number;

    /**
     * Código do Grupo de Seguro
     */
    inCodGrupoSeguro: number;

    /**
     * Código do Ramos de Seguro
     */
    inCodRamoSeguro: number;


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