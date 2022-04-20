import { ApiErrorCollection } from "../../../api-error/api-error-collection";

/**
 * Manutenção de Espécies de Item disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelEspecieItem extends ApiErrorCollection {
    /**
     * Código da Espécie do Item
     */
    inCodEspecieItem: number;
    
    /**
     * Descrição da Espécie do Item
     */
    chDescricao: string;
    
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
    
}