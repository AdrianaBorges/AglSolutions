import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Seguradoras 
 */


export class ModelSeguradora extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDSeguradora: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoaSeguradora: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Pessoa a Seguradora esta relacionada
     */
    IDPapelPessoaSeguradora: number;


    /**
     * Número de Identificação Lógica da Pessoa
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJSeguradora: number;
    /**
     * Nome da Pessoa
     */
    chNomeSeguradora: string;

 /**
     * Nome Abreviado
     */
    chNomeAbreviado: string;


    /**
     * Número do Registro na Susep
     */
    chNumSusep: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}