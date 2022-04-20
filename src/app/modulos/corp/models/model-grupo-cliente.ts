import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Grupo de Cliente disponíveis no sistema.
 */
export class ModelGrupoCliente extends ApiErrorCollection {

    /**
     * Código do Grupo de Cliente
     */
    chCodGrupoCliente: string;

    /**
     * Descrição do Grupo de Cliente
     */
    chDescricao: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}