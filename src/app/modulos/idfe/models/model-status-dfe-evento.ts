import { ApiErrorCollection } from '../../../api-error/api-error-collection';
// Status de Resposta de Eventos dos Documentos Fiscais Eletrônicos (DFe) 
export class ModelStatusDfeEvento extends ApiErrorCollection {
    // Código do Status de Resposta do Evento de DFe
    inCodStatusDFeEvento: number;
    //Descrição do Status de Resposta do Evento de DFe
    chDescricao: string;
    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}