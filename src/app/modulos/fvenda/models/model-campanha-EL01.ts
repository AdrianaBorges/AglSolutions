/**
 * Manutenção de Campanhas de Venda disponíveis no sistema.
 * Entidade Lógica com operações específicas de tratamento da Campanha.
 * Esta API permite a inclusão, alteração, exclusão física e consulta de dados.
 * ESTA API SERÁ UTILIZADA PELA INTERFACE WEB DE MANUTENÇÃO DE DADOS DA CAMPANHA DO MÓDULO FVENDA.
 */
export class ModelCampanhaEL01 {
    /**
      Identificador Único da Tabela (Gerado Automaticamente)
     */
    IDCampanha: number;

    /**
      Código da Campanha de Venda
     */
    chCodCampanha: string;

    /**
      Código do Tipo de Campanha
     */
    inCodTipoCampanha: number;

    /**
      Nome Abreviado do Estabelecimento
     */
    chNomAbrevEstabelec: string;

    /**
     Descrição do Tipo de Campanha
     */
    chDesTipoCampanha: string;

    /**
      Código do Tipo de Integração para Origem das Vendas da Campanha
     */
    inCodOrigemVenda: number;

    /**
      Descrição do Tipo de Integração para Origem das Vendas da Campanha
     */
    chDesOrigemVenda: string;

    /**
      Código do Tipo de Integração para o Destino das Vendas da Campanha
     */
    inCodDestinoVenda: number;

    /**
      Descrição do Tipo de Integração para o Destino das Vendas da Campanha
     */
    chDesDestinoVenda: string;

    /**
      Código do Tipo de Integração para Informar o Prêmio Instantâneo Sorteado da Campanha
     */
    inCodInformaPremio: number;

    /**
      Descrição do Tipo de Integração para Informar o Prêmio Instantâneo Sorteado da Campanha
     */
    chDesInformaPremio: string;

    /**
      Descrição da Campanha
     */
    chDescricao: string;

    /**
      Data de Abertura da Assistência Técnica
     */
    dtDatInicio: Date;

    /**
      Data/Hora de Fim da Campanha
     */
    dtDatFim: Date;

    /**
      Código da Situação da Campanha
     */
    inCodSituacaoCamp: number;

    /**
      Descrição da Situação da Campanha
     */
    chDesSituacaoCamp: string;

    /**
      Indicador se as Vendas da Campanha precisam estar com o Cliente Identificado ou não
    */
    lgIdentifClienteVenda: Boolean;

    /**
     * Quantidade Total de Registros existentes na tabela.
     * Atributo será utilizado para calcular paginação dos Grids na interface
     */
    inRecordCount: number;
}
