import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPessoaEmail extends ApiErrorCollection {
    /**
     * Identificador Único da Tabela de PessoaEmail
     * (Gerado Automaticamente)
     */
    IDPessoaEmail: number;
    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;
    /**
     * Código do Tipo de E-Mail da Pessoa
     */
    inCodTipoPessoaEmail: number;

    /**
     * Descrição do Tipo de E-Mail da Pessoa
     */
    chDesTipoPessoaEmail: string;

    /**
     * Endereço de E-Mail
     */
    chEmail: string;
    /**
     * Data/Hora de Inclusão do Registro
     */
    dtDatInclusao: Date;
    /**
     * Data/Hora da Última Alteração no Registro
     */
    dtDatUltAlteracao: Date;

    /**
 * Quantidade Total de Registros existentes na tabela.
 * Atributo será utilizado para calcular paginação dos Grids na interface
 */
    inRecordCount: number;
}