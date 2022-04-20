/**
 * Manutenção de Técnicos de Assistência Técnica disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do Técnico.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE TÉCNICO DO MÓDULO FVENDA.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelTecnicoEL01 extends ApiErrorCollection {
   
    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDTecnico: number

    /**
     * Código do Técnico
     */
    inCodTecnico: number;

    /**
     * Nome Abreviado do Técnico
     */
    chNomAbreviado: string;


    /**
     * Identificador Único da Tabela de PapelPessoa, que identifica a Pessoa no Papel de Técnico
     */
    IDPapelPessoaTecnico: number;


    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoaTecnico: number;

    /**
     * Código do Tipo de Pessoa como Técnico
     */
    inCodTipoPessoaTecnico: number;

    /**
     * Descrição do Tipo de Pessoa como Técnico
     */
    chDesTipoPessoaTecnico: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa como Tecnico
     */
    inCodTipoDocumentoTecnico: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa como Tecnico
     */
    chDesTipoDocumentoTecnico: string;

    /**
     * Documento de Identificação da Pessoa como Tecnico
     */
    inNumIdentifTecnico: number;

    /**
     * Nome do Técnico
     */
    chNomeTecnico: string;

    /**
     * Código do Tipo do Técnico
     */
    inCodTipoTecnico: number;


    /**
     * Descrição do Tipo de Técnico
     */
    chDesTipoTecnico: string;

    /**
     * Situação Cadastral do Técnico
     */
    inCodSituacaoCad: number;

    /**
     * Descrição da Situação Cadastral do Técnico
     */
    chDesSituacaoCad: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}