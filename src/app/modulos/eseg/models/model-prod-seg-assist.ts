import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção das Assistências dos Produtos de Seguro disponíveis no sistema
 */

export class ModelProdSegAssist extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProdSegAssist: number;

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
     * Identificador Único da Tabela AssistSeg
     * Identifica a Assistência a qual o Produto de Seguro esta vinculado
     */
    IDAssistSeg: number;

    /**
     * Código da Assistência
     */
    chCodAssistSeg: string;

    /**
     * Descrição da Assistência
     */
    chDesAssistSeg: string;

    /**
    * Descrição da Assistência para ser exibida nas impressões de documentos
    */
   chDesExtAssistSeg: string;

    /**
     * Data de Inicio de Vigência da Assistência para o Produto de Seguro
     */
    daDatIniVig: Date;

    /**
     * Data de Fim de Vigência da Assistência para o Produto de Seguro
     */
    daDatFimVig: Date;

    /**
     * Valor Limite da Assistência
     */
    deValLimite: number;
    /**
     * Número de Dias de Carência para Assistência
     */
    inNumDiaCarencia: number;

    /**
     * Número de Dias de Franquia para Assistência
     */
    inNumDiaFranquia: number;

    /**
     * Quantidade de Eventos para Assistência
     */
    inQtdEventos: number;

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
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}