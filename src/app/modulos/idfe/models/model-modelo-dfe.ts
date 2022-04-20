import { ApiErrorCollection } from '../../../api-error/api-error-collection';
//Modelos de Documentos Fiscais Eletrônicos (DFe) 
export class ModelModeloDfe extends ApiErrorCollection {
    // Código do Modelo de DFe
    inCodModeloDFe: number;
    //Descrição do Modelo de DFe
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}