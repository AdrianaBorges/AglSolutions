import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Tipos de Eventos dos Documentos Fiscais Eletrônicos (DFe)
 */
export class ModelTipoEventoDfe extends ApiErrorCollection {
    /**
     *  Código do Tipo de Evento de DFe
     */
    inCodTipoEventoDFe: number;
    /**
    * Descrição do Tipo de Evento de DFe
     */

    chDescricao: string;
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}