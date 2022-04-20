import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelSituacaoCad extends ApiErrorCollection {

    /**
     * Código do Situacao Cadastro
     */
    inCodSituacaoCad: number;

    /**
     * Descrição do Situacao Cadastro
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}