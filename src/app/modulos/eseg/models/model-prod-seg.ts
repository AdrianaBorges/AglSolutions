import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Produtos de Seguro disponíveis no sistema.
 */

export class ModelProdSeg extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProdSeg: number;

    /**
     * Identificador Único da Tabela Seguradora
     * Identifica a qual Seguradora o Produto de Seguro pertence
     */
    IDSeguradora: number;

    /**
     * Nome da Seguradora
     */
    chNomeSeguradora: string;

    /**
     * Código do Produto de Seguro
     */
    chCodProdSeg: string;

    /**
     * Identificador Único da Tabela RamoSeguro
     * Identifica a qual Ramo o Produto de Seguro esta vinculado
     */
    IDRamoSeguro: number;

    /**
     * Código do Grupo de Seguro
     */
    inCodGrupoSeguro: number;

    /**
     * Descrição do Grupo de Seguro
     */
    chDesGrupoSeguro: string;

    /**
     * Código do Ramo de Seguro
     */
    inCodRamoSeguro: number;

    /**
     * Descrição do Ramos de Seguro
     */
    chDesRamoSeguro: string;

    /**
     * Código do Tipo de Seguro
     */
    inCodTipoSeguro: number;

    /**
     * Descrição do Tipo de Seguro
     */
    chDesTipoSeguro: string;

    /**
     * Código do Tipo de Cobrança do Seguro
     */
    inCodTipoCobrancaSeg: number;

    /**
     * Descrição do Tipo de Cobrança do Seguro
     */
    chDesTipoCobrancaSeg: string;

    /**
     * Descrição do Produto de Seguro
     */
    chDescricao: string;

    /**
     * Data de Inicio da Venda do Produto
     */
    daDatIniVenda: Date;

    /**
     * Data de Fim da Venda do Produto
     */
    daDatFimVenda: Date;

    /**
     * Código do Tipo de Periodicidade de Contribuição do Produto
     */
    inCodTipoPerContrib: number;

    /**
     * Descrição do Tipo de Periodicidade de Contribuição do Produto
     */
    chDesTipoPerContrib: string;

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
     * 	Código da Sequência para Geração do Número da Proposta de Seguro
     */
    chCodSeqPropSeg: string;

    /**
     * Prefixo para Geração do Número da Proposta de Seguro 
     */
    inPrefNumPropSeg: number;

    /**
     * 	Número de Dígitos para sequência, caso haja Prefixo, na Geração do Número da Proposta de Seguro
     */
    inNumDigSeqPropSeg: number;

    /**
     * Descrição Detalhada do Produto
     */
    chDesDetalhe: string;

    /**
     * 	Código do Produto de Seguro no Sistema Externo
     */
    chCodProdExt: string;

    /**
     * Número do Registro do Produto na Susep
     */
    chNumSusep: string;

    /**
     * Idade mínima do Segurado para Compra/Adesão ao Produto
     */
    inNumIdadeMin: number;

    /**
     * Idade máxima do Segurado para Compra/Adesão ao Produto
     */
    inNumIdadeMax: number;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}