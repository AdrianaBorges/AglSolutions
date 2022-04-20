import { ApiErrorCollection } from '../../../api-error/api-error-collection';
//Tipos de Conhecimento de Transporte Eletrônico (CTe) 
export class ModelTipoCte extends ApiErrorCollection {
    /**
     *  Código do Tipo de CTe
     */
    inCodTipoCTe: number;
    /**
    * Descrição do Tipo de CTe 
     */

    chDescricao: string;
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}