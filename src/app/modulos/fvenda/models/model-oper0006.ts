/**
 * PADRÃO DE INTERFACE PARA SOLICITAR PARÂMETROS E RODAR RELATÓRIO E EXPORTAÇÃO PARA PLANILHA EXCEL
 */
 export class ModelOper0006 {

  /**
  Identificador de uma Campanha
  */
  IDCampanha: number;

  /**
  Identificador do Tipo de execução
  */
  inTipoExecucao: number;

  /**
  Identificador do Tipo de saída
  */
  inTipoSaida: number;

  /**
  Identificador do Tipo do Arquivo de saída
  */
  inTipoArqSaida: number;

  /**
  Descrição do nome do arquivo de saída
  */
  chNomArqSaida: string;

  /**
  Descrição do nome do arquivo de log
  */
  chNomArqLog: string;

  /**
  Identificador da opção de envio do log
  */
  inOpcaoEnvLog: number;

  /**
  Descrição do assunto de envio do log
  */
  chAssuntoEnvLog: string;

  /**
  Descrição do destino de envio do log
  */
  chDestinoEnvLog: string;

  /**
  Quantidade Total de Registros existentes na tabela.
  Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}
