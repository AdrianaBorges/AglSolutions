import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPessoaContaBanco extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela de PessoaContaBanco
     * (Gerado Automaticamente)
     */
    IDPessoaContaBanco: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;

    /**
     * Código do Banco da Pessoa
     */
    inCodBanco: number;

    /**
     * Nome do Banco da Pessoa
     */
    chNomeBanco: string;

    /**
     * Número da Agência Bancária
     */
    chAgencia: string;

    /**
     * Dígito Verificador da Agência Bancária
     */
    chDVAgencia: string;

    /**
     * Conta Bancária
     */
    chConta: string;

    /**
     * Dígito Verificador da Conta Bancária
     */
    chDVConta: string;

    /**
     * Código do Tipo de Conta Bancária
     */
    inCodTipoContaBanco: number;

    /**
     * Descrição do Tipo de Conta Bancária
     */
    chDesTipoContaBanco: string;

    /**
     * Nome do Titular da Conta Bancária
     */
    chNomeTitular: string;

    /**
     * Código do Tipo de Documento de Identificação do Titular da Conta
     */
    inCodTipoDocumento: number;

    /**
     * Descrição do Tipo de Documento de Identificação do Titular da Conta
     */
    chDesTipoDocumento: string;

    /**
     * Número do Documento de Identificação do Titular da Conta
     */
    inNumIdentificacaoTitular: string;

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