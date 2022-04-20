import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPapelPessoa extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDPapelPessoa: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;

    /**
     * Código do Tipo de Pessoa
     */
    inCodTipoPessoa: number;

    /**
     * Descrição do Tipo de Pessoa
     */
    chDesTipoPessoa: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa
     */
    inCodTipoDocumento: number;

    /**
     * 	Descrição do Tipo de Documento
     */
    chDesTipoDocumento: string;

    /**
     * Documento de Identificação da Pessoa
     */
    inNumIdentificacao: number;

    /**
     * Nome da Pessoa
     */
    chNomePessoa: string;

    /**
     * Código do Tipo de Papel da Pessoa
     */
    inCodTipoPapel: number;

    /**
     * Descrição do Tipo de Papel da Pessoa
     */
    chDesTipoPapel: string;
    /**
 * Quantidade Total de Registros existentes na tabela.
 * Atributo será utilizado para calcular paginação dos Grids na interface
 */
    inRecordCount: number;
}