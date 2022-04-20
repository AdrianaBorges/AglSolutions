import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Paises disponíveis no sistema.
 */
export class ModelPais extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDPais: number;
    /**
     * Código do Pais
     */
    chCodPais: string;
    /**
     * Nome Abreviado do Pais
     */
    chNomeAbreviado: string;
    /**
     * Nome Completo do Pais
     */
    chNome: string;
    /**
     * Código do Pais no Siscomex
     */
    chCodSiscomex: string;
    /**
     * Código do Pais no IBGE
     */
    chCodIBGE: string;
    /**
     * Nacionalidade do Cidadão deste Pais
     */
    chDesNacionalidade: string;
    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}