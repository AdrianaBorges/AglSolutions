import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Tipos de Opções de Menu
 */

export class ModelTipoMenuOpcao extends ApiErrorCollection {
    
        /**
         * Código do Tipo de Opção de Menu
         */
        inCodTipoMenuOpcao: number;
    
        /**
         * Descrição do Tipo de Opção de Menu
         */
        chDescricao: string;
    
        /**
      * Quantidade Total de Registros existentes na tabela.
      * Atributo será utilizado para calcular paginação dos Grids na interface
      */
        inRecordCount: number;
    
    } 