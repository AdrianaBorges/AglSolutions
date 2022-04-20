import { ApiErrorCollection } from "../../../api-error/api-error-collection";

/**
 * Manutenção de Defeitos de Assistência Técnica disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do Defeito.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO DEFEITO DO MÓDULO FVENDA.
 */
export class ModelDefeitoEL01 extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDDefeito: number;
    
    /**
     * Código do Defeito
     */
    chCodDefeito: string;
    
    /**
     * Tipo de Defeito
     */
    inCodTipoDefeito: number;
    
    /**
     * Descrição do Tipo de Defeito
     */
    chDesTipoDefeito: string;
    
    /**
     * Descrição do Defeito
     */
    chDescricao: string;
    
    /**
     * Situação Cadastral do Defeito
     */
    inCodSituacaoCad: number;
    
    /**
     * Descrição da Situação Cadastral do Defeito
     */
    chDesSituacaoCad: string;
    
    /**
     * Resumo do Problema
     */
    chDesProblema: string;
    
    /**
     * Resumo da Possível Solução
     */
    chDesSolucao: string;
    
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}