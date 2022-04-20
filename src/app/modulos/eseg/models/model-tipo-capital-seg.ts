import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Capital de Seguro
 */

 
export class ModelTipoCapitalSeg extends ApiErrorCollection {
    
        /**
         * Código do Tipo de Capital
         */
        inCodTipoCapitalSeg: number;
    
        /**
         * Descrição do Tipo de Capital
         */
        chDescricao: string;
    
        /**
           * Quantidade Total de Registros existentes na tabela.
           * Atributo será utilizado para calcular paginação dos Grids na interface
           */
        inRecordCount: number;
    }