import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoDocumento extends ApiErrorCollection {

    /**
     * Código do Tipo de Documento
     */
    inCodTipoDocumento: number;

    /**
     * Descrição do Tipo de Documento
     */
    chDesTipoDocumento: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}