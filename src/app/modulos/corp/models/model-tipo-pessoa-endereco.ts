import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoPessoaEndereco extends ApiErrorCollection {

    /**
     * Código do Tipo Pessoa Endereco
     */
    inCodTipoPessoaEndereco: number;

    /**
     * Descrição do Tipo Pessoa Endereco
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}