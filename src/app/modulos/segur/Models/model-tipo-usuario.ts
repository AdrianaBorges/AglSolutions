import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Usuários 
 */
export class ModelTipoUsuario extends ApiErrorCollection {

    /**
     * Código do Tipo de Usuário
     */
    inCodTipoUsuario: number;

    /**
     * Descrição do tipo de usuário, exemplo: 'ADMINISTRADOR'
     */
    chDesTipoUsuario: string;
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}
