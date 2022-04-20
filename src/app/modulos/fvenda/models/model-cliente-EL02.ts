import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/**
 * Manutenção de Clientes disponíveis no sistema.
 * Entidade Lógica com o objetivo de atualizar mais do que uma entidade física (Tabela) no sistema. 
 */


export class ModelClienteEl02 extends ApiErrorCollection {

    /**
     * Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDCliente: number;

    /**
     * Identificador Único da Tabela PapelPessoa 
     * Identifica a qual Pessoa o Cliente esta Relacionado
     */
    IDPapelPessoaCliente: number;

    /**
     * Identificador Único da Tabela de Pessoa
     */
    IDPessoaCliente: number;


    /**
     * Código do Tipo de Pessoa como Cliente
     */
    inCodTipoPessoaCliente: number;

    /**
     * Descrição do Tipo de Pessoa como Cliente
     */
    chDesTipoPessoaCliente: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa como Cliente
     */
    inCodTipoDocumentoCliente: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa como Cliente
     */
    chDesTipoDocumentoCliente: string;

    /**
     * Documento de Identificação da Pessoa como Cliente
     */
    inNumIdentifCliente: number;

    /**
     * Nome do Cliente
     */
    chNomeCliente: string;

    /**
   * Código do Cliente
   */
    inCodCliente: number;

    /**
* Nome Abreviado do Cliente
*/
    chNomeAbreviado: string;


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
     * Identificador Único da Tabela Cliente
     * Identifica qual é o Vinculo Superior do Cliente
     */
    IDClientePai: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica a qual Papel da Pessoa Superiora o Cliente esta Relacionado
     */
    IDPapelPessoaClientePai: number;

    /**
     * Identificador Único da Tabela de Pessoa
     * Identifica a qual Pessoa Superiora o Cliente esta Relacionado
     */
    IDPessoaClientePai: number;

    /**
     * Código do Tipo de Pessoa do Cliente Superior
     */
    inCodTipoPessoaClientePai: number;

    /**
    * Descrição do Tipo de Pessoa do Cliente Superior
    */
    chDesTipoPessoaClientePai: string;

    /**
    * Código do Tipo de Documento de Identificação da Pessoa do Cliente Superior
    */
    inCodTipoDocumentoClientePai: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa do Cliente Superior
     */
    chDesTipoDocumentoClientePai: number;

    /**
     * Documento de Identificação da Pessoa do Cliente Superior
     */
    inNumIdentifClientePai: number;

    /**
     * Nome do Cliente Superior
     */
    chNomeClientePai: string;


    /**
     * Código do Cliente Pai
     */
    inCodClientePai: number;

    /**
     * Nome Abreviado do Cliente Pai
     */
    chNomeAbrevClientePai: string;

    /**
    * Identificador Único da Tabela PapelPessoa
    Identifica o Papel da Pessoa responsável Pagadora pelas Vendas para o Cliente
    */
    IDPapelPessoaPagador: number;

    /**
    Identificador Único da Tabela de Pessoa
Identifica qual é a Pessoa responsável Pagadora pelas Vendas para o Cliente
 */
    IDPessoaPagador: number;

    /**
     * Código do Tipo de Pessoa Pagadora
     */
    inCodTipoPessoaPagador: number;

    /**
     * Descrição do Tipo de Pessoa Pagadora
     */
    chDesTipoPessoaPagador: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa Pagadora
     */
    inCodTipoDocumentoPagador: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa Pagadora
     */
    chDesTipoDocumentoPagador: string;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa Pagadora
     */
    inNumIdentifPagador: number;

    /**
     * Nome da Pessoa Pagadora
     */
    chNomePagador: string;

    /**
     * Identificador Único da Tabela Representante
     * Identifica a qual Representante o Cliente esta Relacionado
     */
    IDRepresentante: number;

    /**
     * Identificador Único da Tabela PapelPessoa
     * Identifica o Papel da Pessoa Representante relacionada ao cliente
     */
    IDPapelPessoaRepresentante: number;


    /**
     * Identificador Único da Tabela de Pessoa
     * Identifica a qual Pessoa Representante o Cliente esta Relacionado
     */
    IDPessoaRepresentante: number;

    /**
     * Código do Tipo de Pessoa Representante
     */
    inCodTipoPessoaRepresentante: number;

    /**
    * Descrição do Tipo de Pessoa Representante
    */
    chDesTipoPessoaRepresentante: string;

    /**
     * Código do Tipo de Documento de Identificação da Pessoa Representante
     */
    inCodTipoDocumentoRepresentante: number;

    /**
     * Descrição do Tipo de Documento de Identificação da Pessoa Representante
     */
    chDesTipoDocumentoRepresentante: string;

    /**
     * Documento de Identificação da Pessoa Representante
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
    chNomeAbrevRepresentante: string;

    /**
     * Situação Cadastral do Cliente
     */
    inCodSituacaoCad: number;

    /**
     * Descrição da Situação Cadastral do Cliente
     */
    chDesSituacaoCad: string;

    /**
    * Código do Grupo de Cliente
    */
    chCodGrupoCliente: string;

    /**
    * Descrição do Grupo de Cliente
    */
    chDesGrupoCliente: string;

    /**
     * Identificador Único da Tabela Microrregiao
     * Identifica a qual Microrregião o Cliente esta Relacionado
     */
    IDMicrorregiao: number;

    /**
     * Código da Região
     * Identifica a qual Região a Microrregião esta vinculada
     */
    chCodRegiao: string;

    /**
     * Descrição da Região
     */
    chDesRegiao: string;

    /**
     * Código da Microrregião
     */
    chCodMicrorregiao: string;

    /**
    * Descrição da Microrregião
    */
    chDesMicrorregiao: string;

    /**
    * Canal de Venda do Cliente
    */
    chCodCanalVenda: string;

    /**
    * Descrição do Canal de Venda
    */
    chDesCanalVenda: string;

    /**
    * Identifica se o Cliente permite receber comunicação da empresa
    */
    lgPermComunic: boolean;

    /**
   * Identificação Suframa do Cliente
   */
    chDesSuframa: string;



    /**
   * Valor do Limite de Crédito para Vendas ao Cliente
   */
    deValLimCredito: number;


    /**
     * Data de Expiração do Valor do Limite de Crédito
     */
    daDatExpLimCredito: Date;

    /**
     * Observação do Cliente
     */
    chDesObservacao: string;


    /**
    * Identificador Único da Tabela ClienteVenda
    */
    IDClienteVenda: number;


    /**
    * Código da Condição de Pagamento preferencial do cliente
    */
    chCodCondPagtoVenda: string;
    
    /**
     * Descrição da Condição de Pagamento
     */
    chDesCondPagtoVenda: string;

    /**
     * Condição de Pagamento (Lista de Dias para Vencimento, separados por "/")
     * Ex.: 05/35/65
     */
    chCondicao: string;


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