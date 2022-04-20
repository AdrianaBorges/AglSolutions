import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Unidades Federativas disponíveis no sistema.
 */
export class ModelUF extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela UF  (Gerado Automaticamente)
     */
    IDUF: number;
    /**
     * Identificador Único da Tabela Pais
     * Identifica a qual Pais a Unidade Federativa esta vinculada
     */
    IDPais: number;
    /**
     * Sigla da Unidade Federativa
     */
    chSigla: string;
    /**
     * Nome da Unidade Federativa
     */
    chNome: string;
    /**
     * Código do Unidade Federativa no IBGE
     */
    chCodIBGE: string;
    /**
     * Código do Pais
     */
    chCodPais: string;
    /**
     * Nome Abreviado do Pais
     */
    chNomeAbreviadoPais: string;
    /**
     * Nome Completo do Pais
     */
    chNomePais: string;
    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}