/**
 * Manutenção de Vendas da Campanha de Venda disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento da Venda da Campanha.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DE VENDAS DA CAMPANHA DO MÓDULO FVENDA.
 */
export class ModelCampanhaVendaEL01 {

    /**
    Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDCampanhaVenda: number;

    /**
     * Identificador Único da Tabela CampanhaParam
     * Identifica a qual Parâmetro da Campanha a Venda esta Relacionada
     */
    IDCampanhaParam: number;

    /**
  	 * Identificador Único da Tabela Campanha
     */
    IDCampanha: number;

    /**
     * Código da Campanha de Venda
     */
    chCodCampanha: string;

    /**
     * Descrição da Campanha
     */
    chDesCampanha: string;

    /**
     * Código do Tipo de Campanha
     */
    inCodTipoCampanha: number;

    /**
     * Descrição do Tipo de Campanha
     */
    chDesTipoCampanha: string;


    /**
     * Código da Situação da Campanha
     */
    inCodSituacaoCamp: number;

    /**
     * Descrição da Situação da Campanha
     */
    chDesSituacaoCamp: string;

    /**
     * Data/Hora de Inicio da Campanha
     */
    dtDatInicio: Date;

    /**
     * Data/Hora de Inicio da Campanha
     */
    dtDatFim: Date;


    /**
  Identificador Único da Tabela Estabelec
  */
    IDEstabelec: number;

    /**
      Identificador Único da Tabela PapelPessoa
      Identifica a qual Pessoa o Estabelecimento esta Relacionado
     */
    IDPapelPessoaEstabelec: number;

    /**
     * Identificador Único da Tabela Empresa
     */
    IDEmpresa: number;

    /**
      Identificador Único da Tabela de Pessoa a qual o Estabelecimento esta relacionado
     */
    IDPessoaEstabelec: number;

    /**
     * Código do Estabelecimento
     */
    chCodEstabelec: string;

    /**
     * Nome Abreviado do Estabelecimento
     */
    chNomeAbrevEstabelec: string;

    /**
     *	Número de Identificação Lógica da Pessoa do Tipo Estabelecimento
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJEstabelec: number;

    /**
     * Nome da Pessoa relacionada ao Estabelecimento
     */
    chNomePessoaEstabelec: string;

    /**
     * Número de Identificação Lógica da Pessoa do Tipo Empresa
     * Registro Nacional válido para a Pessoa Jurídica (CNPJ)
     */
    inCNPJEmpresa: string;

    /**
     * Nome da Pessoa relacionada a Empresa
     */
    chNomePessoaEmpresa: string;

    /**
     * Data/Hora da Venda
     */
    dtDatVenda: Date;

    /**
     * Número do Terminal da Venda
     */
    chNumTerminal: string;

    /**
     * Contador de reinício de operação
     */
    chNumContadorReinicio: string;

    /**
     * COO de entrada de operador
     */
    chNumSeqOperacaoEntrada: string;

    /**
     * COO
     */
    chNumSeqOperacao: string;

    /**
     *  Número do Documento de Venda
     */
    chNumDocto: string;

    /**
     * Valor da Venda
     */
    deValVenda: number;

    /**
     * Código do Tipo de Pessoa
     */
    inCodTipoPessoa: number;

    /**
     * Descrição do Tipo de Pessoa
     */
    chDesTipoPessoa: string;

    /**
     * Tipo de Documento de Identificação do Cliente da Venda
     */
    inCodTipoDocumento: number;

    /**
     * Descrição do Tipo de Documento
     */
    chDesTipoDocumento: string;

    /**
     * Número do Documento de Identificação do Cliente da Venda
     */
    inNumIdentificacao: number;

    /**
     * Código da Forma de Cobrança da Venda
     */
    chCodFormaCobranca: string;

    /**
     * Descrição Abreviada da Forma de Cobrança da Venda
     */
    chDesAbrevFormaCobranca: string;

    /**
     * Descrição da Forma de Cobrança da Venda
     */
    chDesFormaCobranca: string;


    /**
     * Valor do Prêmio Ganho na Venda
     */
    deValPremioGanho: number;

    /**
     * Valor do Prêmio Utilizado na Venda
     */
    deValPremioUtilizado: number;

    /**
     * Valor do Saldo do Prêmio não utilizado na Venda remanescente para ser utilizado em outras Vendas
     */
    deValPremioSaldo: number;

    /**
     * Data/Hora de Inclusão do Registro
     */
    dtDatInclusao: Date;

    /**
     * Data/Hora da Última Alteração no Registro
     */
    dtDatUltAlteracao: Date;

    /**
     * Indicador se o registro da venda foi integrado com o sistema de apuração da campanha
     */
    lgIntegradoDestino: boolean;

    /**
     * Identificador do registro da venda no sistema de apuração da campanha
     */
    chIDDestino: string;


    /**
     *Data/Hora da integração da venda no sistema de apuração da campanha
     */
    dtDatIntegradoDestino: Date;

    /**
    Quantidade Total de Registros existentes na tabela.
    Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}