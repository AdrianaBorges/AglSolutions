/**
 * Manutenção de Tipos de Assistência Técnica disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento do Tipo de Assistência Técnica.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DO TIPO DE ASSISTÊNCIA TÉCNICA DO MÓDULO FVENDA.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";

export class ModelTipoAssTecEL01 extends ApiErrorCollection  {
    /**
     *Código do Tipo de Assistência Técnica
     */
    inCodTipoAssTec: number

    /**
     * Descrição do Tipo de Assistência Técnica
     */
    chDescricao: string;

    /**
     * Situação Cadastral do Tipo de Assistência Técnica
     */
    inCodSituacaoCad: number;


    /**
     * Descrição da Situação Cadastral do Tipo de Assistência Técnica
     */
    chDesSituacaoCad: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}