import { ApiErrorCollection } from '../../../api-error/api-error-collection';
//Finalidades das Notas Fiscais Eletrônicas (NFe)
export class ModelFinalidadeNfe extends ApiErrorCollection {
    // Código da Finalidade da NFe
    inCodFinalidadeNFe: number;
    //Descrição da Finalidade da NFe
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}