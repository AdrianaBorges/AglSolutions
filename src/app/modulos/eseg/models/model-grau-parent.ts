import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Graus de Parentesco
 */

 
export class ModelGrauParent extends ApiErrorCollection {
    
        /**
         * Código do Grau de Parentesco
         */
        inCodGrauParent: number;
    
        /**
         * Descrição do Grau de Parentesco
         */
        chDescricao: string;
    
        /**
           * Quantidade Total de Registros existentes na tabela.
           * Atributo será utilizado para calcular paginação dos Grids na interface
           */
        inRecordCount: number;
    }