import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Assistências de Seguro
 */


export class ModelCoberturaSeg extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDCoberturaSeg: number;

    /**
     * Identificador Único da Tabela Seguradora
     * Identifica a qual Seguradora a Assistência esta vinculada
     */
    IDSeguradora: number;
    /**
     * Código da Cobertura
     */
    chCodCoberturaSeg: string;
    /**
     * Descrição da Cobertura
     */
    chDescricao: string;
    /**
     * Descrição da Cobertura para ser exibida nas impressões de documentos
     */
    chDesExterna: string;
    /**
     * Descrição Detalhada da Cobertura
     */
    chDesDetalhe: string;
    /**
     * Valor de Limite de Adesões para um mesmo CPF da Cobertura
     */
    deValLimitePorCPF: number;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}