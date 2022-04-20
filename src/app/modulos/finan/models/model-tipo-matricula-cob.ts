import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/** Tipo Matricula Cobrança  */
export class ModelTipoMatriculaCob extends ApiErrorCollection {
    /**
    *  Código do Tipo de Matricula de Cobrança
    */
    inCodTipoMatriculaCob: number;

    /**
     * Descrição do Tipo de Matricula de Cobrança
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}