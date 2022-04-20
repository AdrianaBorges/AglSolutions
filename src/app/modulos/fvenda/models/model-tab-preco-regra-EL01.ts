/**
 * Manutenção de Regras para utilização de Tabelas de Preços disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento de Regra para utilização de Tabela de Preços.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE REGRA DE UTILIZAÇÃO DE TABELA DE PREÇOS DO MÓDULO FVENDA.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelTabPrecoRegraEL01 extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDTabPrecoRegra: number;

    /**
     * Identificador Único da Tabela Pais
     */
    IDPais: number

    /**
     * Código do Pais
     */
    chCodPais: string;

    /**
     * Nome Abreviado do Pais
     */
    chNomeAbrevPais: string;


    /**
     * Nome Completo do Pais
     */
    chNomePais: string;


    /**
     * Identificador Único da Tabela UF
     */
    IDUF: number;

    /**
     * Sigla da Unidade Federativa
     */
    chSiglaUF: string;

    /**
     * Nome da Unidade Federativa
     */
    chNomeUF: string;

    /**
     * Identificador Único da Tabela Cidade
     */
    IDCidade: number;

    /**
     * Nome da Cidade
     */
    chNomeCidade: string;

    /**
     * Código da Região do Cliente
     */
    chCodRegiao: string;

    /**
     * Descrição da Região
     */
    chDesRegiao: string;

    /**
     * Identificador Único da Tabela Microrregiao
     */
    IDMicrorregiao: number;

    /**
     * Código da Microrregião
     */
    chCodMicrorregiao: string;

    /**
     * Descrição da Microrregiao
     */
    chDesMicrorregiao: string;

    /**
     * Código do Grupo do Cliente
     */
    chCodGrupoCliente: string;

    /**
     * Descrição do Grupo de Cliente
     */
    chDesGrupoCliente: string;

    /**
     * Código do Canal de Venda do Cliente
     */
    chCodCanalVenda: string;

    /**
     * Descrição do Canal de Venda
     */
     chDesCanalVenda: string;

    /**
     * Identificador Único da Tabela ClienteVenda no papel de Cliente Matriz
     */
    IDClienteVendaPai: number;


    /**
     * Código do Cliente Pai
     */
    inCodClientePai: number;

    /**
     * Nome do Cliente Matriz
     */
    chNomeClientePai: string;

    /**
     * Identificador Único da Tabela ClienteVenda
     */
    IDClienteVenda: number;

    /**
     * Código do Cliente
     */
    inCodCliente: number;

    /**
     * Nome do Cliente
     */
    chNomeCliente: string;

    /**
     * Data Inicial da Validade da Regra
     */
    dtDatValidIni: Date;

    /**
     * Data Final da Validade da Regra
     */
    dtDatValidFim: Date;

    /**
     * Identificador Único da Tabela TabPreco
     */
    IDTabPreco: number;

    /**
     * Código da Tabela de Preços
     */
    chCodTabPreco: string;

    /**
     * Descrição da Tabela de Preços
     */
    chDesTabPreco: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
