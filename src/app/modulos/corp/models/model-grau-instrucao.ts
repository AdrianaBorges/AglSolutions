import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelGrauInstrucao extends ApiErrorCollection {

    /**
     * Código do Grau de Instrução
     */
    inCodGrauInst: number;

    /**
     * Descrição do Grau de Instrução
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}