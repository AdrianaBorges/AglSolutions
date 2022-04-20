import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/** Tipo de Cobrança  */
export class ModelTipoCobranca extends ApiErrorCollection {

    /**
     * Código do Tipo de Cobrança
     */
    inCodTipoCobranca: number;

    /**
     * Descrição do Tipo de Cobrança
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}