/**
 * Operação para Exportação de Dados de Pedido de Compra de Cliente.
 * Esta API permite a geração de arquivo CSV ou Excel em diversos Modelos de Saída.
 */
 export class ModelOper0010 {

  /**
  Lista de Códigos de Estabelecimentos separados por vigula
  */
  chLstCodEstabelec: string;

  /**
  Data do Pedido de Compra Inicial do Intervalo
  */
  daDatPedCompraIni: Date;

  /**
  Data do Pedido de Compra Final do Intervalo
  */
  daDatPedCompraFim: Date;

  /**
  Número do Pedido de Compra Inicial do Intervalo
  */
  inNumPedCompraIni: number;

  /**
  Número do Pedido de Compra Final do Intervalo
  */
  inNumPedCompraFim: number;

  /**
  Número do Pedido do Cliente Inicial do Intervalo
  */
  chNumPedClienteIni: string;

  /**
  Número do Pedido do Cliente Final do Intervalo
  */
  chNumPedClienteFim: string;

  /**
  Código do Cliente do Pedido de Compra Inicial do Intervalo
  */
  inCodClienteIni: number;

  /**
  Código do Cliente do Pedido de Compra Final do Intervalo
  */
  inCodClienteFim: number;

  /**
  Código do Representante do Pedido de Compra Inicial do Intervalo
  */
  inCodRepresIni: number;

  /**
  Código do Representante do Pedido de Compra Final do Intervalo
  */
  inCodRepresFim: number;

  /**
  Lista de Códigos de Situação do Pedido de Compra separados por virgula
  */
  chLstCodSituacaoPedComp: string;

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
  Tipo de Arquivo de Saída
  */
  inTipoArqSaida: number;

  /**
  LINK para o Arquivo Gerado na Operação
  */
  chNomArqSaida: string;

  /**
  Lista de LINKs para os Arquivos Gerados na Operação
  */
  chLstArqSaida: string;

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
