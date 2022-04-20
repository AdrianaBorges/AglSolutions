import { ApiErrorCollection } from "../../../api-error/api-error-collection"


/**
 * Manutenção de Soluções para a Assistência Técnica disponíveis no sistema.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 */
export class ModelSolucAssTec extends ApiErrorCollection{

    /**
     * Código da Solução para a Assistência Técnica
     */
    inCodSolucAssTec: number;
    
    /**
     * Descrição da Solução para a Assistência Técnica
     */
    chDescricao: string;
    
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}