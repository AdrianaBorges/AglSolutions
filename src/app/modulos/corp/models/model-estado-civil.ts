import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelEstadoCivil extends ApiErrorCollection {

    /**
     * Código do Tipo de Estado Civil
     */
    inCodEstadoCivil: number;

    /**
     * Descrição do Tipo de Estado Civil
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}