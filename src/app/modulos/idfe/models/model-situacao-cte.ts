import { ApiErrorCollection } from '../../../api-error/api-error-collection';
//Situações dos Conhecimentos de Transporte Eletrônico (CTe)
export class ModelSituacaoCte extends ApiErrorCollection {
    // Código do Modelo de DFe
    inCodSituacaoCTe: number;
    //	Descrição da Situação do CTe
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}