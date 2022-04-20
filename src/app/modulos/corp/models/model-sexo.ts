import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelSexo extends ApiErrorCollection {

    /**
     * Código do Sexo
     */
    inCodSexo: number;

    /**
     * Descrição do Sexo
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}