import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoPessoa extends ApiErrorCollection {

    /**
     * Código do Tipo de Pessoa
     */
    inCodTipoPessoa: number;

    /**
     * Descrição do Tipo de Pessoa
     */
    chDesTipoPessoa: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}