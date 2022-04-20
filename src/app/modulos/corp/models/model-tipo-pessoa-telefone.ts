import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoPessoaTelefone extends ApiErrorCollection {

    /**
     * Código do Tipo Pessoa Telefone
     */
    inCodTipoPessoaTelefone: number;

    /**
     * Descrição do Tipo Pessoa Telefone
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}