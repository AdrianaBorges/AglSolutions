import { ApiErrorCollection } from '../../../api-error/api-error-collection';
/**
 * Manutenção de Grupo de Cliente disponíveis no sistema.
 */
export class ModelMicrorregiao extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDMicrorregiao: number
    /**
     * Código da Região
     */
    chCodRegiao: string;


    /**
     * Descrição da Região
     */
    chDesRegiao: string;

    /**
     *  Código da Microrregião
     */
    chCodMicrorregiao: string;

    /**
     * Descrição da Microrregiao
     */
    chDescricao: string;

    /**
    * Quantidade Total de Registros existentes na tabela.
    * Atributo será utilizado para calcular paginação dos Grids na interface
    */
    inRecordCount: number;
}