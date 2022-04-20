import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Assistências de Seguro
 */


export class ModelAssistSeg extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDAssistSeg: number;

    /**
     * Identificador Único da Tabela Seguradora
     * Identifica a qual Seguradora a Assistência esta vinculada
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
     * Código da Assistência
     */
    chCodAssistSeg: string;
    /**
     * Descrição da Assistência
     */
    chDescricao: string;
    /**
     * Descrição da Assistência para ser exibida nas impressões de documentos
     */
    chDesExterna: string;
    /**
     * Descrição Detalhada da Assistência
     */
    chDesDetalhe: string;

    /**
     * Identificador Único da Tabela SorteioSeg
     * Identifica a qual Seguradora o Sorteio esta vinculado
     */
    IDSorteioSeg: number;

    /**
     * Código do Sorteio
     */
    chCodSorteioSeg: string;

    /**
     * Descrição do Sorteio
     */
    chDesSorteioSeg: string;

    /**
     * Descrição do Sorteio para ser exibida nas impressões de documentos
     */
    chDesExtSorteioSeg: string;

    /**
     * 	Valor do Prêmio do Sorteio
     */
    deValSorteio: number;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}