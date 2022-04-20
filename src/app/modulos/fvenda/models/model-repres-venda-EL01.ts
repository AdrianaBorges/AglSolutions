import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Representantes disponíveis no sistema.
 * Entidade Lógica com o objetivo de atualizar mais do que uma entidade física (Tabela) no sistema.
 */


export class ModelRepresVendaEL01 extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDRepresentante: number;

    /**
     * Identificador Único da Tabela PapelPessoa 
     * Identifica a qual Pessoa o Representante esta Relacionado
     */
    IDPapelPessoaRepresentante: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoaRepresentante: number;


    /**
     * Código do Tipo de Pessoa como Representante
     */
    inCodTipoPessoaRepresentante: number;

    /**
     * Descrição do Tipo de Pessoa como Representante
     */
    chDesTipoPessoaRepresentante: string;



    /**
     * Código do Tipo de Documento de Identificação da Pessoa como Representante
     */
    inCodTipoDocumentoRepresentante: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa como Representante
     */
    chDesTipoDocumentoRepresentante: string;

    /**
     * Documento de Identificação da Pessoa como Representante
     */
    inNumIdentifRepresentante: number;

    /**
     * Nome do Representante
     */
    chNomeRepresentante: string;

    /**
   * Código do Representante
   */
    inCodRepresentante: number;

    /**
* Nome Abreviado do Representante
*/
    chNomeAbreviado: string;


    /**
     * Código do Tipo de Representante
     */
    inCodTipoRepresentante: number;

    /**
     * Descrição do Tipo de Representante
     */
    chDesTipoRepresentante: string;

    /**
     * Caixa Postal
     */
    chCxPostal: string;

    /**
    * Identificador Único da Tabela PessoaFisica
    */
    IDPessoaFisica: number;

    /**
     * Data de Nascimento
     */
    daDatNascim: Date;

    /**
     * Nome da Mãe
     */
    chNomeMae: string;

    /**
     * Nome do Pai
     */
    chNomePai: string;

    /**
     * Identificador Único da Tabela PessoaJuridica
     */
    IDPessoaJuridica: number;


    /**
     * Nome Fantasia
     */
    chNomeFantasia: string;

    /**
     * chIM
     */
    chIM: string;

    /**
     * Inscrição Estadual
     */
    chIE: string;

    /**
     * Data de Fundação
     */
    daDatFundacao: Date;


    /**
     * Identificador Único da Tabela Representante
     * Identifica qual é o Vinculo Superior do Representante
     */
    IDRepresentantePai: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Papel da Pessoa Superiora o Representante esta Relacionado
     */
    IDPapelPessoaRepresentantePai: number;

    /**
     * Identificador Único da Tabela de Pessoa
     * Identifica a qual Pessoa Superiora o Representante esta Relacionado
     */
    IDPessoaRepresentantePai: number;

    /**
     * Código do Tipo de Pessoa do Representante Superior
     */
    inCodTipoPessoaRepresentantePai: number;

    /**
    * Descrição do Tipo de Pessoa do Representante Superior
    */
    chDesTipoPessoaRepresentantePai: string;

    /**
    * Código do Tipo de Documento de Identificação da Pessoa do Representante Superior
    */
    inCodTipoDocumentoRepresentantePai: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa do Representante Superior
     */
    chDesTipoDocumentoRepresentantePai: number;

    /**
     * Documento de Identificação da Pessoa do Representante Superior
     */
    inNumIdentifRepresentantePai: number;

    /**
     * Nome do Representante Superior
     */
    chNomeRepresentantePai: string;

    /**
     * Código do Tipo de Representante Pai
     */
    inCodTipoRepresentantePai: number;

    /**
     * Descrição do Tipo de Representante Pai
     */
    chDesTipoRepresentantePai: string;

    /**
     * Código do Representante Pai
     */
    inCodRepresentantePai: number;

    /**
     * Nome Abreviado do Representante Pai
     */
    chNomeAbrevRepresentantePai: string;

    /**
     * Situação Cadastral do Representante
     */
    inCodSituacaoCad: number;

    /**
     * Descrição da Situação Cadastral do Representante
     */
    chDesSituacaoCad: string;

    /**
    * Observação do Representante
    */
    chDesObservacao: string;
    
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