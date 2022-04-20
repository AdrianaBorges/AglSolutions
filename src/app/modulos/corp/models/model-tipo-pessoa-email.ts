import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoPessoaEmail extends ApiErrorCollection {

    /**
     * Código do Tipo Pessoa Email
     */
    inCodTipoPessoaEmail: number;

    /**
     * Descrição do Tipo Pessoa Email
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}