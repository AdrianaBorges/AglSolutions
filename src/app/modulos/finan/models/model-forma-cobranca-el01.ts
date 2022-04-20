import { ApiErrorCollection } from '../../../api-error/api-error-collection';

/** Forma de Cobrança */
export class ModelFormaCobrancaEL01 extends ApiErrorCollection {

  /**
  * Código da Forma de Cobrança
  */
  chCodFormaCobranca: string;

  /**
  * Descrição Abreviada
  */
  chDesAbreviada: string;

  /**
  * Descrição da Forma de Cobrança
  */
  chDescricao: string;

  /**
  * Código do Tipo de Cobrança
  */
  inCodTipoCobranca: number;

  /**
  * Descrição do Tipo de Cobrança
  */
  chDesTipoCobranca: string;

  /**
  * Código do Portador da Cobrança
  */
  inCodPortador: number;

  /**
  * Nome Abreviado do Portador
  */
  chNomAbrevPortador: string;

  /**
  * Nome do Portador
  */
  chNomPortador: string;

  /**
  * Código do Banco relacionado ao Portador
  */
  inCodBanco: number;

  /**
  * Nome do Banco
  */
  chNomBanco: string;

  /**
  * Código da Carteira do Contas a Receber
  */
  inCodCarteiraCR: number;

  /**
  * Descrição da Carteira do Contas a Receber
  */
  chDesCarteiraCR: string;

  /**
  * Número do Convênio de Cobrança com o Portador
  */
  chConvenioCobranca: string;

  /**
  * Código da Sequência para geração do nosso número em caso de Cobrança
  */
  chCodSeqNossoNum: string;

  /**
  * Descrição da Sequência para geração do nosso número em caso de Cobrança
  */
  chDesSeqNossoNum: string;

  /**
  * Código da Sequência para geração da remessa de cobrança ao portador
  */
  chCodSeqRemCob: string;

  /**
  * Descrição da Sequência para geração da remessa de cobrança ao portador
  */
  chDesSeqRemCob: string;

  /**
  * Nome da Pasta para geração dos arquivos de remessa de cobrança ao portador
  */
  chNomPastaArqRem: string;

  /**
  * Nome do Arquivo de Remessa para o Portador com mascara
  * Campo permite formatar o nome do arquivo utilizando as seguintes TAG que será substituidas pelos respectivos valores:
  * <DD> - DIA no momento da geração do arquivo.
  * <MM> - MÊS no momento da geração do arquivo.
  * <AAAA> - ANO no momento da geração do arquivo.
  * <Hr> - HORA no momento da geração do arquivo.
  * <Mn> - MINUTO no momento da geração do arquivo.
  * <Sc> - SEGUNDO no momento da geração do arquivo.
  * <SeqX> - Será substituído pelo próximo número de sequência de Remessa de Cobrança, onde X será o número de dígito da sequencia.
  */
  chNomArqRem: string;

  /**
  * Código de Transmissão do Arquivo de Cobrança no Banco
  */
  chCodTransmissao: string;

  /**
  * Número de Dias após a Data de Vencimento para manter o Documento Registrado no Banco
  */
  inNumDiasValidVenc: number;

  /**
  * Identificador do Location para Registro do Documento na cobrança via PIX
  */
  chPixIDLocation: string;

  /**
  * URL do Location para Registro do Documento na cobrança via PIX
  */
  chPixURLLocation: string;

  /**
  * Chave do Recebedor para Registro do Documento na cobrança via PIX
  */
  chPixChaveRecebedor: string;

  /**
  * Chave do Webhook do métododo de confirmação de pagamento do Documento na cobrança via PIX
  */
  chPixChaveWebhookConfPag: string;

  /**
  * URL do Webhook do métododo de confirmação de pagamento do Documento na cobrança via PIX
  */
  chPixURLWebhookConfPag: string;

  /**
   * Número de Segundos para manter o Documento Registrado na Cobrança via PIX
   */
  inPixNumSegValidCob: number;

  /**
  * Base da URL de Acesso as APIs de cobrança via PIX
  */
  chPixUrlBase: string;

  /**
  * Base da URL de Acesso a API para Obtenção do Token de Acesso de cobrança via PIX
  */
  chPixUrlTokenBase: string;

  /**
  * ID do Cliente para Acesso as APIs de cobrança via PIX
  */
  chPixClientID: string;

  /**
  * Senha do Cliente para Acesso as APIs de cobrança via PIX
  */
  chPixClientSecret: string;

  /**
  * Token de Acesso as APIs de cobrança via PIX
  */
  chPixAccessToken: string;

  /**
  * Data/Hora de Geração do Token de Acesso as APIs de cobrança via PIX
  */
  dtPixAccessToken: Date;

  /**
  * Validade em Segundos do Token de Acesso as APIs de cobrança via PIX
  */
  inPixValidAccessToken: number;

  /**
  * Arquivo do Certificado para Acesso as APIs de cobrança via PIX
  */
  chPixArqCertificado: string;

  /**
  * Senha do Certificado para Acesso as APIs de cobrança via PIX
  */
  chPixPassCertificado: string;

  /**
  * Mensagem fixa para ser exibida nas impressões dos documentos de cobrança
  */
  chMsgCobranca: string;

  /**
  * Arquivo de Visualização da Impressão do Boleto gerado localmente
  */
  chViewImpBoletoLocal: string;

  /**
  * Código da Visualização da Impressão do Boleto gerado via Servidor WEB
  */
  chViewImpBoletoServer: string;

  /**
  * Quantidade Total de Registros existentes na tabela.
  * Atributo será utilizado para calcular paginação dos Grids na interface
  */
  inRecordCount: number;
}
