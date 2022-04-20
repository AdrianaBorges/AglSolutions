import { ApiErrorCollection } from '../../../api-error/api-error-collection';
//Status de Confirmação da Nota Fiscal Eletrônica (NFe) pelo Destinatário
export class ModelStatusConfNfe extends ApiErrorCollection {
    // Código do Status de Confirmação da NFe
    inCodStatusConfNFe: number;
    //Descrição do Status de Confirmação da NFe
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