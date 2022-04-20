import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Canal de Venda disponíveis no sistema.
 */
export class ModelTipoRepresentante extends ApiErrorCollection {

    /**
     * Código do Tipo de Representante
     */
    inCodTipoRepresentante: number;

    /**
     * Descrição do Tipo de Representante
     */
    chDescricao: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}