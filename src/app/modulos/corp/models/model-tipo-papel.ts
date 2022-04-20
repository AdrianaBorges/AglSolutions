import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoPapel extends ApiErrorCollection {

    /**
     * Código do Tipo de Papel
     */
    inCodTipoPapel: number;

    /**
     * Descrição do Tipo de Papel
     */
    chDesTipoPapel: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}