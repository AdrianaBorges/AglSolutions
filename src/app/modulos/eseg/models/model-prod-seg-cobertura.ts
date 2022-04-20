import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Coberturas dos Produtos de Seguro disponíveis no sistema.
 */

export class ModelProdSegCobertura extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProdSegCobertura: number;

    /**
     * Identificador Único da Tabela Seguradora
     * Identifica a qual Seguradora o Produto de Seguro pertence
     */
    IDSeguradora: number;

    /**
     * 	Identificador Único da Tabela de Pessoa
     */
    IDPessoaSeguradora: number;


    /**
     * 	Identificador Único da Tabela PapelPessoa 
     *  Identifica a qual Pessoa a Seguradora esta relacionada
     */
    IDPapelPessoaSeguradora: number;

    /**
     * Número de Identificação Lógica da Pessoa 
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJSeguradora: number;

    /**
     * Nome da Seguradora
     */
    chNomeSeguradora: string;

    /**
     * Identificador Único da Tabela ProdSeg
     * Identifica a qual Produto de Seguro a Cobertura esta vinculada
     */
    IDProdSeg: number;

    /**
     * Código do Produto de Seguro
     */
    chCodProdSeg: string;

    /**
     * Descrição do Produto de Seguro
     */
    chDesProdSeg: string;
    /**
     * Identificador Único da Tabela CoberturaSeg
     * Identifica a Cobertura Básica do Produto
     */
    IDCoberturaSeg: number;

    /**
     * Código da Cobertura
     */
    chCodCoberturaSeg: string;

    /**
     * Descrição da Cobertura de Seguro
     */
    chDesCoberturaSeg: string;

    /**
    * Descrição da Cobertura para ser exibida nas impressões de documentos
    */
    chDesExtCoberturaSeg: string;

    /**
     * Data de Inicio de Vigência da Cobertura para o Produto de Seguro
     */
    daDatIniVig: Date;

    /**
     * Data de Fim de Vigência da Cobertura para o Produto de Seguro
     */
    daDatFimVig: Date;

    /**
     * Valor da Cobertura para Produtos do Tipo INDIVIDUAL
     */
    deValCobertura: number;

    /**
     * Valor Mínimo da Cobertura para Produtos do Tipo COLETIVO
     */
    deValCoberturaMin: number;
 
    /**
     * Valor Máximo da Cobertura para Produtos do Tipo COLETIVO
     */
    deValCoberturaMax: number;

    /**
     * Valor de Limite da Cobertura no Produto de Adesões para um mesmo CPF
     */
    deValLimitePorCPF: number;

    /**
     * Número de Dias de Carência para Cobertura
     */
    inNumDiaCarencia: number;

    /**
     * Número de Dias de Carência para Cobertura
     */
    inNumDiaFranquia: number;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}