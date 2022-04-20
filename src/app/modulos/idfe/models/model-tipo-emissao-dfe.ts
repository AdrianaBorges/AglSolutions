import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Tipos de Emissão de Documentos Fiscais Eletrônicos (DFe)
 */
export class ModelTipoEmissaoDfe extends ApiErrorCollection {
    /**
     *  Código do Tipo de Emissão de DFe
     */
    inCodTipoEmissaoDFe: number;
    /**
    * Descrição do Tipo de Emissão de DFe
     */

    chDescricao: string;
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}