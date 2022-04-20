import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoLogradouro extends ApiErrorCollection {

    /**
     * Código do Tipo de Logradouro
     */
    inCodTipoLogradouro: number;

    /**
     * Descrição do Tipo de Logradouro
     */
    chDescricao: string;

    /**
     * Descrição Abreviada do Tipo de Logradouro
     */
    chDesAbreviado:string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}