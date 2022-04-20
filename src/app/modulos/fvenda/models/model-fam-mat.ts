/**
 * Manutenção de Família de Materiais do Item disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";


export class ModelFamMat extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDFamMat: number;

    /**
     * Código da Família de Materiais
     */
    chCodFamMat: string;

    /**
     * Descrição da Família de Materiais
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}