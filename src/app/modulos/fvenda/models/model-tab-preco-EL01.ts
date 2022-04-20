/**
 * Manutenção de Tabelas de Preços disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento da Tabela de Preços.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE TABELA DE PREÇOS DO MÓDULO FVENDA.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelTabPrecoEL01 extends ApiErrorCollection {

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
    chDescricao: string;


    /**
     * Data Inicial da Validade da Tabela de Preço
     */
    dtDatValidIni: Date;


    /**
     * Data Final da Validade da Tabela de Preço
     */
    dtDatValidFim: Date;
    
    /**
     * Situação Cadastral da Tabela de Preços
     */
    inCodSituacaoCad: number;

    /**
     * Descrição da Situação Cadastral da Tabela de Preços
     */
    chDesSituacaoCad: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}