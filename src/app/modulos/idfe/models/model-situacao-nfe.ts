import { ApiErrorCollection } from '../../../api-error/api-error-collection';
//Situações das Notas Fiscais Eletrônicas (NFe)
export class ModelSituacaoNfe extends ApiErrorCollection {
    // Código da Situação da NFe
    inCodSituacaoNFe: number;
    //Descrição da Situação da NFe
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

    /**
     * Campo calculado no momento de listar os dados
     */
    public campoCalculado: string;
}
