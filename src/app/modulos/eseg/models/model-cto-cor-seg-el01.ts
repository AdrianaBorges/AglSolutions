import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Assistências de Seguro
 */


export class ModelCtoCorSegEL01 extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDCtoCorSeg: number;

    /**
     * Número do Contrato de Corretagem de Seguro
     */
    chNumCtoCorSeg: string;

    /**
     * Nome Abreviado do Contrato de Corretagem
     */
    chNomeAbreviado: string;

    /**
     * Código do Papel da Pessoa para ser relacionado com o Contrato de Corretagem de Seguro
     */
    inCodTipoPapel: number;

    /**
     * Descrição do Tipo de Papel da Pessoa relacionada com o Contrato de Corretagem de Seguro
     */
    chDesTipoPapel: string;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Pessoa o Contrato de Corretagem de Seguro esta Relacionado
     */
    IDPapelPessoa: number;

    /**
     * Identificador Único da Tabela de Pessoa
s     */
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
     * Descrição do Tipo de Documento de Identificação da Pessoa
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
   * Data de Inicio de Vigência do Contrato
   */
    daDatIniVig: Date;

    /**
     * Data de Fim de Vigência do Contrato
     */
    daDatFimVig: Date;

    /**
     * Número do Registro na Susep
     */
    chNumSusep: string;

    /**
     * Data de Registro da Pessoa na Susep
     */
    daDatRegSusep: Date;

    /**
     * Data de Expiração do Registro da Pessoa na Susep
     */
    daDatExpSusep: Date;

    /**
     * Situação Cadastral do Contrato de Corretagem
     */
    inCodSituacaoCad: number;

    /**
     * Descrição da Situação Cadastral do Contrato de Corretagem de Seguro
     */
    chDesSituacaoCad: string;

    /**
     * Identificador Único da Tabela CtoCorSeg
     * Identifica a qual Corretor o Contrato de Corretagem de Seguro esta vinculado
     */
    IDCtoCorSegCorretor: number;

    /**
     * Número do Contrato de Corretagem de Seguro de Corretor
     */
    chNumCtoCorSegCorretor: string;

    /**
     * Identificador Único da Tabela de Pessoa
     * Identifica a qual Pessoa, no papel de Corretor, o Contrato vinculado.
     */
    IDPessoaCorretor: number;

    /**
     * Código do Tipo de Pessoa no Papel de Corretor
     */
    inCodTipoPessoaCorretor: number;

    /**
     * Descrição do Tipo de Pessoa no Papel de Corretor
     */
    chDesTipoPessoaCorretor: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa no Papel de Corretor
     */
    inCodTipoDocumentoCorretor: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa no Papel de Corretor
     */
    chDesTipoDocumentoCorretor: string;

    /**
     * Documento de Identificação da Pessoa no Papel de Corretor
     */
    inNumIdentifCorretor: number;

    /**
     * Nome da Pessoa no Papel de Corretor
     */
    chNomeCorretor: string;

    /**
     * Identificador Único da Tabela CtoCorSeg
     * Identifica qual é o Vinculo Superior do Contrato de Corretagem de Seguro
     */
    IDCtoCorSegPai: number;

    /**
     * Número do Contrato de Corretagem de Seguro ao qual o Contrato esta Vinculada em nível Superior
     */
    chNumCtoCorSegPai: string;

    /**
     * Identificador Único da Tabela de Pessoa
     * Identifica a qual o Contrato esta vinculada em nível Superior
     */
    IDPessoaPai: number;

    /**
     * Código do Tipo de Pessoa a qual o Contrato esta vinculada em nível Superior
     */
    inCodTipoPessoaPai: number;

    /**
     * Descrição do Tipo de Pessoa a qual o Contrato esta vinculada em nível Superior
     */
    chDesTipoPessoaPai: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa a qual o Contrato esta vinculada em nível Superior
     */
    inCodTipoDocumentoPai: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa a qual o Contrato esta vinculada em nível Superior
     */
    chDesTipoDocumentoPai: string;

    /**
     * Documento de Identificação da Pessoa a qual Pessoa o Contrato esta vinculada em nível Superior
     */
    inNumIdentifPai: number;

    /**
     * 	Nome da Pessoa ao qual o Contrato esta Vinculada em nível Superior
     */
    chNomePai: string;

    /**
     * Código do Tipo de Papel a Pessoa ao qual o Contrato esta Vinculada em nível Superior
     */
    inCodTipoPapelPai: number;

    /**
     * Descrição do Tipo de Papel a Pessoa ao qual o Contrato esta Vinculada em nível Superior
     */
    chDesTipoPapelPai: string;

    /**
       * Quantidade Total de Registros existentes na tabela.
       * Atributo será utilizado para calcular paginação dos Grids na interface
       */
    inRecordCount: number;
}