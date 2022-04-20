import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Forma de Cobrança dos Produtos de Seguro disponíveis no sistema.
 */

export class ModelProdSegCondPagto extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProdSegCondPagto: number;


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
     * Código da Condição de Pagamento para o Produto de Seguro
     */
    chCodCondPagto: string;

    /**
     * Descrição da Condição de Pagamento
     */
    chDesCondPagto: string;

    /**
     * Data de Inicio de Vigência da Condição de Pagamento para o Produto de Seguro
     */
    daDatIniVig: Date;

    /**
     * Data de Fim de Vigência da Condição de Pagamento para o Produto de Seguro
     */
    daDatFimVig: Date;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}