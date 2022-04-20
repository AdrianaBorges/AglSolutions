import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Forma de Cobrança dos Produtos de Seguro disponíveis no sistema.
 */

export class ModelProdSegValor extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDProdSegValor: number;


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
     * Data de Inicio de Vigência do Valor para o Produto de Seguro
     */
    daDatIniVig: Date;

    /**
     * Data de Fim de Vigência do Valor para o Produto de Seguro
     */
    daDatFimVig: Date;

    /**
     * Valor do Capital Segurado para o Produto de Seguro
     */
    deValCapital: number;

    /**
     * Valor do Prêmio Bruto para o Produto de Seguro
     */
    deValPremioBruto: number;

    /**
     * Valor do Serviço que esta incluído no Prêmio Bruto do Produto de Seguro
     */
    deValServico: number;

    /**
     * Valor do IOF que esta incluído no Prêmio Bruto do Produto de Seguro
     */
    deValIOF: number;
    
    /**
     * Valor do Prêmio Liquido do Produto de Seguro (deValPremioLiquido = deValPremioBruto - deValServico - deValIOF)
     */
    deValPremioLiquido: number;

    

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}