import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelTipoPessoaContato extends ApiErrorCollection {

    /**
     * Código do Tipo de Pessoa contato
     */
    inCodTipoPessoaContato: number;

    /**
     * Descrição do Tipo de Papel
     */
    chDescricao: string;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;

}