import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Cidades disponíveis no sistema.
 */
export class ModelCidade extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDCidade: number;
    /**
     * Identificador Único da Tabela UF
     * Identifica a qual Unidade Federativa a Cidade esta vinculada
     */
    IDUF: number;
    /**
     * Nome da Cidade
     */
    chNome: string;
    /**
     * Nome Abreviado da Cidade
     */
    chNomeAbreviado: string;
    /**
     * CEP da Cidade (em caso de Único)
     */
    chCEPUnico: string;
    /**
     * Código da Cidade no IBGE
     */
    chCodIBGE: string;
    /**
     * Identificar Único da Tabela Pais
     */
    IDPais: number;
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
     * Sigla da Unidade Federativa
     */
    chSiglaUF: string;
    /**
     * Nome da Unidade Federativa
     */
    chNomeUF: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}