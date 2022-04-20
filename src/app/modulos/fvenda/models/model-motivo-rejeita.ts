import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Motivos de Rejeição disponíveis no sistema.
 */


export class ModelMotivoRejeita extends ApiErrorCollection {

    /**
     * Código do Motivo de Rejeição
     */
    inCodMotivoRejeita: number;

    /**
     * Descrição do Motivo de Rejeição
     */
    chDescricao: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}