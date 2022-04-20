import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/** Tipo de Conta Bancária  */
export class ModelTipoContaBanco extends ApiErrorCollection {

    /**
    *  Código do Tipo de Conta Bancária
    */
    inCodTipoContaBanco: number;

    /**
     * Descrição do Tipo de Conta Bancária
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}