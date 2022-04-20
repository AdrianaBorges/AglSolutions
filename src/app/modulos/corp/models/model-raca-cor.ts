import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/** Raça/Cor da pessoa  */
export class ModelRacaCor extends ApiErrorCollection {

    /**
     * Código da Raça ou Cor
     */
    inCodRacaCor: number;

    /**
     * Descrição da Raça ou Cor
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}