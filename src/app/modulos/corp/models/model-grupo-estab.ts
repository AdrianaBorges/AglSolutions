import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelGrupoEstab extends ApiErrorCollection {

    /**
     * Código do Grupo de Estabelecimento
     */
    inCodGrupoEstab: number;

    /**
     * Descrição do Grupo de Estabelecimento
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}