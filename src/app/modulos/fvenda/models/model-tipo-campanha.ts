/**
 * Manutenção de Grupo de Estoque do Item disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";


export class ModelTipoCampanha extends ApiErrorCollection {

    /**
     * Código do Tipo de Campanha
     */
    inCodTipoCampanha: number;

    /**
     * Descrição do Tipo de Campanha
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}