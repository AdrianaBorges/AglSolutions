/**
 * Operação para Geração de Relatório de Reclamações de Clientes.
 * Esta API permite a geração de arquivo no formato Microsoft Word (.DOCX), com base em Template parametrizada.
 */
 export class ModelOper0012 {

  /**
  Período para geração do relatório no formato AAAAMM:
  Exemplo: 202108
  */
  inPeriodoAnalise: number;

  /**
  Indicador do Modelo do Arquivo de Saída
  */
  inOpcaoModelo: number;

  /**
  Tipo de Execução da Operação
  */
  inTipoExecucao: number;

  /**
  Tipo de Saída da Operação
  */
  inTipoSaida: number;

  /**
  Tipo de Arquivo de Saida
  */
  inTipoArqSaida: number;

  /**
  LINK para o Arquivo Gerado na Operação
  */
  chNomArqSaida: string;

  /**
  LINK para o Arquivo de LOG gerado na Operação
  */
  chNomArqLog: string;

  /**
  Opções para o Envio do LOG de processamento
  */
  inOpcaoEnvLog: number;

  /**
  Assunto da mensagem de e-mail para o envio do LOG de processamento
  */
  chAssuntoEnvLog: string;

  /**
  Endereços de e-mail de destino para mensagem de envio do LOG de processamento
  Os endereços de e-mail devem ser informados, separados por ponto-e-virgula ";"
  */
  chDestinoEnvLog: string;

  /**
  Quantidade Total de Registros existentes na tabela.
  Atributo será utilizado para calcular paginação dos Grids na interface
   */
  inRecordCount: number;
}
