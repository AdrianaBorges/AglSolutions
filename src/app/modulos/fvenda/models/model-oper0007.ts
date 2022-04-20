/**
 * Operação para Geração de Relatório de Assistência Técnica.
 * Esta API permite a geração de arquivo CSV ou Excel.
 */
 export class ModelOper0007 {

  /**
  Número da Assistência Técnica Inicial do Intervalo
  */
  inNumAssTecnicaIni: number;

  /**
  Número da Assistência Técnica Final do Intervalo
  */
  inNumAssTecnicaFim: number;

  /**
  Data de Abertura da Assistência Técnica Inicial do Intervalo
  */
  dtDatAberturaIni: Date;

  /**
  Data de Abertura da Assistência Técnica Final do Intervalo
  */
  dtDatAberturaFim: Date;

  /**
  Código do Cliente da Assistência Técnica Inicial do Intervalo
  */
  inCodClienteIni: number;

  /**
  Código do Cliente da Assistência Técnica Final do Intervalo
  */
  inCodClienteFim: number;

  /**
  Código do Item da Assistência Técnica Inicial do Intervalo
  */
  chCodItemIni: string;

  /**
  Código do Item da Assistência Técnica Final do Intervalo
  */
  chCodItemFim: string;

  /**
  Tipo de Execução da Operação
  */
  inTipoExecucao: number;

  /**
  Tipo de Saída da Operação
  */
  inTipoSaida: number;

  /**
  Tipo de Arquivo de Saída
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
