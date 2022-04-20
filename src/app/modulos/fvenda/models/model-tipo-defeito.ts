import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Tipos de Defeito disponíveis no sistema.
 */
export class ModelTipoDefeito extends ApiErrorCollection {
    /**
      * Código do Tipo de Defeito
     */
    inCodTipoDefeito: number;

    /**
      * Código do Tipo de Defeito
     */
    chDescricao: string;

    /**
      * Quantidade Total de Registros existentes na tabela.
      * Atributo será utilizado para calcular paginação dos Grids na interface
      */
    inRecordCount: number;
}