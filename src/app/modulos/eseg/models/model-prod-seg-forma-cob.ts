import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Forma de Cobrança dos Produtos de Seguro disponíveis no sistema.
 */

export class ModelProdSegFormaCob extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProdSegFormaCob: number;


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
     * Código da Forma de Cobrança
     */
    chCodFormaCobranca: string;

    /**
     * Descrição Abreviada da Forma de Cobrança
     */
    chDesAbrevFormaCobranca: string;

    /**
     * Descrição da Forma de Cobrança
     */
    chDesFormaCobranca: string;

    /**
     * Data de Inicio de Vigência da Forma de Cobrança para o Produto de Seguro
     */
    daDatIniVig: Date;

    /**
     * Data de Fim de Vigência da Forma de Cobrança para o Produto de Seguro
     */
    daDatFimVig: Date;

    /**
     * Código do Portador da Cobrança para Forma de Pagamento do Produto de Seguro
     */
    inCodPortador: number;
    /**
     * Nome Abreviado do Portador de Cobrança
     */
    chNomAbrevPortador: string;

    /**
     * Nome do Portador da Cobrança
     */
    chNomPortador: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}