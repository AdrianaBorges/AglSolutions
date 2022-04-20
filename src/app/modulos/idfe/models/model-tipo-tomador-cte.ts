import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Tipos de Tomador do CTe 
 */
export class ModelTipoTomadorCte extends ApiErrorCollection {
    /**
     *  Código do Tipo de Tomador do CTe
     */
    inCodTipoTomadorCTe: number;
    /**
    * Descrição do Tipo de Tomador do CTe
     */

    chDescricao: string;
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}