/**
 * Manutenção de Grupo de Estoque do Item disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";


export class ModelGrpEst extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDGrpEst: number;

    /**
     * Código do Grupo de Estoque
     */
    chCodGrpEst: string;

    /**
     * Descrição do Grupo de Estoque
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}