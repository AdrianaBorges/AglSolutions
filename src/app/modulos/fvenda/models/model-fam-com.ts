/**
 * Manutenção de Família Comercial do Item disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */

import { ApiErrorCollection } from "../../../api-error/api-error-collection";


export class ModelFamCom extends ApiErrorCollection {
  
    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDFamCom: number;

    /**
     * Código da Família Comercial
     */
    chCodFamCom: string;

    /**
     * Descrição da Família Comercial
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}