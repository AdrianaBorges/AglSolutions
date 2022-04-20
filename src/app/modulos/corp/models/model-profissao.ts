import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelProfissao extends ApiErrorCollection {

    /**
     * Código da Profissão
     */
    inCodProfissao: number;

    /**
     * Descrição da Profissão
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}