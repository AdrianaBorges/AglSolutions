import { ApiErrorCollection } from '../../../api-error/api-error-collection';

export class ModelPessoaDocumento extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela de PessoaDocumento
     * (Gerado Automaticamente)
     */
    IDPessoaDocumento: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoa: number;

    /**
     * Código do Tipo de Documento da Pessoa
     */
    inCodTipoDocumento: number;

    /**
     * Descrição do Tipo de Documento da Pessoa
     */
    chDesTipoDocumento: string;

    /**
     * Numero do Documento de Identificação
     */
    chNumero: string;

    /**
     * Descrição do Órgão Expedidor do Documento de Identificação
     */
    chDesOrgaoExpedidor: string;

    /**
     * Data de Expedição do Documento de Identificação
     */
    daDatExpedicao: Date;

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