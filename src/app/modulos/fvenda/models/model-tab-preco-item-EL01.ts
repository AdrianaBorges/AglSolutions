/**
 * Manutenção de Preços dos Itens das Tabelas de Preços disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do Preço do Item na Tabela de Preços.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE PREÇO DO ITEM NA TABELA DE PREÇOS DO MÓDULO FVENDA.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelTabPrecoItemEL01 extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDTabPrecoItem: number;

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDTabPreco: number

    /**
     * Código da Tabela de Preços
     */
    chCodTabPreco: string;

    /**
     * Descrição da Tabela de Preços
     */
    chDesTabPreco: string;

    /**
     * Data Inicial da Validade da Tabela de Preço
     */
     dtDatValidTabPrecoIni: Date;

    /**
     * Data Final da Validade da Tabela de Preço
     */
     dtDatValidTabPrecoFim: Date;

    /**
     * Identificador Único da Tabela Item
     */
    IDItem: number;

    /**
     * Código do Item
     */
    chCodItem: string;

    /**
     * Descrição do Item
     */
    chDesItem: string;

    /**
     * Código da Unidade de Medida do Item
     */
    chCodUM: string;

    /**
     * Data de Inicio de Validade do Preço do Item na Tabela de Preços
     */
    dtDatValidIni: Date;

    /**
     * Quantidade Mínima para o Preço do Item na Tabela de Preços
     */
    deQtdMinima: number;

    /**
     * Preço de Venda do Item na Tabela de Preços
     */
     dePrecoVenda: number;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
